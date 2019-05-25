<template>
  <div class="hello">
    <div class="tp">
      <img :src="imgurl" alt>
    </div>
  </div>
</template>


<script>
import lw from "../assets/1.png";
import lw1 from "../assets/2.png";
import lw2 from "../assets/3.png";
import lw3 from "../assets/4.png";
export default {
  name: "Customized",
  data() {
    return {
      lw,
      lw1,
      lw2,
      lw3,
      imgurl: lw,
      num: 1
    };
  },
  methods: {
  },
  mounted() {
      var timer = setInterval(() => {
        this.num += 1;
        console.log(this.lw);
        if (this.num == 1) {
          this.imgurl = this.lw;
        } else if (this.num == 2) {
          this.imgurl = this.lw1;
        } else if (this.num == 3) {
          this.imgurl = this.lw2;
        } else if (this.num == 4) {
          this.imgurl = this.lw3;
        } else if (this.num == 5) {
          clearInterval(timer);
          this.$router.push({
            name: "Customized",
            query: {
              path: this.$route.query.path
            }
          });
        }
      }, 800);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url(../assets/bb.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: hidden;
}
.tp {
  width: 38%;
  margin: 0 auto;
  position: relative;
  top: 62vh;
}
.tp > img {
  width: 100%;
  height: 100%;
}
</style>
