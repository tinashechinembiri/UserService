interface UserProfileInterface {
  getUsersecretquestion(email:string) : any
  createuserpasswordRecovery(inputData: object): any
}

export default UserProfileInterface;