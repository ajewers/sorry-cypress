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
  faCog,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import ConfirmModalMixin from '@/mixins/confirmModal.mixin';

import Vue from 'vue';
import store from '@/store/index';
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
  faCog,
  faVideoSlash,
);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.mixin(ConfirmModalMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
