// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import storageHandler from '@/storageHandler'
import eventBus from '@/eventBus'
import Vuei18n from 'vue-i18n'
import language from "./language";

Vue.prototype.$storageHandler = storageHandler
Vue.prototype.$eventBus = eventBus
Vue.config.productionTip = false

Vue.use(Vuei18n)

export const i18n = new Vuei18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages: language
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
