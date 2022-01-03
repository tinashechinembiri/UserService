import { unknown } from "zod";
import {CreateUserInput} from '../Payload/User.Schema';
import User, {userSchema} from '../Model/UserModel';
import Customer, { ICustomer }  from '../Model/CustomerModel';
import { omit } from "lodash";
import { responseHandler} from "../Util/ResponseInterface";
import  ErrorHandling from '../Util/ErrorHandling/ErrorHandler'
import UserServiceInterface from '../Service/UserService.Interface'


//https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

class UserService implements UserServiceInterface {

    constructor(){
    }
    //https://github.com/Automattic/mongoose/issues/2228
    //https://stackoverflow.com/questions/55096055/mongoose-different-ways-to-reference-subdocuments
    public async CreateUser (user_Data : CreateUserInput ) :Promise<responseHandler>{
   
      const account = new Customer(user_Data.Account); 
      try{
     
          await account.save ();            
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
               
    }

    public async getUserprofile (ID : string) : Promise<responseHandler> {
      
      
      const _user  =  await User.findaccount(ID)
      if (!_user)
      {
        throw new ErrorHandling(404, "not found ") 
      }  
           
      const result = omit(_user, "_v")

      return {code:200, message:{result}}
    }

    public async updateUserProfile(User:Object , UpdatePayload:Object) {


      
    }
}
export default  UserService; 