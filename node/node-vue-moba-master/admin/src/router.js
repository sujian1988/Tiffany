import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

import UserEdit from './views/UserEdit.vue'
import UserList from './views/UserList.vue'

import VideoEdit from './views/VideoEdit.vue'
import VideoList from './views/VideoList.vue'

import CommentEdit from './views/CommentEdit.vue'
import CommentList from './views/CommentList.vue'

import CommentReplyEdit from './views/CommentReplyEdit.vue'
import CommentReplyList from './views/CommentReplyList.vue'

import LiveEdit from './views/LiveEdit.vue'
import LiveList from './views/LiveList.vue'

import VersionEdit from './views/VersionEdit.vue'
import VersionList from './views/VersionList.vue'

import XCircleEdit from './views/XCircleEdit.vue'
import XCircleList from './views/XCircleList.vue'

import QrImage from './views/QrImage.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },

        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },
        { path: '/heroes/list', component: HeroList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props: true },
        { path: '/ads/list', component: AdList },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },

        { path: '/users/create', component: UserEdit },
        { path: '/users/edit/:id', component: UserEdit, props: true },
        { path: '/users/list', component: UserList },

        { path: '/videos/create', component: VideoEdit },
        { path: '/videos/edit/:id', component: VideoEdit, props: true },
        { path: '/videos/list', component: VideoList },

        { path: '/comments/create', component: CommentEdit },
        { path: '/comments/edit/:id', component: CommentEdit, props: true },
        { path: '/comments/list', component: CommentList },

        { path: '/commentreplyitems/create', component: CommentReplyEdit },
        { path: '/commentreplyitems/edit/:id', component: CommentReplyEdit, props: true },
        { path: '/commentreplyitems/list', component: CommentReplyList },

        { path: '/lives/create', component: LiveEdit },
        { path: '/lives/edit/:id', component: LiveEdit, props: true },
        { path: '/lives/list', component: LiveList },

        { path: '/versions/create', component: VersionEdit },
        { path: '/versions/edit/:id', component: VersionEdit, props: true },
        { path: '/versions/list', component: VersionList},

        { path: '/xcircles/create', component: XCircleEdit },
        { path: '/xcircles/edit/:id', component: XCircleEdit, props: true },
        { path: '/xcircles/list', component: XCircleList},

        { path: '/qrimage', component: QrImage},

      ]
    },

  ]
})

//每次切换路由是切换界面是，都要判断是否有token是否是需要登录的界面，否则就进入的登录页
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router