import type { Employee, EmployeeRequest } from '@/services/Employee/domain/models/Employee'
import type { Employee as EmployeeView } from '@/models/Employee'
import type { FormValues as EmployeeAddSchema } from '@/validation-schemas-forms/schema-add-employee'
import type { FormValues as EmployeeEditSchema } from '@/validation-schemas-forms/schema-edit.employee'
import type { MyInfoEmployee } from '@/services/Employee/domain/models/Employee'
import type { MyInfoEmployee as MyInfoEmployeeView } from '@/models/MyInfoEmployee'
import type { EmployeeBasicInfo } from '@/services/Employee/domain/models/Employee'
import type { EmployeeBasicInfo as EmployeeBasicInfoView } from '@/models/EmployeeBasicInfo'
import type { EmployeeList } from '@/services/Employee/domain/models/Employee'
import type { EmployeeList as EmployeeListView } from '@/models/EmployeeList'

import { DateAdapter } from './DateAdapter'

export class EmployeeAdapter {
  //for adapt from employee to employeeView
  static toEmployeeView(employee: Employee): EmployeeView {
    return {
      userId: employee.user?.userId,
      employeeId: employee.employeeId,
      dni: employee.dni,
      cmvp: employee?.cmvp,
      names: employee.name,
      lastnames: employee.lastName,
      address: employee.address,
      phone: employee.phone,
      headquarter: {
        headquarterId: employee.headquarter.headquarterId,
        name: employee.headquarter.name,
      },
      birthdate: employee.birthDate,
      dirImage: employee.dirImage,
      roles: employee.roles,
    }
  }

  //para adaptar de schema add a EmployeeRequest
  static fromSchemaAddToEmployeeRequest(schemaAdd: EmployeeAddSchema): EmployeeRequest {
    return {
      dni: schemaAdd.dni,
      cmvp: schemaAdd.cmvp,
      name: schemaAdd.names,
      lastName: schemaAdd.lastnames,
      address: schemaAdd.address,
      phone: schemaAdd.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaAdd.birthdate),
      dirImage: schemaAdd.dirImage,
      headquarter: {
        headquarterId: schemaAdd.headquarterId,
      },
      user: {
        email: schemaAdd.email,
        password: schemaAdd.password,
      },
      roles: [
        {
          roleId: schemaAdd.roleId,
        },
      ],
    }
  }

  //para adaptar de schema edit a EmployeeRequest

  static fromSchemaEditToEmployeeRequest(schemaEdit: EmployeeEditSchema): EmployeeRequest {
    return {
      dni: schemaEdit.dni,
      cmvp: schemaEdit.cmvp,
      name: schemaEdit.names,
      lastName: schemaEdit.lastnames,
      address: schemaEdit.address,
      phone: schemaEdit.phone,
      birthDate: DateAdapter.toDateYYYYmmDD(schemaEdit.birthdate),
      dirImage: schemaEdit.dirImage,
      headquarter: {
        headquarterId: schemaEdit.headquarterId,
      },
      roles: [
        {
          roleId: schemaEdit.roleId,
        },
      ],
    }
  }
  //para adaptar MyInfoEmployee a MyInfoEmployeeView

  static fromMyInfoEmployeeToMyInfoEmployeeView(
    myInfoEmployee: MyInfoEmployee,
  ): MyInfoEmployeeView {
    return {
      employeeId: myInfoEmployee.employeeId,
      user: {
        id: myInfoEmployee.user.id,
        email: myInfoEmployee.user.email,
      },
      dni: myInfoEmployee.dni,
      cmvp: myInfoEmployee.cmvp,
      names: myInfoEmployee.names,
      lastnames: myInfoEmployee.lastNames,

      address: myInfoEmployee.address,
      phone: myInfoEmployee.phone,
      headquarter: {
        id: myInfoEmployee.headquarter.id,
        name: myInfoEmployee.headquarter.name,
      },
      birthdate: myInfoEmployee.birthDate,
      dirImage: myInfoEmployee.dirImage,
      roles: myInfoEmployee.roles,
    }
  }

  //for adapt EmployeeBasicInfo

  static fromEmployeeBasicInfoToEmployeeBasicInfoView(
    employeeBasic: EmployeeBasicInfo,
  ): EmployeeBasicInfoView {
    return {
      id: employeeBasic.id,
      fullName: employeeBasic.fullName,
    }
  }

  //for adapt employeeAdapt

  static fromEmployeeListToEmployeeListView(employeeList: EmployeeList): EmployeeListView {
    return {
      id: employeeList.employeeId,
      dni: employeeList.dni,
      cmvp: employeeList.cmvp,
      names: employeeList.name,
      lastnames: employeeList.lastName,
      rolName: employeeList.rolName,
      nameHeadquarter: employeeList.nameHeadquarter,
      status: employeeList.status,
    }
  }
}
