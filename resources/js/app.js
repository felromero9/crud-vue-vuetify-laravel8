

require('./bootstrap');

window.Vue = require('vue').default;
import Vuetify from '../plugins/vuetify';


//Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('article-product', require('./components/Article.vue').default);
Vue.component('article-product', require('./components/Crud-vuetify.vue').default);
//Vue.component('article-product', require('./components/Index.vue').default);




const app = new Vue({
    vuetify: Vuetify,
    el: '#app'
});
