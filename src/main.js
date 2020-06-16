import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VTooltip from 'v-tooltip';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueClipboard from 'vue-clipboard2';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import App from './App.vue';
import Main from './components/Main';
import Redirect from './components/Redirect';
import History from './components/History';
import CopyCard from './components/CopyCard';
import UrlEntry from './components/UrlEntry';

import { store } from './store/store';

Vue.use(VTooltip);
Vue.use(VueRouter);
Vue.use(Vuex, store);
Vue.use(VueMaterial);
Vue.use(VueClipboard);
Vue.use(VueAxios, axios);

// material components
Vue.component('CopyCard', CopyCard);
Vue.component('UrlEntry', UrlEntry);
Vue.component('HistoryTable', History);

Vue.config.productionTip = false;
Vue.config.devtools = process.env.VUE_APP_DEVTOOLS;

const router = new VueRouter({
  mode: 'history', // gets rid of that pesky #
  routes: [
    { path: '/', component: Main },
    { path: '/:slug', component: Redirect }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
