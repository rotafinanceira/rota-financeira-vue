import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Inicio.vue';
import Maintenance from '@/components/Manutencao.vue';
import History from '@/components/Historico.vue';
import Profile from '@/components/Perfis.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/oil-maintenance',
    name: 'Maintenance',
    component: Maintenance,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
