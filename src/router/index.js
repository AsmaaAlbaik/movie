import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie-details/:id',
    name: 'movieDetails',
    // route level code-splitting
    // this generates a separate chunk (movieDetails.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "movieDetails" */ '@/components/movie/CardDetails.vue')
  }, 
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    // this will return the last position we were on when click on back button
    if (savedPosition) {
      return savedPosition
    } 
  },
  routes
})

export default router
