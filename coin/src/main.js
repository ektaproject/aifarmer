import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';

import router from '@/router'
import 'vant/lib/index.css';
import SERVICE from '@/util/service'
import { post, get } from "@/util/server";
import VueClipboard  from 'vue-clipboard2'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/font/font.scss'; // 引入字体样式

Vue.use(VueClipboard)
Vue.use(ElementUI);
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.SERVICE = SERVICE
Vue.prototype.$post = post;
Vue.prototype.$get = get;

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
  messages: {
    'jpn': require('@/assets/lang/jp'),   // 中文语言包
    'en': require('@/assets/lang/en') ,   // 英文语言包
    'cn': require('@/assets/lang/cn')    // 英文语言包
  }
})


new Vue({
  i18n,
  router,
  render: h => h(App),
}).$mount('#app')
