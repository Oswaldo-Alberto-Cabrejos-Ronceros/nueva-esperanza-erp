import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from '@/layouts/ClientLayout.vue'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import LoginPage from '@/views/Auth/LoginPage/LoginPage.vue'
import RegistrationPage from '@/views/Auth/Registration/RegistrationPage.vue'
import HomePageClient from '@/views/Client/HomePage/HomePage.vue'
import HomePageAdministrador from '@/views/Employee/HomePageAdministrador/HomePageAdministrador.vue'
import PerfilPage from '@/views/Common/PerfilPage/PerfilPage.vue'
import EmployeeManagementPage from '@/views/Employee/EmployeeManagementPage/EmployeeManagementPage.vue'
import ClientManagementPage from '@/views/Employee/ClientManagementPage/ClientManagementPage.vue'
import PetsManagementPage from '@/views/Employee/PetsManagementPage/PetsManagementPage.vue'
import ServiceManagementPage from '@/views/Employee/ServiceManagementPage/ServiceManagementPage.vue'
import PaymentMethodManagementPage from '@/views/Employee/PaymentMethodManagementPage/PaymentMethodManagementPage.vue'
import HeadquartersManagementPage from '@/views/Employee/HeadquartersManagementPage/HeadquartersManagementPage.vue'
import CategoryManagementPage from '@/views/Employee/CategoryManagementPage/CategoryManagementPage.vue'
import RolePermissionManagementPage from '@/views/Employee/RolePermissionManagementPage/RolePermissionManagementPage.vue'
import SpecieManagementPage from '@/views/Employee/SpecieManagementPage/SpecieManagementPage.vue'
import BreedManagementPage from '@/views/Employee/BreedManagementPage/BreedManagementPage.vue'
//import ServicesHeadquarterManagementPage from '@/views/Employee/ServicesHeadquarterManagementPage/ServicesHeadquarterManagementPage.vue'
import PaymentManagementPage from '@/views/Employee/PaymentManagementPage/PaymentManagementPage.vue'
import AppointmentManagementPage from '@/views/Employee/AppointmentManagementPage/AppointmentManagementPage.vue'
import CareManagementPage from '@/views/Employee/CareManagementPage/CareManagementPage.vue'
import PageNotFound from '@/views/Common/PageNotFound/PageNotFound.vue'
import HomePageRecepcionist from '@/views/Employee/HomePageRecepcionist/HomePageRecepcionist.vue'
import HomePageVeterinary from '@/views/Employee/HomePageVeterinary/HomePageVeterinary.vue'
import AttendAppointmentPageRecepcionist from '@/views/Employee/AttendAppointmentPageRecepcionist/AttendAppointmentPageRecepcionist.vue'
import AttendAppointmentVeterinaryPage from '@/views/Employee/AttendAppointmentVeterinaryPage/AttendAppointmentVeterinaryPage.vue'
import CareUnitaryPage from '@/views/Employee/CareUnitaryPage/CareUnitaryPage.vue'
import HeadquarterVetServiceManagement from '@/views/Employee/HeadquarterVetServiceManagement/HeadquarterVetServiceManagement.vue'
import AppointmentsVeterinaryPage from '@/views/Employee/AppointmentsVeterinaryPage/AppointmentsVeterinaryPage.vue'
import AnaliticsPage from '@/views/Employee/AnaliticsPage/AnaliticsPage.vue'
import ReportsPage from '@/views/Employee/ReportsPage/ReportsPage.vue'
//client
import MyAppointmentsClientPage from '@/views/Client/MyAppointmentsClientPage/MyAppointmentsClientPage.vue'
import MyPetsPage from '@/views/Client/MyPetsPage/MyPetsPage.vue'
import PetUnitaryClientPage from '@/views/Client/PetUnitaryClientPage/PetUnitaryClientPage.vue'
import ScheduleAppointmentClientPage from '@/views/Client/ScheduleAppointmentClientPage/ScheduleAppointmentClientPage.vue'
import AppointmentUnitaryClientPage from '@/views/Client/AppointmentUnitaryClientPage/AppointmentUnitaryClientPage.vue'
import { useAuthentication } from '@/composables/useAuthentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: PageNotFound,
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginPage,
        },
        {
          path: 'registration',
          name: 'registration',
          component: RegistrationPage,
        },
      ],
    },
    {
      path: '/client',
      redirect: '/client/home',
      component: ClientLayout,
      children: [
        {
          path: 'home',
          name: 'client-home',
          component: HomePageClient,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'perfil',
          name: 'client-perfil',
          component: PerfilPage,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'my-appointments',
          name: 'client-my-appointments',
          component: MyAppointmentsClientPage,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'my-appointments/schedule-appointment',
          name: 'client-schedule-appointment',
          component: ScheduleAppointmentClientPage,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'my-pets',
          name: 'client-my-pets',
          component: MyPetsPage,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'my-pets/:petId',
          name: 'client-pets-unitary-pet',
          component: PetUnitaryClientPage,
          props: true,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
        {
          path: 'my-appointments/appointment/:appointmentId',
          name: 'client-appointment-unitary',
          component: AppointmentUnitaryClientPage,
          props: true,
          meta: { requiresAuth: true, roles: ['Cliente'] },
        },
      ],
    },
    {
      path: '/employee',
      component: EmployeeLayout,
      redirect: '/',
      children: [
        {
          path: 'administrator',
          meta: { role: 'ADMINISTRATOR' },

          children: [
            {
              path: '',
              redirect: '/employee/administrator/home',
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'home',
              name: 'administrator-home',
              component: HomePageAdministrador,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'perfil',
              name: 'administrator-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'employee-management',
              name: 'administrator-employee-management',
              component: EmployeeManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'client-management',
              name: 'administrator-client-management',
              component: ClientManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'pets-management',
              name: 'administrator-pets-management',
              component: PetsManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'services-management',
              name: 'administrator-services-management',
              component: ServiceManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'payment-method-management',
              name: 'administrator-payment-method-management',
              component: PaymentMethodManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'headquarter-management',
              name: 'administrator-headquarter-management',
              component: HeadquartersManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'category-management',
              name: 'administrator-category-management',
              component: CategoryManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'pets-management/pet/:petId',
              name: 'administrator-pets-unitary-pet',
              component: PetUnitaryClientPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'roles-permission',
              name: 'administrator-roles-permission-management',
              component: RolePermissionManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'species-management',
              name: 'administrator-species-management',
              component: SpecieManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'breeds-management',
              name: 'administrator-breeds-management',
              component: BreedManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'services-headquarters-management',
              name: 'administrator-services-headquarters-management',
              component: HeadquarterVetServiceManagement,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },

            {
              path: 'payment-management',
              name: 'administrator-payment-management',
              component: PaymentManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'appoinment-management',
              name: 'administrator-appoinment-management',
              component: AppointmentManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'appoinment-management/attend/:appointmentId',
              name: 'administrator-appointment-management-attend',
              component: AttendAppointmentPageRecepcionist,
              props: true,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'care-management',
              name: 'administrator-care-management',
              component: CareManagementPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'care-management/care/:careId',
              name: 'administrator-care-management-unitary',
              component: CareUnitaryPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'analitics',
              name: 'administrator-analitics',
              component: AnaliticsPage,
              meta: { requiresAuth: true, roles: ['Administrador'] },
            },
            {
              path: 'reports',
              name: 'administrador-reports',
              component: ReportsPage,
            },
          ],
        },
        {
          path: 'manager',
          meta: { role: 'MANAGER' },
          redirect: '/employee/manager/home',
          children: [
            {
              path: 'home',
              name: 'manager-home',
              component: HomePageAdministrador,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'perfil',
              name: 'maneger-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'employee-management',
              name: 'manager-employee-management',
              component: EmployeeManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'client-management',
              name: 'manager-client-management',
              component: ClientManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'pets-management',
              name: 'manager-pets-management',
              component: PetsManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'appoinment-management',
              name: 'manager-appoinment-management',
              component: AppointmentManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'pets-management/pet/:petId',
              name: 'manager-pets-unitary-pet',
              component: PetUnitaryClientPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'appoinment-management/attend/:appointmentId',
              name: 'manager-appointment-management-attend',
              component: AttendAppointmentPageRecepcionist,
              props: true,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'care-management',
              name: 'manager-care-management',
              component: CareManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'care-management/care/:careId',
              name: 'manager-care-management-unitary',
              component: CareUnitaryPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'services-management',
              name: 'manager-services-management',
              component: ServiceManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'category-management',
              name: 'manager-category-management',
              component: CategoryManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'services-headquarters-management',
              name: 'manager-services-headquarters-management',
              component: HeadquarterVetServiceManagement,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'payment-method-management',
              name: 'manager-payment-method-management',
              component: PaymentMethodManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'species-management',
              name: 'manager-species-management',
              component: SpecieManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'breeds-management',
              name: 'manager-breeds-management',
              component: BreedManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
            {
              path: 'payment-management',
              name: 'manager-payment-management',
              component: PaymentManagementPage,
              meta: { requiresAuth: true, roles: ['Encargado Sede'] },
            },
          ],
        },
        {
          path: 'receptionist',
          meta: { role: 'RECEPTIONIST' },
          redirect: '/employee/receptionist/home',
          children: [
            {
              path: 'home',
              name: 'receptionist-home',
              component: HomePageRecepcionist,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'perfil',
              name: 'receptionist-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'pets-management',
              name: 'receptionist-pets-management',
              component: PetsManagementPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },

            {
              path: 'pets-management/pet/:petId',
              name: 'receptionist-pets-unitary-pet',
              component: PetUnitaryClientPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'payment-management',
              name: 'receptionist-payment-management',
              component: PaymentManagementPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },

            {
              path: 'appoinment-management',
              name: 'receptionist-appointment-management',
              component: AppointmentManagementPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'appoinment-management/attend/:appointmentId',
              name: 'receptionist-appointment-management-attend',
              component: AttendAppointmentPageRecepcionist,
              props: true,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'care-management',
              name: 'receptionist-care-management',
              component: CareManagementPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'care-management/care/:careId',
              name: 'receptionist-care-management-unitary',
              component: CareUnitaryPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
            {
              path: 'client-management',
              name: 'receptionist-client-management',
              component: ClientManagementPage,
              meta: { requiresAuth: true, roles: ['Recepcionista'] },
            },
          ],
        },
        {
          path: 'veterinary',
          meta: { role: 'VETERINARY' },
          redirect: '/employee/veterinary/home',
          children: [
            {
              path: 'home',
              name: 'veterinary-home',
              component: HomePageVeterinary,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
            {
              path: 'perfil',
              name: 'veterinary-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
            {
              path: 'pets-management',
              name: 'veterinary-pets-management',
              component: PetsManagementPage,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
            {
              path: 'pets-management/pet/:petId',
              name: 'veterinary-pets-unitary-pet',
              component: PetUnitaryClientPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
            {
              path: 'appointments',
              name: 'appointments',
              component: AppointmentsVeterinaryPage,
              props: true,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
            {
              path: 'appointments/attend/:appointmentId',
              name: 'veterinary-appointments-attend',
              props: true,
              component: AttendAppointmentVeterinaryPage,
              meta: { requiresAuth: true, roles: ['Veterinario'] },
            },
          ],
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { getMainRole } = useAuthentication()
  const requiresAuth = to.meta.requiresAuth
  const allowedRoles = to.meta.roles as string[] | undefined
  const userRole = getMainRole()
  if (requiresAuth) {
    if (!userRole) {
      return next({ name: 'login' })
    } else {
      if (allowedRoles && !allowedRoles.includes(userRole)) {
        return next({ name: 'not-found' })
      }
    }
  }
  next()
})

export default router
