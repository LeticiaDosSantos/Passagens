import { createRouter, createWebHistory } from 'vue-router'
import Vouchers from '../views/Vouchers.vue'
import EventDetailsView from '../views/EventDetailsView.vue'
import MenuAtendenteView from '../views/MenuAtendenteView.vue'
import MenuCobradorView from '../views/MenuCobradorView.vue'
import MenuAdmView from '../views/MenuAdmView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vouchers',
      name: 'vouchers',
      component: Vouchers
    },
    {
      path: '/menu-cobrador',
      name: 'menu-cobrador',
      component: MenuCobradorView
    },
    {
      path: '/menu-atendente',
      name: 'menu-atendente',
      component: MenuAtendenteView
    }, 
    {
      path: '/menu-adm',
      name: 'menu-adm',
      component: MenuAdmView
    }, 
    {
      path: '/event/:id',
      name: 'event-details',
      props: true,
      component: EventDetailsView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilView,
    },
  ]
})

export default router
