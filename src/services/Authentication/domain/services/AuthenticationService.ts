import type { User,UserClientRequest } from "../models/User";

export interface AuthenticationService{
  loginClient(email:string,password:string):Promise<User>;
  loginEmployee(email:string,password:string):Promise<User>;
  register(user:UserClientRequest):Promise<User>;
  logout():Promise<void>
}
