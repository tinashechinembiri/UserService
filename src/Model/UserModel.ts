import { model, Schema, Model, Document } from 'mongoose';
import bcrypt, { hash } from "bcrypt";
import config from 'config'; 
import {ICustomer} from './CustomerModel';



export interface IUser extends Document {
    user_id:string,
    email: string, 
    password: string, 
    CheckPasswordvalid (user_Password:string) : Promise<boolean>
    changePassword(user_Password:string): Promise<Boolean>
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
         if (!new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(Id))
         {
        
         return await this.findOne({'user_id': Id}).populate("accounts").exec();
         }
         if (new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(Id)) 
         {
           
            return await this.findOne({'email': Id}).populate("accounts").exec();
         }
      
     }
     
     userSchema.methods.CheckPasswordvalid = async function ( this :IUser,  user_Password :string) :Promise<boolean>
     {
         return bcrypt.compare(user_Password, this.password).catch((ex) =>{ console.log(ex);  return false}); 
     }
     userSchema.methods.changePassword = async function (this:IUser, user_password :string) 
     {
        let user = this as IUser; 
        console.log(user)
      
        user.password =  user_password; 
        
        if (user.isModified('password'))
        {
            user.save(); 
            return true; 
        }
        return false; 

      
     }

    userSchema.pre("save", async function(next) {
      
        let user = this as IUser;
        if (!user.isModified('password')) return next(); 
        const salt = await bcrypt.genSalt(config.get<number>("hashsalts")); 
        user.password = await bcrypt.hash(user.password, salt); 
        return next(); 
    } )

    
    userSchema.pre("updateOne", async function(next) {
        const password = this.getUpdate().$set.password; //.$set.password ;
        if (!password) return next();
        try{
            const salt = await bcrypt.genSalt(config.get<number>("hashsalts")); 
            const  hash = await bcrypt.hash(password, salt); 
            this.getUpdate().$set.password = hash; 
        return next(); 
        }catch(error)
        {
            
        }
        
    } )
const User = model<IUser, UserModel> ('User',userSchema); 
export default User;