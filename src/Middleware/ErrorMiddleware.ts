import {  Request, Response, NextFunction, Router } from "express";
import ErrorHandling from '../Util/ErrorHandling/ErrorHandler'
//https://github.com/mwanago/express-typescript/blob/master/src/middleware/error.middleware.ts
export default  async (err:ErrorHandling, req: Request, res:Response, next:NextFunction ) => {

    const status  = err.status || 500; 
    const message = err.message || 'something went wrong'; 
    console.log(err)

    res.status(status).send({
        code:status, 
        message: message
    }); 
}