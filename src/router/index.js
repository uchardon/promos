import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/mybooks",
    name: "mybooks",
    component: () =>
      import(/* webpackChunkName: "mybooks" */ "../views/MyBooks.vue"),
  },
  {
    path: "/",
    name: "useYourLink",
    component: () =>
      // import(/* webpackChunkName: "useYourLink" */ "../views/UseYourLink.vue"),
      import(/* webpackChunkName: "login" */ "../views/UserLogin.vue"),
  },
  {
    path: "/login",
    name: "gologin",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/UserLogin.vue"),
  },
  {
    path: "/login/:secret?",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/UserLogin.vue"),
  },
  {
    path: "/support",
    name: "support",
    component: () =>
      import(/* webpackChunkName: "support" */ "../views/SupportView.vue"),
  },
  {
    path: "/showBook",
    name: "showBook",
    component: () =>
      import(
        /* webpackChunkName: "showBook" */ "../views/ShowBookMultiPages.vue"
      ),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
  },
];

const router = new createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
