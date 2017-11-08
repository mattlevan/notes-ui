// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Notes from './components/Notes'
import router from './router'
import VueCodeMirror from 'vue-codemirror'

Vue.config.productionTip = false

Vue.use(VueCodeMirror)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App,
    Notes
  }
})
