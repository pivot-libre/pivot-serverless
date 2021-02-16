import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

fetch('/config.json')
  .then((response) => response.json())
  .then((config) => {
    Vue.prototype.$config = config
    new Vue({
      render: (h) => h(App)
    }).$mount("#app")
  })
  .catch(() => {
    alert("Could not load application configuration.");
  });