import { Types } from 'mongoose';
import {object, number, string,TypeOf, date, any} from 'zod'; 
export const createUserSchema = object(
        {
            user_id: string(),
            email :string({required_error:"email is required"}).email("not a valid email"), 
            password:string( {required_error:"password is required"}).min(8, "min of 8 required on the password"), 
            Account : object({
                accountid: string({required_error:"account id is required", }).min(3, "requireds a min of 3 words"),
                firstname:string({required_error:"firstname is required", }).min(3, "requireds a min of 3 words"), 
                lastname:string({required_error:"secondname is required", }).min(3, "requireds a min of 3 words"),
                phone:string({required_error:"phone number is required"}).min(9, '9 digit phone number required'), 
                Address :object ({
                    addressname: string().optional(),
                    postcode: string({required_error:"postcode is required"}).min(6, "min of 6 letters required").max(6, 'max of 6 letters required'),
                    county: string().optional(),
                    country: string().optional(),            
                }).optional(), 
            })           
        }); 

export const createCustomerSchema  = object({
    firstname:string({required_error:"firstname is required", }).min(3, "requireds a min of 3 words"), 
    lastname:string({required_error:"secondname is required", }).min(3, "requireds a min of 3 words"),
    phone:string({required_error:"phone number is required"}).min(9, '9 digit phone number required'), 
    Address :object ({
        addressname: string().optional(),
        postcode: string({required_error:"postcode is required"}).min(6, "min of 6 letters required").max(6, 'max of 6 letters required'),
        county: string().optional(),
        country: string().optional(),


    }).optional(), 

}); 

export const refreshtokenpayload = object ({

}); 

export const loginSchema  = object ({
    email : string({required_error:"email is required"}).email("not a valid email"), 
    password:string( {required_error:"password is required"}).min(8, "min of 8 required on the password")
}); 


  const  query = object({
        userid:string({
            required_error:"userid is required "
        }), 
    }); 

export type getProductInput = TypeOf<typeof query>

export type LoginUserIput = TypeOf<typeof loginSchema>; 
export type CreateUserInput = TypeOf<typeof createUserSchema>; 
