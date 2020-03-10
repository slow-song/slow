import Vue from 'vue'
import App from './App.vue'
import VueBus from 'vue-bus'
import  VueResource  from 'vue-resource'
import Vuex from 'vuex'
import store from './vuex/store'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer)

Vue.use(Vuex)
Vue.use(VueBus);
Vue.use(VueResource)

new Vue({
	el:'#app',
	components:{App},
	template:'<App/>'
})
