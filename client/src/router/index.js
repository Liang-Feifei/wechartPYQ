import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/page/index.vue'

Vue.use(Router)

const route =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: "",
          redirect: "/chats"
        },
        {
          path: "/chats",
          name: "chats",
          component: () => import('../components/page/charts.vue')
        },
        {
          path: "/contacts",
          name: "contacts",
          component: () => import('../components/page/contacts.vue')
        },
        {
          path: "/discover",
          name: "discover",
          component: () => import('../components/page/discover.vue')
        },
        {
          path: "/me",
          name: "me",
          component: () => import('../components/page/me.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      //懒加载组件
      component: () => import('../components/page/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/page/registered.vue')
    },
    {
      path: '/moments',
      name: 'moments',
      component: () => import('../components/page/moments.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../components/page/publish.vue')
    },
  ],
  mode: 'history'
})

route.beforeEach((to,from,next) => {
  const isLogin = localStorage.wxToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default route;