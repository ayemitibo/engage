import Vue from "vue";
import VueRouter from "vue-router";
import Editor from "../views/editor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Editor,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
