import MiniAlert from "mini-alert";

export default {
  install(Vue) {
    Vue.prototype.$miniAlert = MiniAlert;
  }
};
