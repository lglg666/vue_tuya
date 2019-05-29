<template lang="">
    <div class="hello">
    <div class="fxtopimg" ref="fxtopimg" >
      <img :src="topimg" alt @touchstart="showDeleteButton" @touchend="emptyTime" >
      <div class="con" >
         <div class="con1" >
        <p >你的画风：<span style="color:red;font-weight:600;font-size: 1.2rem;">{{pingyuname}}</span></p>
          <p>{{pingyu}}</p>
    </div>
     <div class="con2" >
          <div class="con2-img">
            <p style="width: 57%;font-size: 0.6rem;float:left;text-align: left;">长按识别二维码测试你家宝宝的绘画天赋!</p>
       <img :src="code" alt>
       </div>
    </div>
    </div>
   
    </div>
     <div style="  font-size: 1.3rem;color: black; font-weight: 600;width:100%; margin-top:1rem"> 长按图片保存到相册</div>
        <div class="botton">
         <div class="fxbtn1" @click="bc">
           <img :src="btn1" alt>
        </div>
        <div class="fxbtn2" @click="fenxiang">
           <img :src="btn2" alt>
        </div>
        </div>
    <!-- 提示分享 -->
    <div class="tip" v-if="fx" @click="fenxiang">
        <img :src="shouzhi" alt>
        <div class="tishi">点击“ ...”分享到朋友圈</div>
    </div>
     <!-- 提示保存 -->
    <div class="tip1 " v-if="baocun" >
        <img :src="jiequ" alt>
    </div>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<script>
import topimg from "../assets/tuya.png";
import code from "../assets/code.png";
import btn1 from "../assets/fxbc.png";
import btn2 from "../assets/fxfx.png";
import shouzhi from "../assets/shouzhi.png";
import { setTimeout } from "timers";
import html2canvas from "html2canvas";
import wx from "weixin-js-sdk";
export default {
  name: "share",
  data() {
    return {
      topimg,
      code,
      btn1,
      btn2,
      shouzhi,
      fx: false,
      baocun: true,
      num: 0,
      Loop: null,
      pingyu: "宝宝在艺术领域很有天赋 头脑灵活!",
      pingyuname: "毕加索",
      jiequ: "",
      dfu: true
    };
  },
  methods: {
    fenxiang: function() {
      this.fx = !this.fx;
    },
    bc: function() {
      this.$router.push({
        name: "ce",
        query: {
          path: this.$route.query.path
        }
      });
    },
    intercept: function() {
      const self = this;
      html2canvas(self.$refs.fxtopimg, {
        useCORS: true,
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        self.jiequ = dataURL;
        // console.log(dataURL);
        self.dfu = false;
      });
    },

    showDeleteButton: function(e) {
      clearTimeout(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(
        function() {
          this.baocun = true;
        }.bind(this),
        1000
      );
    },
    emptyTime: function() {
      clearTimeout(this.Loop); //清空定时器，防止重复注册定时器
    }
  },

  mounted() {
    const self = this;
    this.axios
      .get(
        "http://jtarget.cn/graffiti/public/index.php?s=/index/Api/getShareSignaTure"
      )
      .then(function(response) {
        console.log(eval("(" + response.data + ")").data.appId);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: eval("(" + response.data + ")").data.appId, // 必填，公众号的唯一标识
          timestamp: eval("(" + response.data + ")").data.timestamp, // 必填，生成签名的时间戳
          nonceStr: eval("(" + response.data + ")").data.nonceStr, // 必填，生成签名的随机串
          signature: eval("(" + response.data + ")").data.signature, // 必填，签名
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
        });
        wx.error(function(res) {
          console.log(res);
          // logUtil.printLog('验证失败返回的信息:',res);
        });
        wx.ready(function() {
          console.log("1");
          //              alert(window.location.href.split('#')[0]);
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: "吴三岁请你来涂鸦 >18岁慎入", // 分享标题
            link: "http://jtarget.cn/graffiti/public/index.php", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "https://i.loli.net/2019/05/24/5ce76088c2c2280629.png", // 分享图标
            success: function(res) {
              alert("分享成功");
              console.log(self);
              self.bc();
            },
            cancel: function(res) {
              alert("分享失败");
              // 用户取消分享后执行的回调函数
              // logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: "吴三岁请你来涂鸦 >18岁慎入", // 分享标题
            desc:
              "1。你的画风：毕加索宝宝有自己的抽象世界！2.你的画风：梵高宝宝感情色彩很浓郁哦！3。你的画风：马蒂斯“野兽派”代表，随意而鲜明！4你的画风：莫奈宝宝是位柔情的印象派", // 分享描述
            link: "http://jtarget.cn/graffiti/public/index.php", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "https://i.loli.net/2019/05/24/5ce76088c2c2280629.png", // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function(res) {
              // 用户确认分享后执行的回调函数
              alert("分享成功");
              self.bc();
            },
            cancel: function(res) {
              // 用户取消分享后执行的回调函数
              alert("分享失败");
            }
          });
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    self.topimg = "http://jtarget.cn/graffiti/public" + this.$route.query.path;
    if (window.localStorage.getItem("pingyu")) {
      self.pingyu = window.localStorage.getItem("pingyu");
      self.pingyuname = window.localStorage.getItem("pingyuname");
    }
    self.intercept();
  }
};
</script>
<style lang="" scope>
.hello {
  background: url(../assets/fxbg.png) no-repeat;
  height: 100vh;
  width: 100%;
  background-size: 100% 100%;
  position: fixed;
}
.fxtopimg {
  background: url(../assets/sharebg.png) no-repeat;
  background-size: 100% 100%;
  height: 70vh;
  width: 93%;
  margin: 0rem auto;
}
.fxtopimg > img {
  width: 73%;
  height: 76%;
  padding-top: 4rem;
  margin: 0 auto;
}
.con {
  height: 16%;
  width: 80%;
  margin: 0 auto;
  margin-top: 0.5rem;
}
.con1 {
  width: 51%;
  height: 100%;
  font-weight: 700;
  float: left;
  text-align: left;
}
.con1 p {
  margin: 0;
  font-size: 0.7rem;
}
.con2 {
  width: 48%;
  height: 100%;
  float: left;
}
.con2-img {
  height: 100%;
}
.con2-img > img {
  width: 34%;
  height: 45%;
  margin-top: 0.5rem;
}
.botton {
  width: 100%;
  margin-top: 2rem;
}
.fxbtn1,
.fxbtn2 {
  width: 45vw;
  float: left;
  padding-left: 1rem;
}
.botton img {
  width: 43%;
  height: 4rem;
  pointer-events: none;
}
.tip {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: #666;
  opacity: 0.8;
  z-index: 99;
  overflow: hidden;
}
.tip > img {
  position: absolute;
  width: 15vw;
  right: 9vw;
  top: 0;
}
.tip1 {
  position: absolute;
  right: 0;
  width: 100%;
  top: 0;
  height: 67vh;
}
.tip1 > img {
  width: 93vw;

  height: 70vh;
}
.tishi1 {
  background: url(../assets/kuang1.png) no-repeat;
  height: 4rem;
  background-size: 100%;
  text-align: center;
  line-height: 5rem;
  position: absolute;
  width: 80%;
  top: 34vh;
  left: 8vw;
  font-size: 1.5rem;
  color: black;
  border-radius: 0.5rem;
}
.tishi {
  background: url(../assets/kuang.png) no-repeat;
  height: 4rem;
  background-size: 100%;
  text-align: center;
  line-height: 5rem;
  position: absolute;
  width: 80%;
  top: 13vh;
  left: 8vw;
  font-size: 1.5rem;
  color: black;
  border-radius: 0.5rem;
}
</style>