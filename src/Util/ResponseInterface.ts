

export  interface responseHandler {
    code : number , 
    message: object
}

 export interface TokenResponseHandler {
    code: number |string, 
    message : {
        code: number|string, 
        token : string, 
        refreshToken?:string
    }

}

export interface refreshTokenHandler {
    _id : string, 
    user_id: string, 
    email:string, 
   
    
}