import Controller from './Controller'; 
import {  Request, Response, NextFunction, Router } from "express";
import wrappers from '../Middleware/AsyncWrapper'; 
import UserProfileInterface from '../Service/Userprofile.Interface'; 
import UserProfileService from '../Service/UserProfileService'

export default class UserProfileController  implements Controller {
    public path = ''; 
    public router = Router(); 
    _UserProfileService : UserProfileInterface = new UserProfileService(); 
    constructor (){
        this.createRoutes(); 
    }
    public createRoutes() {
        this.router.route('/getsecretquestion/').post(this.getSecretQuestion); 
        this.router.route('/createsecretquestion/').post(this.createPasswordController); 
    }
    private getSecretQuestion = wrappers (async (req:Request, res:Response, next:NextFunction) => {
        const {email} = req.body; 
        if (!email)
        {
            res.status(400).json ({message: 'the request body is empty'}); 
        }
       const response =  await  this._UserProfileService.getUsersecretquestion(email); 
       res.status(response.code).json(response.message); 
    }); 

    private createPasswordController = wrappers (async(req:Request, res:Response, next:NextFunction)  =>{   
            if (!req.body)
            {
                res.status(400).json ({message: 'the request body is empty'}); 
            }
            const response = await this._UserProfileService.createuserpasswordRecovery(req.body); 
            res.status(response.code).json(response.message); 
    }); 
}
