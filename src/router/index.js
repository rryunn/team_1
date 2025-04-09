import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('@/pages/Dashboard.vue'),
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('@/pages/Registration.vue'),
    },
    {
      path: '/totaltransaction',
      name: 'totalTransaction',
      component: () => import('@/pages/TotalTransaction.vue'),
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/pages/TransactionRegisterPage.vue'),
    },
    {
      path: '/transactions/edit/:id',
      name: 'transactionsEdit',
      component: () => import('@/pages/TransactionEditPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/ProfilePage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
});

export default router;
