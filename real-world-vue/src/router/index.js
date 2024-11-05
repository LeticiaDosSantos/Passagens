import { createRouter, createWebHistory } from 'vue-router'
import VouchersView from '../views/VouchersView.vue'
import EventDetailsView from '../views/EventDetailsView.vue'
import MenuAtendenteView from '../views/MenuAtendenteView.vue'
import MenuCobradorView from '../views/MenuCobradorView.vue'
import MenuAdmView from '../views/MenuAdmView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'
import UsuariosListaView from '../views/UsuariosListaView.vue'
import HomeView from '../views/HomeView.vue'
import ViagensView from '../views/ViagensView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/linhas',
      name: 'linhas',
      component: ViagensView
    },
    {
      path: '/vouchers',
      name: 'vouchers',
      component: VouchersView
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
    },{
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosListaView,
    },
  ]
})

export default router
