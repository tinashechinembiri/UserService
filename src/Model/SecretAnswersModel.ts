import { model, Schema, Model, Document } from 'mongoose';

export interface ISecretModel extends Document {
    email:string, 
    secretanswer: string,
    secrectquestion: string
}; 

export const SecretSchema : Schema  = new Schema (
    {
        email:{type:String, unique:true}, 
        secretanswer: {type:String, required: true}, 
        secrectquestion:{type: String, requred: true} 
    }
)

const secretsanswers = model <ISecretModel> ('secretsanswers', SecretSchema); 

export default secretsanswers; 
