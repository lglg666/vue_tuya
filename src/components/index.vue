<template>
  <div class="hello">
    <div class="indtopimg" >
      <!-- <img :src="topimg" alt> -->
      <div class="img">
      <div class="img-bor" v-for="item in imglist" @click="doing(item.link)">
        <img :src="item.link" alt>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import topimg from "../assets/xzmb.png";
export default {
  name: "index",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      topimg,
      num: 0,
      imglist:[],
    };
  },
  methods: {
    doing: function(img) {
      window.localStorage.setItem('image',img)
      this.$router.push({
        name: "Doodling"
      });
    }
  },
  mounted() {
     const self = this
    self.axios
      .get("http://jtarget.cn/graffiti/public/index.php?s=/index/Api/Picture")
      .then(function(response) {
        if(response){
          console.log('dddd')
        }
        console.log(eval("("+response.data+")"));
        // console.log(response.data)
        self.imglist = eval("("+response.data+")").data
      })
      // console.log(self.imglist)
  }
};
</script>
<style>
body {
  margin: 0;
  height: 100%;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-image: url(../assets/xzbg.png);
    background-size:  100%  100%;
    background-repeat: no-repeat;
    position: relative;
    overflow-x: hidden;
}

.indtopimg {
  background: url(../assets/xzmb.png) no-repeat;
  width: 100%;
  background-size: 100% 100%;
  height: 80%;
}
.img {
       height: 78%;
    width: 82%;
    margin: 0 auto;
    overflow-y: scroll;
    position: relative;
    top: 4rem;
}
.img .img-bor {
  width: 38%;
  background: white;
  height: 8rem;
  border-radius: 1rem;
  float: left;
  margin: 1rem;
}
.img .img-bor img {
  width: 80%;
  height: 80%;
  margin: 1rem auto;
}
</style>
