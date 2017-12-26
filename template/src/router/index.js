import Vue from 'vue'
import Router from 'vue-router'
import { basePath } from '~constants/index'
import { HOME, ERROR, NOT_FOUND } from '~constants/pages'
import autodebitRoutes from '~biz-apps/autodebit/router/index'
import home from '~views/home'
import { gettext } from '~utils/gettext'
import jsbridge from '~utils/jsbridge'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: basePath,
  routes: [
    {
      meta: {
        titleKey: 'index.title',
      },
      name: HOME,
      path: '/',
      component: home,
    },
    {
      name: ERROR,
      path: '/error',
      component: r => require.ensure([], () => r(require('~views/error')), 'error'),
    },
    {
      name: NOT_FOUND,
      path: '*',
      component: r => require.ensure([], () => r(require('~views/404')), '404'),
    },
  ]
    .concat(autodebitRoutes),
})

router.afterEach(route => {
  let meta = route.meta || {}
  let title = gettext(meta.titleKey || 'index.title')
  jsbridge.setTitle(title)
})

if (process.env.NODE_ENV === 'development') {
  window.$$router = router
}

export default router
