import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth } from "firebase/auth"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/profile/:id',
    name: 'profile',
    // beforeEnter: [haveRoleGuard],
    component: () => import(/* webpackChunkName: "profile" */ '../views/PerfilView.vue'),
    props: (route) => {
      const userid = route.params.id;
      return { userid };
    },
    meta: {
      requireAuth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "products" */ '../views/ResetPassword.vue')
  },
  {
    path: '/post',
    name: 'postflit',
    component: () => import(/* webpackChunkName: "products" */ '../views/postFlit.vue'),

  },
  {
    path: '/user/:username',
    name: 'UserPageView',
    component: () => import(/* webpackChunkName: "products" */ '../views/UserPageView.vue'),
    props: (route) => {
      const userName = route.params.username;
      return { userName };
    }
  },
  {
    path: '/SearchResult/:searchTerm',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: "products" */ '../views/SearchResult.vue'),
    props: (route) => {
      const searchTerm = route.params.searchTerm;
      return { searchTerm };
    }
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      alert("you don't have access!")
      next("/")
    }
  } else {
    next()
  }
})
export default router
