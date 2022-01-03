import{DatabaseInterface} from '../DatabaseInterface'; 
import {connect} from 'mongoose';
export class MongoDb  implements DatabaseInterface {

    public async connection(connection_String : string) : Promise<void>
    {
        try{
            await connect(connection_String); 
           console.log('connected')
           } catch (ex)
           {
               console.log(ex); 
           }

    }
}