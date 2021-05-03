import { createRouter, createWebHistory } from "vue-router";
import AuthView from "../views/AuthView.vue";

const routes = [
  {
    path: "/",
    name: "auth",
    component: AuthView
  },
  {
    path: "/board",
    name: "board",
    component: () =>
      import(/* webpackChunkName: "board" */ "../views/BoardView.vue"),
    children: [
      {
        path: "card/:id",
        name: "card",
        component: () =>
          import(/* webpackChunkName: "card" */ "../views/CardView.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () =>
      import(/* webpackChunkName: "notofund" */ "../views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
