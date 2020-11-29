import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VSwatches from "vue-swatches";
// import "vue-swatches/dist/vue-swatches.css";
import Verte from "verte";
import "verte/dist/verte.css";
Vue.component("Verte", Verte);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
