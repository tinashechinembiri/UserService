import { model, Schema, Model, Document, Types } from 'mongoose';
import {IUser} from './UserModel'
import {signJwt} from '../Util/jwtconfig'
import { isTemplateExpression } from 'typescript';
import { object } from 'zod';
export interface IRefreshToken extends Document 
{
    token: string,
    user_id: string,  
    users: {
        _id: Types.ObjectId
    }
    createToken(user:IUser):Promise<string>, 
    
  
}
/*
export interface TokenDocument extends IRefreshToken {
    Users: IUser["_id"]; 
}*/

export const refreshTokenSchema : Schema = new Schema (
{
    token: {type:String}, 
    user_id:{type:String, required:true}, 
    users: {
        type: new Schema ({
            _id:{
                type: Schema.Types.ObjectId, 
                ref:'Users'
            }

        })
    }
}); 


export interface TokenpopulateDocument extends IUser {
    refreshtokens: IRefreshToken; 
 }
export interface TokenModel extends Model<IRefreshToken>
{
    findUser(id:string) : Promise<TokenpopulateDocument>; 
}
refreshTokenSchema.statics.findUser  = async function (this : Model<IRefreshToken> , Id :string) {

         const item = await  this.findById(Id).populate('users').exec(); 
         console.log(item);

    //return await this.findById(Id)      .populate("users").exec(); 
}

refreshTokenSchema.methods.createToken = async function (User:IUser): Promise<string> {
    let query = {user_id : User._id}; 
    let options = {upsert: true, new: true, setDefaultsOnInsert: true, returnNewDocument : true};


const  _token = signJwt({...User },"refreshTokenPrivateKey", {expiresIn:'1d'} ); 
console.log(_token)

//https://docs.mongodb.com/manual/reference/operator/update/addToSet/

let _refreshtoken = await RefreshToken.findOneAndUpdate( query, {$set:{ token : _token}, 
    user_id:User._id, 
    users: User}, options ); 


let refreshtoken :string =  _refreshtoken?.token as string; 
    
 return  refreshtoken ; 
}

refreshTokenSchema.statics.verfifyExp = () => 
{

}


const RefreshToken = model<IRefreshToken, TokenModel>("RefreshToken", refreshTokenSchema); 


export default RefreshToken; 