import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import local from './unit/Local'
import session from './unit/Session'
import './css/style.less'
import {
    Layout,
    Input,
    InputNumber,
    Button,
    Card,
    Row,
    Col,
    Modal,
    Icon,
    Spin,
    Slider,
    message,
    Empty,
    BackTop,
    Result,
    PageHeader,
    Upload,
    Switch
} from 'ant-design-vue'

Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Slider)
Vue.use(Button)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(Empty)
Vue.use(Result)
Vue.use(BackTop)
Vue.use(PageHeader)
Vue.use(Upload)
Vue.use(Switch)


Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

Vue.prototype.$local = local
Vue.prototype.$session = session

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
