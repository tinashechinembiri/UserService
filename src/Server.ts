//https://github.com/TomDoesTech/REST-API-Tutorial/blob/main/src/controller/post.controller.ts
import App from './App';
import config from "config"; 
import CustomerController from './Controller/CustomerController'
import UserProfileController from './Controller/UserProfileController'

const  app = new App ( [ 
    new CustomerController (), 
    new UserProfileController()
])


/*
const port  = config.get("port") as number; 
const server  = app.listen(port, ()=> {

    console.log('server ready http '+ port); 
})

*/
const port  = config.get("port") as number; 
const server =  app.listen(port); 

export default server; 




