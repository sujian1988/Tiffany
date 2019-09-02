import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoriesEdit from './views/CategoriesEdit.vue'
import CategoriesList from './views/CategoriesList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main ,
      children: [
        {path: '/categories/create', component: CategoriesEdit},
        {path: '/categories/edit/:id', component: CategoriesEdit, props: true},
        {path: '/categories/list', component: CategoriesList},

      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
