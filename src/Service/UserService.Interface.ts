import { responseHandler} from '../Util/ResponseInterface'
import {CreateUserInput, forgotPasswordInput,updateProductIput} from '../Payload/User.Schema'
interface UserServiceInterface { 
      CreateUser (user_Data : CreateUserInput ):Promise<responseHandler>
      getUserprofile(Id:string):Promise<responseHandler>
      forgotPassword(data: forgotPasswordInput):Promise<responseHandler>
      updateUserProfile(data:updateProductIput):Promise<responseHandler>
   //  getUsersecretquestion() : void
}

export default UserServiceInterface; 