import wrappers from '../Middleware/AsyncWrapper'; 
import {  Request, Response, NextFunction, Router } from "express";
import {CreateUserInput, LoginUserIput, getProductInput, forgotPasswordInput, updateProductIput} from '../Payload/User.Schema'; 
import Validation from '../Middleware/Validation';
import CustomerService from '../Service/UserService'
import Controller from './Controller'; 
import  ErrorHandling from '../Util/ErrorHandling/ErrorHandler'; 
import SessionService from '../Service/SessionService'
import UserServiceInterface from '../Service/UserService.Interface'
import UsersTokenValidation  from '../Middleware/TokenValidation'
export default  class CustomerController  implements Controller {
    public path = ''; 
    public router = Router(); 
     createCustomer : UserServiceInterface = new CustomerService (); 
    
    constructor()
    {
        this.createRoutes(); 
    }
    public createRoutes()
    {
        this.router.route('/login/').post(this.logonUser); 
        this.router.route('/signup/').post(this.signUpCustomer); 
        this.router.route('/refreshtoken/').post(this.refreshToken); 
        this.router.route('/revoketoken/'); 
        this.router.route('/getuser/').get(UsersTokenValidation,this.getuserinformation)
        this.router.route('/forgotpassword/').put(this.forgotpassword);
        this.router.route('/updateuser/').put(UsersTokenValidation, this.updateuserprofile); 
    }
       
    private signUpCustomer = wrappers(async (req:Request<{}, {} , CreateUserInput>, res:Response, next:NextFunction) => {
        const user = req.body ; 
        const check_Valid = await Validation.validation(req) ; 
        if(check_Valid.error)
        {    
           throw new ErrorHandling (check_Valid.error?.Code!, check_Valid as string)          
        }
        const customer_service = await this.createCustomer.CreateUser(user); 
        res.status(customer_service.code).json(customer_service.message);      
    }); 

    private logonUser = wrappers(async (req:Request<{}, {} ,LoginUserIput>, res:Response, next:NextFunction) => {
        const user = req.body ?? '';
        const {code,message } = await SessionService.createSession(user); 
        res.status(code as number).json(message);
    }); 

    private refreshToken = wrappers(async (req:Request, res:Response, next:NextFunction) => { 
       const token :string  = req.headers['x-access-token'] as string
       const item = await SessionService.reissueToken(token); 
       res.send(); 

    }); 
    private getuserinformation  =  wrappers(async (req:Request<{}, {}, getProductInput>, res:Response, next:NextFunction) => { 
        const _id : string = req.query?.userid as string; 
        const { user_id} = res.locals.user; 
        if (user_id !== _id )
        {
            res.status(400).json({message: 'wrong id data sent with the cookies'}); 
        }
         const _response =   await  this.createCustomer.getUserprofile(_id); 
        res.status(_response.code).json(_response.message); 
    }); 

    private forgotpassword = wrappers (async (req:Request<{}, {}, forgotPasswordInput>, res:Response, next:NextFunction) => {
        const response = await this.createCustomer.forgotPassword (req.body); 
        res.status(response.code).json(response.message); 
    }); 

    private updateuserprofile = wrappers( async (req:Request<{}, {}, updateProductIput>, res:Response, next:NextFunction) =>{
            const response = await this.createCustomer.updateUserProfile(req.body); 
            res.status(response.code).json(response.message); 
    });  
}