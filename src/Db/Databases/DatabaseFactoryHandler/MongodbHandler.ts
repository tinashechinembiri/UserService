import{DatabaseHandler} from'./DatabaseHandler'; 
import{DatabaseInterface} from '../DatabaseInterface'; 
import {MongoDb} from'../DatabaseTypes/MongoDb'
export class MongodbHadler extends DatabaseHandler {
    public createDb (): DatabaseInterface
    {
     return new  MongoDb();   
    }
}
