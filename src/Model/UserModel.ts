import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from "bcrypt";
import config from 'config'; 
import Customer, {ICustomer} from './CustomerModel';



export interface IUser extends Document {
    user_id:string,
    email: string, 
    password: string, 
    CheckPasswordvalid (user_Password:string) : Promise<boolean>
 
}

export const userSchema :Schema  = new Schema (
    {
        user_id:{type:String, unique:true}, 
        email:{type:String, unique:true},
        password:{type:String, required: true}, 
        accounts : {

                type: Schema.Types.ObjectId,     
                ref:'accounts',

            
            firstname:{type:String, required:true}, 
            lastname:{type:String, required:true}, 

          }

        });

     export interface UserDocument extends IUser{
         
        accounts:ICustomer["_id"]; 
         
        
     }

     export interface UserPopulateDocument extends IUser {
        accounts: ICustomer; 
     }

    export interface UserModel extends Model<IUser>
    {
        findaccount(Id:string) : Promise<UserPopulateDocument>; 
    }
     userSchema.statics.findaccount  = async function (this : Model<IUser> , Id :string) {
         return this.findOne({'user_id': Id}).populate("accounts").exec(); 
     }
     
     userSchema.methods.CheckPasswordvalid = async function ( this :IUser,  user_Password :string) :Promise<boolean>
     {
        return bcrypt.compare(user_Password, this.password).catch((ex) =>  false); 
     }

    userSchema.pre("save", async function(next) {
    
        
        let user = this as IUser;
       // let account = this as UserDocument; 
      
       /* 
        if (user.isNew)
        {
           
           const savedCust =  await Customer.create(account); 
           // user.Account._id = savedCust._id; 
                 
        }*/
        if (!user.isModified('password')) return next(); 
        const salt = await bcrypt.genSalt(config.get<number>("hashsalts")); 
        user.password = await bcrypt.hash(user.password, salt); 

        return next(); 
    
    } )

const User = model<IUser, UserModel> ('User',userSchema); 
export default User;