import { useAsyncHandler } from './useAsyncHandler'
import { employeeUsesCases } from '@/dependency-injection/employee.container'
import type { Employee, EmployeeRequest } from '@/services/Employee/domain/models/Employee'

export function useEmployee() {
  //fet from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  const blockEmployee = async (employeeId: number) => {
    await runUseCase('blockEmployee', () => employeeUsesCases.blockEmployee.execute(employeeId))
  }

  //create
  const createEmployee = async (employeeRequest: EmployeeRequest): Promise<Employee> => {
    const employee = await runUseCase('createEmployee', () =>
      employeeUsesCases.createEmployee.execute(employeeRequest),
    )
    return employee
  }

  const getAllEmployees = async (): Promise<Employee[]> => {
    const employees: Employee[] = await runUseCase('getAllEmployees', () =>
      employeeUsesCases.getAllEmployees.execute(),
    )
    //adapt
    return employees
  }

  const getEmployeeById = async (employeeId: number): Promise<Employee> => {
    const employee: Employee = await runUseCase('getEmployeeById', () =>
      employeeUsesCases.getEmployeeById.execute(employeeId),
    )
    return employee
  }

  const getEmployeeByDocumentNumero = async (documentoNumero: string): Promise<Employee> => {
    const employee: Employee = await runUseCase('getEmployeeById', () =>
      employeeUsesCases.getEmployeeByDocumentoNumero.execute(documentoNumero),
    )
    return employee
  }

  const updateEmployee = async (
    employeeId: number,
    employeeRequest: Employee,
  ): Promise<Employee> => {
    const employee = await runUseCase('updateEmployee', () =>
      employeeUsesCases.updateEmployee.execute(employeeId, employeeRequest),
    )

    return employee
  }

  return {
    loading,
    error,
    createEmployee,
    blockEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    getEmployeeByDocumentNumero,
  }
}
