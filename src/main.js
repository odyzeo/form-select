import Vue from 'vue';
import App from './App.vue';
import FormSelect from './plugin/FormSelect';

Vue.use(FormSelect);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
