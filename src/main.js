import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { apolloProvider } from "./apollo.config";
import { notifications } from "./mixins/notification";
import "izitoast/dist/css/iziToast.css";
import VueIziToast from "vue-izitoast";

Vue.config.productionTip = false;

Vue.use(VueIziToast);
Vue.mixin(notifications),
  new Vue({
    router,
    store,
    apolloProvider,
    render: (h) => h(App),
  }).$mount("#app");
