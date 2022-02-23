import UserService from "./UserService";
import UserProfileInterface from '../Service/Userprofile.Interface'
import SecretsAnswers  from'../Model/SecretAnswersModel'
interface createSecrectInterface {
    email : string, 
    secretanswer: string, 
    secrectquestion: string
}
class UserProfileService extends UserService implements UserProfileInterface {
    constructor () {
       super();  
    }
    public async getUsersecretquestion(email : string)  { 
       return  SecretsAnswers.find ({email:email}, null, {limit:5})
             .then(result => {
                if (result.length == 0){
                 return {code:404,message:{message:"User doesn't exist"}};
                }else {
                 const response = result.map (doc => doc.secrectquestion); 
                 return {code:200,message:{secrectquestion : response}};
                }
              }).catch (ex => {
                  console.log(ex); 
                  return {code:500,message:"server error"}; 
               });  
    }
    public async createuserpasswordRecovery(inputData:Array<createSecrectInterface>) {
     return SecretsAnswers.collection.insertMany(inputData)
            .then(result => {
               if (result.insertedCount != 0)
               {
                   return {code:200,message:{message:"secret question added"}};
               }
            }).catch ( ex => {
                console.log(ex); 
                return {code:500,message:{message:"Server error"}}; 
            }); }
}
export default UserProfileService; 