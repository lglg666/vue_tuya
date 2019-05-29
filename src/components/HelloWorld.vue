<template>
  <div class="hello">
    <div class="hetopimg">
      <!-- <img :src="topimg" alt> -->
    </div>
    <div class="topcon">
      <img :src="zhong" alt>
    </div>
    <div class="hobottom">
       <mu-flex class="demo-linear-progress">
    <mu-linear-progress mode="determinate" :value="num"  :size="15" color="#ff9800" style="border-radius: 1rem;border: 1px solid;height:3.5vh"></mu-linear-progress>
  </mu-flex>
      <span>加载中...</span>
      <p>晨风（江苏）服装有限公司版权所有</p>
    </div>
  </div>
</template>


<script>
import topimg from "../assets/top.png";
import conimg from "../assets/muban.png";
import zhong from "../assets/zhong.png";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      topimg,
      conimg,
      zhong,
      num: 0
    };
  },
  mounted() {
     console.log(this.$route.query.uid)
     if(this.$route.query.uid == undefined){
       console.log('uid空')
       window.location.href='http://jtarget.cn/graffiti/public/index.php'
     }else{
       console.log('ok')
       window.localStorage.setItem('uid',this.$route.query.uid)
     }
    var timer = setInterval(() => {
      this.num += 5;
      if (this.num == 100) {
        clearInterval(timer);
        this.$router.push({
          name:'index'
        });
      }
    }, 60);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
   width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-image: url(../assets/bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    overflow-x: hidden;
}
.hetopimg  {
     width: 50%;
    height: 20%;
   background-image: url(../assets/top.png);
   background-size: 100% 100%;
    background-repeat: no-repeat;
   margin: 0 auto
}
.topcon {
  background: url(../assets/muban.png) no-repeat;;
  background-size: 100%;
  width: 100%;
  height: 54vh;
}
.topcon img {
  width: 80%;
  margin-top: 1rem;
}
.hobottom {
  width: 80%;
  margin: 0 auto;
}
.hobottom span {
  font-size: 1.5rem;
  font-family: HappyZcool-2016;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 39px;
}
.hobottom p {
  font-size: 0.8rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #555555;
  line-height: 30px;
}
h1,
h2 {
  font-weight: normal;
}
.demo-linear-progress {
  /* margin: 16px 0; */
}
</style>
