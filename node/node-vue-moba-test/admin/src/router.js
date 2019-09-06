import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoriesEdit from './views/CategoriesEdit.vue'
import CategoriesList from './views/CategoriesList.vue'

import ItemsEdit from './views/ItemsEdit.vue'
import ItemsList from './views/ItemsList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HerosList from './views/HerosList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

Vue.use(Router)

export default new Router({

  routes: [

    {path: '/login', name: 'login', component: Login},

    {
      path: '/',
      name: 'main',
      component: Main ,
      children: [
        {path: '/categories/create', component: CategoriesEdit},
        {path: '/categories/edit/:id', component: CategoriesEdit, props: true},
        {path: '/categories/list', component: CategoriesList},

        {path: '/items/create', component: ItemsEdit},
        {path: '/items/edit/:id', component: ItemsEdit, props: true},
        {path: '/items/list', component: ItemsList},

        {path: '/hero/create', component: HeroEdit},
        {path: '/heros/edit/:id', component: HeroEdit, props: true},
        {path: '/heros/list', component: HerosList},

        {path: '/articles/create', component: ArticleEdit},
        {path: '/articles/edit/:id', component: ArticleEdit, props: true},
        {path: '/articles/list', component: ArticleList},

        {path: '/ads/create', component: AdEdit},
        {path: '/ads/edit/:id', component: AdEdit, props: true},
        {path: '/ads/list', component: AdList},


        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },
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
