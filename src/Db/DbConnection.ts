import {connect} from 'mongoose';
export class DbConnection {
    
    private static instance : DbConnection; 
   private _conn : any; 

    constructor ()
    {
     
 
   }

   public async connection (connection_String : string): Promise<void>{
       try{
        await connect(connection_String); 
       console.log('connected')
       } catch (ex)
       {
           console.log(ex); 
       }
   }

   public static getInstance():DbConnection{
       if (!DbConnection.instance)
       {
           DbConnection.instance = new DbConnection(); 
       }
       return DbConnection.instance; 

   }
}