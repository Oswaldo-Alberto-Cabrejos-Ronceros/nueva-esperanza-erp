//import uses cases
import { LoginClient } from "@/services/Authentication/aplication/LoginClient";
import { LoginEmployee } from "@/services/Authentication/aplication/LoginEmployee";
import { LogoutUser } from "@/services/Authentication/aplication/LogoutUser";
import { RegisterUserClient } from "@/services/Authentication/aplication/ResgisterUserClient";
//import service implementation
import { AuthenticationServiceImpl } from "@/services/Authentication/infrastructure/AuthenticationServiceImpl";

//instantiete service implementation
const authenticationService= new AuthenticationServiceImpl()

//expose uses cases

export const authenticationUseCases ={
  //inject dependency
  loginClient: new LoginClient(authenticationService),
  loginEmployee:new LoginEmployee(authenticationService),
  logoutUser:new LogoutUser(authenticationService),
  registerUserClient:new RegisterUserClient(authenticationService)
}
