import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faTimes,
  faSpinner,
  faUser,
  faClock,
  faCalendarAlt,
  faCodeBranch,
  faDatabase,
  faRedo,
  faEllipsisH,
  faEllipsisV,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import router from './router';
import { createProvider } from './vue-apollo';
import App from './App.vue';

library.add(
  faCheck,
  faTimes,
  faSpinner,
  faUser,
  faClock,
  faCalendarAlt,
  faCodeBranch,
  faDatabase,
  faRedo,
  faEllipsisH,
  faEllipsisV,
  faTrash,
);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
