import { useAsyncHandler } from './useAsyncHandler'
import { employeeUsesCases } from '@/dependency-injection/employee.container'
import { EmployeeAdapter } from '@/adapters/EmployeeAdapter'
import type { Employee } from '@/services/Employee/domain/models/Employee'
import type { Employee as EmployeeView } from '@/models/Employee'
import type { PageResponse } from '@/services/models/PageResponse'
import type { FormValues as EmployeeAddSchema } from '@/validation-schemas-forms/schema-add-employee'
import type { FormValues as EmployeeEditSchema } from '@/validation-schemas-forms/schema-edit.employee'
import type { MyInfoEmployee } from '@/services/Employee/domain/models/Employee'
import type { MyInfoEmployee as MyInfoEmployeeView } from '@/models/MyInfoEmployee'
import type { EmployeeList as EmployeeListView } from '@/models/EmployeeList'

export function useEmployee() {
  //fet from useAsyncHandle
  const { loading, error, runUseCase } = useAsyncHandler()

  //expose use cases

  const blockEmployee = async (employeeId: number, blockNote: string) => {
    await runUseCase('blockEmployee', () =>
      employeeUsesCases.blockEmployee.execute(employeeId, blockNote),
    )
  }

  //create

  const createEmployee = async (employeeAddSchema: EmployeeAddSchema): Promise<EmployeeView> => {
    const employeeRequest = EmployeeAdapter.fromSchemaAddToEmployeeRequest(employeeAddSchema)
    const employee = await runUseCase('createEmployee', () =>
      employeeUsesCases.createEmployee.execute(employeeRequest),
    )
    return EmployeeAdapter.toEmployeeView(employee)
  }

  const getAllEmployees = async (): Promise<EmployeeView[]> => {
    const employees: Employee[] = await runUseCase('getAllEmployees', () =>
      employeeUsesCases.getAllEmployees.execute(),
    )
    //adapt
    return employees.map((employee) => EmployeeAdapter.toEmployeeView(employee))
  }

  const getEmployeeById = async (employeeId: number): Promise<EmployeeView> => {
    const employee: Employee = await runUseCase('getEmployeeById', () =>
      employeeUsesCases.getEmployeeById.execute(employeeId),
    )
    return EmployeeAdapter.toEmployeeView(employee)
  }

  const getEmployeeMyInfo = async (employeeId: number): Promise<MyInfoEmployeeView> => {
    const myInfoEmployee: MyInfoEmployee = await runUseCase('getEmployeeMyInfo', () =>
      employeeUsesCases.getEmployeeMyInfo.execute(employeeId),
    )
    return EmployeeAdapter.fromMyInfoEmployeeToMyInfoEmployeeView(myInfoEmployee)
  }

  const restoreEmployee = async (employeeId: number) => {
    await runUseCase('restoreEmployee', () => employeeUsesCases.restoreEmployee.execute(employeeId))
  }

  const searchEmployees = async (
    status: boolean,
    dni?: string,
    cmvp?: string,
    name?: string,
    lastName?: string,
    headquarterName?: string,
    rolName?: string,
    page?: number,
    size?: number,
  ): Promise<PageResponse<EmployeeListView>> => {
    const pageEmployee = await runUseCase('searchEmployees', () =>
      employeeUsesCases.searchEmployees.execute(
        status,
        dni,
        cmvp,
        name,
        lastName,
        headquarterName,
        rolName,
        page,
        size,
      ),
    )
    const employeesView = pageEmployee.content.map((employee) =>
      EmployeeAdapter.fromEmployeeListToEmployeeListView(employee),
    )
    return {
      ...pageEmployee,
      content: employeesView,
    }
  }

  //update

  const updateEmployee = async (
    employeeId: number,
    employeeEditSchema: EmployeeEditSchema,
  ): Promise<EmployeeView> => {
    const employeeRequest = EmployeeAdapter.fromSchemaEditToEmployeeRequest(employeeEditSchema)
    const employee = await runUseCase('updateEmployee', () =>
      employeeUsesCases.updateEmployee.execute(employeeId, employeeRequest),
    )

    return EmployeeAdapter.toEmployeeView(employee)
  }

  const getVeterinarianPanelStatsToday = async (veterinarianId: number) => {
    return await runUseCase('getVeterinarianPanelStatsToday', () =>
      employeeUsesCases.getVeterinarianPanelStatsToday.execute(veterinarianId),
    )
  }

  return {
    loading,
    error,
    createEmployee,
    blockEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeeMyInfo,
    restoreEmployee,
    searchEmployees,
    updateEmployee,
    getVeterinarianPanelStatsToday,
  }
}
