<<template>
    <div class="body">
            <div class="beibao">
             <img :src="img" alt>
            </div>
             <div class="conten">
             <p>您的环保袋样式已确认定制~</p>
             <p>兑换码：<span style="color:orange">{{dhcode}}</span></p>
            </div>
             <div class="dzbtn" @click="jx">继续游戏</div>
    </div>
</template>>
<script>
import DoodlingVue from './Doodling.vue';

export default {
  name: "index",
  data() {
    return {
      img: "",
      dhcode:''
    };
  },
  methods:{
      jx:function(){
          this.$router.push({
        name: "index"
      });
      }
  },
  mounted() {
    this.img = this.$route.query.imageurl;
      this.dhcode =this.$route.query.dzid;
  }
};
</script>
<style lang="">
.body {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url(../assets/tybg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: hidden;
}
.beibao {
  background-image: url(../assets/beibao.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 48%;
  height: 30vh;
  margin: 9rem auto 0;
}
.beibao > img {
  margin-top: 5.5rem;
  width: 71%;
  height: 51%;
}
.conten p{
      font-size: 1.5rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(85,85,85,1);
}
.dzbtn {
  background: url(../assets/dz.png) no-repeat;
  width: 45%;
  background-size: 100% auto;
  height: 5rem;
  margin: 0 auto;
  color: white;
  font-size: 1.6rem;
  line-height: 3.5rem;
}
</style>