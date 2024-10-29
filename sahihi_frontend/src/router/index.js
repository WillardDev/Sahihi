import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '@/components/auth/SignUp.vue'
import Login from '@/components/auth/Login.vue'
import UserList from '@/components/user/UserList.vue'
import CustomerList from '@/components/customer/CustomerList.vue'
import CustomerForm from '@/components/customer/CustomerForm.vue'
import LeadForm from '@/components/lead/LeadForm.vue'
import LeadsList from '@/components/lead/LeadsList.vue'
import EditCustomer from '@/components/customer/EditCustomer.vue'
import CustomerDetail from '@/components/customer/CustomerDetail.vue'
import ProjectList from '@/components/projects/ProjectList.vue'
import ProjectForm from '@/components/projects/ProjectForm.vue'
import ProjectEdit from '@/components/projects/ProjectEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'userslist',
    component: UserList
  },
  {
    path: '/customers',
    name: 'customerList',
    component: CustomerList
  },
  {
    path: '/customers/create',
    name: 'customerForm',
    component: CustomerForm
  },
  {
    path: '/leads/create',
    name: 'leadForm',
    component: LeadForm
  },
  {
    path: '/leads',
    name: 'leadList',
    component: LeadsList
  },
  {
    path: '/customers/edit/:id',
    name: 'editCustomer',
    component: EditCustomer,
    props: true,
  },
  {
    path: '/customers/:id',
    name: 'customerDetail',
    component: CustomerDetail,
    props: true,
  },
  {
    path: '/projects',
    name: 'projectList',
    component: ProjectList
  },
  {
    path: '/projects/create',
    name: 'projectForm',
    component: ProjectForm
  },
  {
    path: '/projects/edit/:id',
    name: 'projectEdit',
    component: ProjectEdit,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
