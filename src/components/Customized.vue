<template>
  <div class="hello">
    <div>
      <div class="tp">
        <img :src="imgurl" alt>
      </div>
      <div class="dd">
        <div class="btn1" @click="history">历史记录</div>
        <div class="btn" @click="open">确定定制</div>
      </div>
    </div>
  </div>
</template>


<script>
import btn from "../assets/dz.png";
export default {
  name: "Customized",
  data() {
    return {
      btn,
      imgurl: ""
    };
  },
  methods: {
    history: function() {
      this.$router.push({
        name: "history",
        query: {
           imageurl: "http://jtarget.cn/graffiti/public" +  this.$route.query.path,
        }
      });
    },
    open() {
      const self = this;
       this.axios
        .post("http://jtarget.cn/graffiti/public/index.php?s=/index/Api/Custom", {
         pid: window.localStorage.getItem("tpid"),
          uid: window.localStorage.getItem('uid')
      }).then(function (res) {
        console.log(eval("(" + res.data + ")").id)
         this.$router.push({
        name: "dingzhi",
        query:{
         imageurl: "http://jtarget.cn/graffiti/public" +  this.$route.query.path,
          dzid:eval("(" + res.data + ")").id
        }
      });
      }.bind(this)).catch(function (error) { 
        console.log(error);
      });
    }
  },
  mounted() {
    console.log();
    this.imgurl = "http://jtarget.cn/graffiti/public" + this.$route.query.path;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url(../assets/dzbg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: hidden;
}

.topimg {
  background: url(../assets/ls.png) no-repeat;
  width: 50%;
  background-size: 100%;
  margin: 0 auto;
  height: 15%;
  line-height: 5.5rem;
  font-size: 2rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.btn {
  background: url(../assets/dz.png) no-repeat;
  width: 45%;
  background-size: 100% auto;
  height: 5rem;
  color: white;
  font-size: 1.6rem;
  line-height: 3.5rem;
  float: left;
  margin: 0 0.5rem;
}
.btn1 {
  background: url(../assets/btn.png) no-repeat;
  width: 45%;
  background-size: 100% auto;
  height: 5rem;
  color: white;
  font-size: 1.6rem;
  line-height: 3.5rem;
  float: left;
  margin: 0 0.5rem;
}
.dd {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.tp {
  position: relative;
  top: 22vh;
}
.tp > img {
  width: 18vh;
  height: 30vw;
}
</style>
