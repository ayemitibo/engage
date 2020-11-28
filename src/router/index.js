import Vue from "vue";
import VueRouter from "vue-router";
import Editor from "../views/editor.vue";
import viewAllContent from "../views/view-text-content.vue";
import viewSingle from "../views/single-view.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Editor,
  },
  {
    path: "/all-contents",
    name: "",
    component: viewAllContent,
  },
  {
    path: "/view/:id",
    name: "",
    component: viewSingle,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
