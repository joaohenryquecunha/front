import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import DatePicker from 'vue2-datepicker';



const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

Vue.use(VueSweetalert2, options);


/* URL da Host */
// Vue.prototype.urlHOST = 'https://front-a0p6l1ydv-joaohenryquecunha.vercel.app/'

/* URL API */
axios.defaults.baseURL = 'api-larevel-tarefas-production.up.railway.app'

import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue2-datepicker/index.css';

Vue.use(BootstrapVue)
Vue.use(DatePicker)

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
