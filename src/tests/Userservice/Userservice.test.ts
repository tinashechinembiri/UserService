import{CreateUserInput} from '../../Payload/User.Schema'; 
import User from '../../Model/UserModel';
import UserService from'../../Service/UserService';
import customer from '../../Model/CustomerModel';
import ErrorHandling from '../../Util/ErrorHandling/ErrorHandler';

//https://github.com/bjaanes/ExtremeResults-Server/blob/master/tests/unit/controllers/hotSpotBucketController.spec.js
describe ('create users ', ()=> {
let sampleuserpaylod : CreateUserInput; 
let userservice : UserService; 
let _customer 

beforeEach ( ()=> {
   sampleuserpaylod = {
       user_id:'test123', 
       email:'test123@test.com', 
       password:'Test@123', 
       Account: {
         accountid:"test123", 
         firstname:"testname", 
         lastname:"testlastname",
         phone: "0987654321"
       }
   }; 

    userservice = new UserService(); 
}); 
afterEach ((()=>{
  jest.resetAllMocks(); 
})); 

it('create a user : 200 response ' , async() => {
   
    _customer = new customer(sampleuserpaylod.Account)
    _customer   =  jest.spyOn(customer.prototype, 'save').mockResolvedValue({...sampleuserpaylod.Account, _Id:'1'}); 
    User.prototype.save = jest.fn().mockImplementation(async ()=>{ return {...sampleuserpaylod,_Id:'1'}}); 
   const _createuser =   await userservice.CreateUser(sampleuserpaylod); 
   expect(_createuser.code).toEqual(200); 
}); 
it('create a user : 400 response ', async () => {
  _customer = new customer(); 
  try {
  _customer = jest.spyOn(customer.prototype, 'save')
                  .mockImplementation(async ()=>{ throw new  ErrorHandling(400, "Appointment mock failed") }); //ErrorHandling(400, "mock failed")
   
 /*  jest.spyOn(console, 'error')
     .mockImplementation()*/
 // User.prototype.save = jest.fn().mockImplementation(()=>{ return {...sampleuserpaylod,_Id:'1'}}); 
  
  //console.log(User.toString())
    let _createuser  = await userservice.CreateUser(sampleuserpaylod); 
   // console.log(_createuser)
  }catch(e : any)
  {
    let ex = e as ErrorHandling; 
       
    expect(ex.status).toEqual(400);
  }

})

it('get user : 200', async ()=>{

 User.findaccount =  jest.fn().mockImplementation(async ()=>{  return  {...sampleuserpaylod,_Id:'1'}});
  
 let getuser = await userservice.getUserprofile(sampleuserpaylod.user_id); 

 expect(getuser).not.toBeNull(); 

}); 

it ('get user : 400', async ()=> {
  User.findaccount =  jest.fn().mockImplementation(async ()=>{  return null});
  
expect( async() => {await userservice.getUserprofile(sampleuserpaylod.user_id)}).rejects.toThrowError(new Error("not found"));  
}); 
}); 

