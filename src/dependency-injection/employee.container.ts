//import use case
import { BlockEmployee } from '@/services/Employee/aplication/BlockEmployee'
import { CreateEmployee } from '@/services/Employee/aplication/CreateEmployee'
import { GetAllEmployees } from '@/services/Employee/aplication/GetAllEmployees'
import { GetEmployeeById } from '@/services/Employee/aplication/GetEmployeeById'
import { UpdateEmployee } from '@/services/Employee/aplication/UpdateEmployee'
//import axiosHttpClient
import { AxiosHttpClient } from '@/services/Http/infrastructure/AxiosHttpClient'
//import service implemetation
import { EmployeeServiceImpl } from '@/services/Employee/infrastructure/EmployeeServiceImpl'
import { GetEmployeeByDocumentoNumero } from '@/services/Employee/aplication/GetEmployeeByDocumentoNumero'

//instantiete AxiosHttpCliente
const axiosHttpClient = new AxiosHttpClient()
//instantiete service implementation
const employeeService = new EmployeeServiceImpl(axiosHttpClient)

//expose uses cases

export const employeeUsesCases = {
  //inject dependency
  blockEmployee: new BlockEmployee(employeeService),
  createEmployee: new CreateEmployee(employeeService),
  getAllEmployees: new GetAllEmployees(employeeService),
  getEmployeeById: new GetEmployeeById(employeeService),
  updateEmployee: new UpdateEmployee(employeeService),
  getEmployeeByDocumentoNumero: new GetEmployeeByDocumentoNumero(employeeService),
}
