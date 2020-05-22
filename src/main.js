import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Axios from 'axios';
import {
    Container,
    Header,
    Aside,
    Main,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Form,
    FormItem,
    Input,
    Button,
    Message,
    Dialog,
    Upload,
} from 'element-ui';

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Upload);

Vue.config.productionTip = false;

// Vue.prototype.$http = Axios;
Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
