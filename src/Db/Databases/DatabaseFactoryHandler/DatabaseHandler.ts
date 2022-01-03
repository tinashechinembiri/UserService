import{DatabaseInterface} from '../DatabaseInterface'; 
export abstract class  DatabaseHandler {

   public abstract createDb () : DatabaseInterface

   public async createConnection (connection_String : string): Promise<void>
   {
    const myDb = this.createDb(); 
    await myDb.connection(connection_String); 
   }
   
}