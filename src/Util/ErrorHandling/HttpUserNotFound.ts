import  ErrorHandler from './ErrorHandler'
class HttpUserNotFound  extends ErrorHandler {
   
    constructor ()
    {
        super(404, 'User not found'); 
    }

}
export default HttpUserNotFound; 