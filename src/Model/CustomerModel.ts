import { model, Schema, Model, Document } from 'mongoose';
export interface ICustomer extends Document {
    accountid:string,
    firstname : string, 
    lastname : string,
    phone: string, 
    Address: {
        name : string, 
        postcode:string, 
        county:string,
        country:string
    }, 
    createdAt:Date, 
    updatedAt:Date
}
const CustomerScheme:Schema  = new Schema (
    {
        accountid:{type:String, unique:true}, 
        firstname:{type:String}, 
        lastname:{type:String},  
        phone:{type:Number},
        Address: {
            addressname : String, 
            postcode:String, 
            county:String,
            country:String},  
    }
)

const customer  = model<ICustomer>('accounts', CustomerScheme); 
export default customer; 