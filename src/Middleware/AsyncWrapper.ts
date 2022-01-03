import {  Request, Response, NextFunction } from "express";

    const  wrappers = (fn:Function) => 
    {
         
        return async (req:Request, res:Response, next:NextFunction) => {
            try{
               

            return await fn(req, res, next); 
            }catch(error)
            {
                console.log('test123')
               
                next(error); 
            }
        }
        
    }
   
    export default wrappers; 
