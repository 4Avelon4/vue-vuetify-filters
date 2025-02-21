import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/defaultLayout.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;