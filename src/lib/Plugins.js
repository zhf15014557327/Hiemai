// 导入vue
import Vue from 'vue'
// 导入饿了吗ui插件
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
// 饿了吗插件按需引入
import {
    Button,
    Notification,
    Carousel,
    Switch,
    Input,
    InputNumber,
    Pagination,
    CarouselItem,
    Form,
    FormItem,
    Radio,
    Message,
    MessageBox,} from 'element-ui';
// 注册
Vue.use(Button);
Vue.use(Input);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Switch);
Vue.use(InputNumber);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;

// 导入iview插件
import 'iview/dist/styles/iview.css';
// 按需引入
import { BackTop, Affix } from 'iview';
// 注册
Vue.component('BackTop', BackTop);
Vue.component('Affix', Affix);


// 导入放大镜組建
import ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)