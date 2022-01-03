import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import {verifyjwt} from '../Util/jwtconfig'


    async  function UsersTokenValidation (req:Request, res:Response, next :NextFunction) {
        const _accessToken =  req.headers['x-access-token'] as string
        console.log(_accessToken); 
        if (!_accessToken )
        {
            console.log("error 1")
            res.status(401).json({"message":"no access token found"}); 
        }
        const {valid, decoded,expired} = verifyjwt (_accessToken, "accessTokenPrivateKey"); 

        if (!decoded)
        {
            console.log("error 2")
            res.status(401).json({"message": "token expired"})
        }
        res.locals.user = decoded; 
        next(); 
    }



export default  UsersTokenValidation; 