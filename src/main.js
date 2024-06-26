import Vue from 'vue'
import Vuelidate from "vuelidate"
import './style.scss'
import App from './App.vue'
Vue.use(Vuelidate)
new Vue({
    render: (h) => h(App),
}).$mount('#app');
