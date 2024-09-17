import Vue from "vue";
import "mini-alert/miniAlert.css";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AppButton from "./components/AppButton";
import miniAlert from "./plugins/miniAlert";

Vue.component("AppButton", AppButton);

Vue.config.productionTip = false;

Vue.use(miniAlert);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
