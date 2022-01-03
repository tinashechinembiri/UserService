import jwt, { decode }  from "jsonwebtoken";
import config from "config";
import {IUser} from'../Model/UserModel'
import { omit } from "lodash";
import ErrorHandling from'./ErrorHandling/ErrorHandler'
import {refreshTokenHandler} from './ResponseInterface'
import RefreshToken from '../Model/RefreshToken'
//let accessType:"accessTokenPrivateKey"|"refreshTokenPrivateKey";  
export  function  signJwt (object: Object, accessType:"accessTokenPrivateKey"|"refreshTokenPrivateKey" , option?: jwt.SignOptions| undefined)
{       
    //return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
       const _userObject =  new Map(Object.entries(object)); 

    
  
    //console.log(process.env.ACCESS_TOKEN_PRIVATE_KEY); 
    const singinKey  = Buffer.from(
        config.get<string>(accessType), 
        "base64").toString("ascii"); 
    

   return  jwt.sign( omit (_userObject.get('_doc'), "Account", "password", "_v"), config.get<string>(accessType).trim() , {...(option && option),} )
        
}

export function verifyjwt (token : string, accessType :"accessTokenPrivateKey"|"refreshTokenPrivateKey")
{
    const publicKey = Buffer.from(config.get<string>(accessType).replace(/\\n/gm, '\n'), "base64").toString("ascii"); 

    try {
        const decoded = jwt.verify(token, config.get<string>(accessType)); 
       
        return {
            valid: true, 
            expired:false, 
            decoded
        }
    }catch(ex:any)
    {
      //  return e; 
      
        return {
            valid : false, 
            expired: ex.message ==="jwt expired", 
            decoded : null
        }
    }
    

}

export async function verifyRefreshToken  (token : string )
{
    const {valid, decoded} = verifyjwt(token, "refreshTokenPrivateKey" ); 
    const _decoded = decoded as refreshTokenHandler; 
    if(!valid)
    {
    
    }

   const  _accessToken = signJwt ({..._decoded},"accessTokenPrivateKey",  {expiresIn:'5m'} )
   let {createToken} = new RefreshToken(); 
   const _refreshToken =   await createToken(decoded as IUser); 
    
   return {'accesstoken':_accessToken ,'refresh': _refreshToken}; 

}