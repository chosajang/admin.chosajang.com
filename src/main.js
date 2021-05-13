import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { router } from './router/index.js'
import Meta from 'vue-meta'
import VueCompositionApi from '@vue/composition-api'
import vClickOutside from 'v-click-outside'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false

Vue.use(VueCompositionApi)
Vue.use(Meta)
Vue.use(vClickOutside)
Vue.use(VueSweetalert2)

Vue.prototype.$EventBus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
