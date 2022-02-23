import {LoginUserIput} from '../Payload/User.Schema'
import mongodb from 'mongoose'
import User, {IUser, userSchema} from '../Model/UserModel';
import  ErrorHandling from '../Util/ErrorHandling/ErrorHandler'
import{signJwt, verifyjwt, verifyRefreshToken} from'../Util/jwtconfig'
import { TokenResponseHandler, refreshTokenHandler} from '../Util/ResponseInterface'
import RefreshToken from '../Model/RefreshToken'
import { omit } from "lodash";



class SessionService {
    constructor ()
    {


    }
    public async createSession (userLogin : LoginUserIput) :Promise<TokenResponseHandler>
    {
        console.log(userLogin); 
        const user =  await this.verfiyUser(userLogin); 
        if(!user)
        {
            
            throw new ErrorHandling (401,'email or Password is wrong'); 
        }
        const token =  signJwt({...omit(user, "password","Account", "_v")},"accessTokenPrivateKey", {expiresIn:'5m'}); 
       // const refreshToken = signJwt({...user },"refreshTokenPrivateKey", {expiresIn:'1d'} ); 

        const _refreshtokenObject = new RefreshToken ({});
        const _refreshtoken =  await _refreshtokenObject.createToken(user); 

        return { code: "200", message: { code :"200",token : `${token}`, refreshToken:`${_refreshtoken}`}};       

    }
    private async verfiyUser ( {email , password} : { email:string, password:string}) {
    
        const UserD =  await User.findOne({'email': email}); 

        if (!UserD )
        {
            return false;
        }
    
        const password_valid = await UserD.CheckPasswordvalid (password); 
        
        if (!password_valid)
        {
    
            return false; 
        }


        return UserD; 

    }
    //https://jasonwatmore.com/post/2020/06/17/nodejs-mongodb-api-jwt-authentication-with-refresh-tokens
    public async reissueToken (token:string) : Promise<object>{
       
        const {decoded , valid} =   verifyjwt(token, "accessTokenPrivateKey");

        if (!valid)
        {
            throw new ErrorHandling(401, "token has expired");
             
        }
        return new Promise<Object> ( async(resolve, reject) => {
       
            const user = decoded as refreshTokenHandler ; 
            
            const _refreshToken = await RefreshToken.findOne({'user_id': user._id}); 
            
            const result = await verifyRefreshToken(_refreshToken?.token as string); 
            resolve(result); 
                      
        });  

        
    }
 
}

export default new  SessionService; 