<template>
	<div id="app">
		<transition name="made">
    <!-- 左边 -->
	    <div id="left" v-if="show">
	    	<player ></player>
	      <input type="text" placeholder="请输入你要搜索的歌名/歌手" v-model="inputValue" @keyup.enter="search">
	        <!-- 给li添加过渡 ;v-on:after-enter="afterEnter":钩子函数-->
	        <transition-group name="list" tag="ul" v-on:after-enter="afterEnter">
	        <!-- play(item.id):把id传过去 -->
	        <li v-for="(item, index) in musicList" :key="item.id" @dblclick="playMusic(item.id,item.album.id)" :style="{'transition-delay':index*100+'ms'}"  title="双击播放">
	          {{item.name}}-----演唱者:{{item.artists[0].name}}
	        </li>
	        </transition-group>
	    </div>
	    </transition>
	    <!-- 右边,播放 -->
	    <transition name="fade">
	    <div id="right" v-if="showPage">
    	<button @click="hidden" style="background-color: #555555;width:40px;height:40px;border:0;position: fixed;top:0px;">{{showMsg}}</button>
      <!-- 专辑页面 -->
      <img :src="picUrl" alt="" class="cover autoRotate" :class="{pause:isPause}">
      <!-- autoplay:自动播放,controls显示控件 ;@play="play"是自定义方法-->
      <audio :src="songUrl" autoplay controls loop @play="play" @pause="pause" ></audio>
      <h3>精彩评论</h3>
      <div class="comment">
          <ul>
            <!-- 遍历数组时,需要动画时才用到key -->
              <li v-for="(item, index) in comments" :key="index" >
                <div class="left">
                  <img :src="item.user.avatarUrl" alt="">
                </div>
                <div class="right">
                  <a href="#" rel="external nofollow" >{{item.user.nickname}}</a>
                  <p>{{item.content}}</p>
                </div>
              </li>
          </ul>
      </div>
    </div>
   </transition>
  </div>
</template>

<script>
	import player from './components/player.vue'
	export default{
		components:{
			player
		},
    data(){
    	return{
      inputValue: '',//输入的值
      musicList: [], //存储歌列表
      songUrl: '',//播放歌曲的url
      picUrl:'',//获取专辑信息
      isPause:false,//专辑是否暂停
      comments:[],//评论内容
      show:true,
      showMsg:'<<',
      showPage:false
     }
    },
    methods: {
      // li标签过渡的事件
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      hidden: function() {
      
//    console.log(this.show)
				if(this.show===false){
					this.showMsg='<<'}
				else{
					this.showMsg='>>'
				}
			this.show = !this.show
      },
      //搜索歌曲事件
      search() {
        //调用接口
        this.$http.get(`https://autumnfish.cn/search?keywords=${this.inputValue}`).then(response => {
          // console.log(response);
          //将结果添加到musicList中
          this.musicList = response.body.result.songs;
        }, response => {
          // error callback
          alert("出错了")
        });
      },
      // 双击播放歌曲事件,接收传过来的id
      playMusic(id,albumId) {
      	this.showPage=true
      	const surl=`https://autumnfish.cn/song/url?id=${id}`
        //获取歌曲的url
        this.$http.get(surl).then(response => {
          // console.log(response);
          //将结果添加到musicList中
          this.songUrl = response.body.data[0].url;
        }, response => {
          // error callback
          alert("出错了")
        });
        // 获取专辑信息
        const zurl=`https://autumnfish.cn/album?id=${albumId}`
        this.$http.get(zurl).then(res=>{
          this.picUrl=res.body.album.blurPicUrl;
        }),err=>{}
        //获取评论内容接口
        const curl=`https://autumnfish.cn/comment/music?id=${id}&limit=1`
        this.$http.get(curl).then(res=>{
//        console.log(res);
          this.comments=res.body.hotComments;
//        console.log(this.comments)
        }),err=>{
          alert('信息错误')
        }
      },
      //钩子函数:动画执行完后去除了style属性,不去掉会卡顿
      afterEnter(el){
        el.style='';
      },
      // 专辑图片旋转事件
      play(){
        console.log('播放');
        this.isPause=false;
      },
      pause(){
        console.log('暂停');
        this.isPause=true;
      }
    }
  }
</script>

<style>
	::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
	 html, body {
	 
      height: 100%;
      padding: 0;
      margin: 0;
    }
    #app {
      height: 100%;
      display: flex;
    }
    #app>#left {
      flex: 1;
      background-color: skyblue;
      text-align: center;
      /* 超出滚动 */
      overflow: scroll;
    }
    #app>#right {
      flex: 1;
      background-color: orange;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    input {
      width: 469px;
      height: 56px;
      margin: 10px auto;
      border-radius: 10px;
      outline: none;
      font-size: 24px;
      border: 0;
      padding-left: 15px;
    }
    #left li {
      width: 451px;
      /* height: 35px; */
      margin: 0 auto;
      font-weight: 700;
      border: 2px solid black;
      line-height: 35px;
      color: white;
      background-color: cadetblue;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      max-height: 35px;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    #left li:hover {
      cursor: pointer;
      background-color: greenyellow;
      color: red;
    }
    #right {
      position: relative;
      overflow: scroll;
    }
    audio {
      /* position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(46px); */
      display: block;
      margin: 0 auto;
    }
    /* li标签过渡的样式 */
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
      transition: all 1s;
    }
    .list-enter,
    .list-leave-to{
      opacity: 0;
      transform: translateX(100px);
    }
    /* 设置专辑图片样式 */
    .cover{
      width: 260px;
      height: 260px;
      border-radius: 50%;
      display: block;
      margin: 10px auto;
      /* transform: translateX(-50%) translateY(10px); */
    }
    /* 动画 */
    @keyframes autoRotate{
      to{
        transform: rotateZ(360deg);
      }
    }
    /* 动画播放样式 */
    .autoRotate{
      /* 动画名,一直播放iteration(一直重复),匀速(timing)，时间2s(duration),状态(running) */
      animation-name:autoRotate;
      animation-iteration-count:infinite;
      animation-timing-function: linear;
      animation-duration:5s;
      animation-play-state:running;
    }
    /* 动画状态 */
    .pause{
      animation-play-state:paused;
    }
    /* 评论 */
    .comment{
      height: 150px;
      /* background-color: skyblue; */
    }
    .comment li{
      display: flex;
      padding: 5px;
    }
    .comment li .left{
      width: 120px;
      height: 120px;
    }
    .comment li .left img{
      width: 100px;
    }
    .comment li a{
      text-decoration: none;
      font-weight: bold;
      color: crimson;
    }
   .fade-enter{
		opacity: 0;
        transform: translateX(80px);
	}
   .fade-enter-active{
		transition: all 1s ease-in-out;
	}
	.made-enter-active, .made-leave-active {
    transition: opacity 2s
	}
	.made-enter, .made-leave-to  {
    opacity: 0
	}
</style>