import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/detail'
import admin from '@/components/admin'
import login from '@/components/login'
import edit from '@/components/edit'
import newBlog from '@/components/newBlog'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/newBlog',
      name: 'newBlog',
      component: newBlog
    }
  ]
})
