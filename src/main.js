import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { store } from './store/store';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
