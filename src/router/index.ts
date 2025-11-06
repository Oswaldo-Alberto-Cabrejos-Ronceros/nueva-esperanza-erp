import { createRouter, createWebHistory } from 'vue-router'
import EmployeeLayout from '@/layouts/EmployeeLayout.vue'
import LoginPage from '@/views/Auth/LoginPage/LoginPage.vue'
import HomePageAdministrador from '@/views/Employee/HomePageAdministrador/HomePageAdministrador.vue'
import PerfilPage from '@/views/Common/PerfilPage/PerfilPage.vue'
import EmployeeManagementPage from '@/views/Employee/EmployeeManagementPage/EmployeeManagementPage.vue'
import PageNotFound from '@/views/Common/PageNotFound/PageNotFound.vue'
//client
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
        }
      ],
    },
    {
      path: '/employee',
      component: EmployeeLayout,
      redirect: '/',
      children: [
        {
          path: 'administrator',
          meta: { role: 'ADMINISTRADOR' },

          children: [
            {
              path: '',
              redirect: '/employee/administrator/home',
              meta: { requiresAuth: true, roles: ['ADMINISTRADOR'] },
            },
            {
              path: 'home',
              name: 'administrator-home',
              component: HomePageAdministrador,
              meta: { requiresAuth: true, roles: ['ADMINISTRADOR'] },
            },
            {
              path: 'perfil',
              name: 'administrator-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['ADMINISTRADOR'] },
            },
            {
              path: 'employee-management',
              name: 'administrator-employee-management',
              component: EmployeeManagementPage,
              meta: { requiresAuth: true, roles: ['ADMINISTRADOR'] },
            },
          ],
        },
        {
          path: 'employee',
          meta: { role: 'TRABAJADOR' },
          redirect: '/employee/employee/home',
          children: [
            {
              path: 'home',
              name: 'manager-home',
              component: HomePageAdministrador,
              meta: { requiresAuth: true, roles: ['TRABAJADOR'] },
            },
            {
              path: 'perfil',
              name: 'maneger-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['TRABAJADOR'] },
            },
            {
              path: 'employee-management',
              name: 'manager-employee-management',
              component: EmployeeManagementPage,
              meta: { requiresAuth: true, roles: ['TRABAJADOR'] },
            },
          ],
        },
        {
          path: 'vendedor',
          meta: { role: 'VENDEDOR' },
          redirect: '/employee/vendedor/home',
          children: [
            {
              path: 'home',
              name: 'vendedor-home',
              component: HomePageAdministrador,
              meta: { requiresAuth: true, roles: ['VENDEDOR'] },
            },
            {
              path: 'perfil',
              name: 'vendedor-perfil',
              component: PerfilPage,
              meta: { requiresAuth: true, roles: ['VENDEDOR'] },
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
