import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue'
import FeatureList from './components/FeatureList.vue';
import ChatFilter from './components/ChatFilter.vue';

const routes = [
  { path: '/', component: FeatureList },
  { path: '/feature/chat-filter', component: ChatFilter },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
