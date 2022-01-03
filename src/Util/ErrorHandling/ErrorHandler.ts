class ErrorHandling extends Error {
     message : string; 
     status : number; 
    constructor (status: number , message : string)
    {
        
        super(); 
        this.message = message; 
        this.status = status; 

    }


}
export default ErrorHandling; 