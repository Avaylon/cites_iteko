import Vue from 'vue'
import Vuex from "vuex";
import Store from './store/index.js'
import List from './components/List.js'
import Order from './components/Order.js'

Vue.use(Vuex);

Vue.component('List', List);
Vue.component('Order', Order);

new Vue({
    el: '#app',
    store: new Vuex.Store(Store),
});


