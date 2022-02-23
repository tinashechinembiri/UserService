import Express, {  Request, Response } from "express";
import config from "config"; 
import {DbConnection} from './Db/DbConnection'; 
import {MongodbHadler} from './Db/Databases/DatabaseFactoryHandler/MongodbHandler'
//import Routes from'./Routes/Routes'; 
import Controller from './Controller/Controller'
import ErrorMiddleware from'./Middleware/ErrorMiddleware'; 
import cors from'cors'; 
/*
const app = Express(); 

app.use(Express.json()); 
app.use(Express.urlencoded({extended:true}))

//let moongoseDb = DbConnection.getInstance(); 
 //moongoseDb.connection(config.get('db'))
 let moongoseDb = new MongodbHadler(); 
 
 moongoseDb.createConnection(config.get<string>('db')); 

 app.use('/api/auth', Routes)

app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200).send({'message':'success'}));

export default app; 
*/

class App {
    public app : Express.Application; 

    constructor (controller : Controller [] )
    {
        this.app = Express(); 

        this.createDatabase(); 
        this.createMiddlewares(); 
        this.createControllers(controller); 
        this.createErrorhandling(); 
    }

    private createDatabase () 
    {
        const  moongoseDb = new MongodbHadler(); 
       moongoseDb.createConnection(config.get<string>('db')); 
    }
    private createMiddlewares () 
    {
       this.app.use(Express.json()); 
       this.app.use(Express.urlencoded({extended:true})); 
       this.app.use(cors()); 
    }

    private createControllers(controllers : Controller [] )
    {
        
        controllers.forEach ((controller) => {
            this.app.use('/api/auth', controller.router); 
        }); 
    }
    private createErrorhandling () 
    {
        this.app.use([ErrorMiddleware]); 
    }

    public getServer ()
    {
        this.app; 
    }
    public listen (port : number)
    {
        this.app.listen (port, ()=> {

            console.log('server ready http '+ port); 
        })
    }
    
}

export default App; 