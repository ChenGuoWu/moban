import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/index.js'
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: () =>
  //     import("@/views/Home.vue"),
  //   meta: {
  //     tittle: '首页'
  //   }
  // },
  // {
  //   path: "/phone",
  //   name: "Phone",
  //   component: () =>
  //     import("@/views/Phone.vue"),
  //   meta: {
  //     tittle: '通讯录'
  //   }
  // },
  // {
  //   path: "/search",
  //   name: "Search",
  //   component: () =>
  //     import("@/views/Search.vue"),
  //   meta: {
  //     tittle: '通讯录'
  //   }
  // },
  {
    path: "/addressbook",
    name: "Addressbook",
    component: () =>
      import("@/views/Addressbook.vue"),
    meta: {
      tittle: '通讯录'
    }
  },

  // {
  //   path: "/details",
  //   name: "Details",
  //   component: () =>
  //     import("@/views/Details.vue"),
  //   meta: {
  //     tittle: '详情'
  //   }
  // },
  // {
  //   path: "/",
  //   redirect: 'Home',
  // },
  {
    path: "*",
    component: () =>
      import("@/views/Not.vue"),
    meta: {
      tittle: '404'
    }
  }
];
const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.tittle) {
    document.title = to.meta.tittle;
  } else {
    document.title = '通讯录'
  }
  // next()
  console.log(store.state.userToken)
  console.log(to.name)

  if (window.localStorage.getItem('userToken')) {
    // 如果用户在登录页面
    next();
  } else {
    if (to.name === 'Home') {
      next();
    } else {
      next({ path: '/' })
    }
  }
})


//解决from  home  to  ligin的 报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



export default router;
