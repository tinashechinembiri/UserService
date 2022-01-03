import { responseHandler} from '../Util/ResponseInterface'
import {CreateUserInput} from '../Payload/User.Schema'
interface UserServiceInterface { 
     CreateUser (user_Data : CreateUserInput ) :Promise<responseHandler>
     getUserprofile(Id:string) : Promise<responseHandler>
}

export default  UserServiceInterface; 