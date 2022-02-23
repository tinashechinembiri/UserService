import _ from 'lodash'; 
import {CreateUserInput, forgotPasswordInput, updateProductIput} from '../Payload/User.Schema';
import User, {userSchema} from '../Model/UserModel';
import Customer, { ICustomer }  from '../Model/CustomerModel';
import secretsanswers  from'../Model/SecretAnswersModel'
import { omit } from "lodash";
import { responseHandler} from "../Util/ResponseInterface";
import  ErrorHandling from '../Util/ErrorHandling/ErrorHandler'
import UserServiceInterface from '../Service/UserService.Interface'


//https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

class UserService implements UserServiceInterface {

    public _user = User; 
    constructor(){
    }
    //https://github.com/Automattic/mongoose/issues/2228
    //https://stackoverflow.com/questions/55096055/mongoose-different-ways-to-reference-subdocuments
    public async CreateUser (user_Data : CreateUserInput ) :Promise<responseHandler>{
      const account = new Customer(user_Data.Account); 
      try{
          await account.save();            
        const createUser =  new User({
                'email':user_Data.email, 
                'password':user_Data.password, 
                'user_id': user_Data.user_id, 
                'accounts':account}); 
             await createUser.save()

       let result = omit( createUser.toJSON(), "password", "_id", "_v", "accounts") ; 
             return  {"code":200,"message":{result}}; 
        }
        catch(err: any)
        {
        
          throw new ErrorHandling(400, err)  //{"code":400, "message": err}; 
        }    
               
    }; 

    public async getUserprofile (ID:string) : Promise<responseHandler> { 
      const _user  =  await User.findaccount(ID)
    
      if (!_user)
      {
        throw new ErrorHandling(404, "not found") 
      }  
           
      const result = omit(_user, "__v")

      return {code:200, message:{result}}
    }

    public async forgotPassword ({email, newPassword, secretanswer} : forgotPasswordInput) : Promise<responseHandler>{
      console.log(newPassword)
        const _Dbsecretanswer = await secretsanswers.findOne({'email': email})
                                .then ( (doc: any) => {
                                      if (doc)
                                      {
                                       return  doc['secretanswer'] as string === secretanswer as string ? true :false;
                                      }
                                      return false
                                })
      if (_Dbsecretanswer)
      {
        let result = await this.changepassword(email, newPassword); 
      if (result)
     
         return {"code":200,"message":{'status':'Password has been reset'}}
      }
        return {"code":400,"message":{'status':'Password reset has failed '}}
    }
    public async changepassword (email:string, newPassword: string )
    {
      const _newpassword = await User.findOne({'email': email})
      const result = await _newpassword?.changePassword(newPassword); 
      return result;
    }

    public async updateUserProfile( UpdatePayload:updateProductIput) : Promise<responseHandler> {
      const {accounts , email, password, user_id} = UpdatePayload; 
      let UpdateUser ; 
      const user = await User.findaccount(user_id);
      if (!user)
      {
         return {"code":404,"message":{'status':'user doesnt exist'}}; 
      }
      try{
          if (email!==null &&password !== null)
          {
           UpdateUser = await User.updateOne({'user_id':user_id}, {$set: {email: email,password: password}});          
          }
            const _accouts = await Customer.findByIdAndUpdate(user.accounts._id,{$set:accounts});
            return  {"code":200,"message":{'status':'User updated'}}; 
          }catch(ex : any){
           console.log(ex); 
           throw new ErrorHandling(500, "server error");
      }
    
    }
}
export default  UserService; 