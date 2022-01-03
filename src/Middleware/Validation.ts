import { Request, Response, NextFunction } from "express";
import {AnyZodObject} from "zod";
import {createUserSchema, CreateUserInput} from '../Payload/User.Schema'
interface errorform {
    error?:{
        message:string, 
        Code:number
    }
}
class Validation {
    constructor()
    {

    }
    public  async validation  (user:Request): Promise<errorform>{
        
       const valid_User =  createUserSchema.safeParse(user.body)
       if (!valid_User.success )
       {
           /*const errors :{reason:string}[]  = valid_User.error.issues.map(t => {
              return {
                   'reason':t.message
               }
           }); */
           const errors  =  valid_User.error.issues.reduce(( current) => {
                return current  ;
           })
           //console.log(errors)
          
           return {'error': {'message':errors.message, 'Code':400}}; 
       }
       
       return {}
    }
}

export default new Validation; 