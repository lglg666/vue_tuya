<template>
  <div class="hello">
    <div class="histopimg">历史记录</div>
    <div class="image">
      <div class="img-bor" v-for="(item ,index) in imglist">
        <div class="select-control-group">
          <mu-flex class="select-control-row" :key="'radio ' ">
            <mu-radio
              :value="item.link"
              v-model="select"
              :label="(index + 1)+'' "
              @click="djid(item.id)"
            ></mu-radio>
          </mu-flex>
        </div>
        <img :src="'http://jtarget.cn/graffiti/public' + item.link" alt>
      </div>
    </div>
    <div class="hisbtn" @click="doing">确定定制</div>
  </div>
</template>


<script>
import btn from "../assets/dz.png";
export default {
  name: "History",
  data() {
    return {
      btn,
      imglist: [],
      select: "",
      tpid: "",
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      }
    };
  },
  methods: {
    doing: function() {
      console.log(this.select);
      this.axios
        .post(
          "http://jtarget.cn/graffiti/public/index.php?s=/index/Api/Custom",
          {
            pid: this.tpid,
            uid: window.localStorage.getItem("uid")
          }
        )
        .then(
          function(res) {
            console.log(eval("(" + res.data + ")").id);
            this.$router.push({
              name: "dingzhi",
              query: {
                imageurl:
                  "http://jtarget.cn/graffiti/public" + this.$route.query.imageurl,
                dzid: eval("(" + res.data + ")").id
              }
            });
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    djid: function(id) {
      this.tpid = id;
    }
  },
  mounted() {
    const self = this;
    self.axios
      .post(
        "http://jtarget.cn/graffiti/public/index.php?s=/index/Api/Historical",
        { uid: window.localStorage.getItem("uid") }
      )
      .then(function(response) {
        self.imglist = eval("(" + response.data + ")").data;
        console.log(self.imglist);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: url(../assets/tybg.png) no-repeat;
  height: 100vh;
  width: 100%;
  background-size: 100% 100%;
  position: fixed;
}

.histopimg {
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
.image {
  height: 65%;
  width: 100%;
  overflow: auto;
}
.image .img-bor {
  width: 38%;
  background: white;
  height: 10rem;
  border-radius: 1rem;
  float: left;
  margin: 1rem;
}
.image .img-bor img {
  width: 80%;
  height: 80%;
  /* margin: 1rem auto; */
}
.hisbtn {
  background: url(../assets/dz.png) no-repeat;
  width: 40%;
  background-size: 100% 100%;
  height: 4rem;
  margin: 1rem auto;
  color: white;
  font-size: 1.6rem;
  line-height: 3.5rem;
}
.select-control-group {
  float: right;
  padding-right: 1rem;
}
</style>
