<template lang="">
    <div class="hello">
    <div class="fxtopimg">
      <img :src="topimg" alt>
      <div class="con">
         <div class="con1">
        宝宝在艺术领域很有天赋, 头脑灵活、思维逻辑清晰是宝宝最大的特点!
    </div>
     <div class="con2">
          <div class="con2-img">
       <img :src="code" alt>
       </div>
    </div>
    </div>
        <div class="botton">
         <div class="fxbtn1" @click="bc">
     <img :src="btn1" alt>
        </div>
        <div class="fxbtn2" @click="fenxiang">
           <img :src="btn2" alt>
        </div>
        </div>
    </div>
    <!-- 手指 -->
    <div class="tip" v-if="fx">
        <img :src="shouzhi" alt>
        <div class="tishi">点击“ ...”分享到朋友圈</div>
    </div>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import topimg from "../assets/tuya.png";
import code from "../assets/code.png";
import btn1 from "../assets/fxbc.png";
import btn2 from "../assets/fxfx.png";
import shouzhi from "../assets/shouzhi.png";
export default {
  name: "share",
  data() {
    return {
      topimg,
      code,
      btn1,
      btn2,
      shouzhi,
      fx: false
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
    }
  },

  mounted() {
    console.log( window.location.href)
    this.axios
      .get(
        "http://jtarget.cn/graffiti/public/index.php?s=/index/Api/getShareSignaTure"
      )
      .then(function(response) {
        console.log(eval("(" + response.data + ")").data.appId);
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: eval("(" + response.data + ")").data.appId, // 必填，公众号的唯一标识
          timestamp: eval("(" + response.data + ")").data.timestamp, // 必填，生成签名的时间戳
          nonceStr: eval("(" + response.data + ")").data.nonceStr, // 必填，生成签名的随机串
          signature: eval("(" + response.data + ")").data.signature, // 必填，签名
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareQZone"
          ] // 必填，需要使用的JS接口列表
        });
          wx.error(function (res) {
          // logUtil.printLog('验证失败返回的信息:',res);
        });
          wx.ready(function () {
        //              alert(window.location.href.split('#')[0]);
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: "柏明", // 分享标题
            link: " http://h5ip.cn/graffiti", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "https://i.loli.net/2019/05/24/5ce76088c2c2280629.png", // 分享图标
            success: function (res) {
            alert("分享成功")
              // 用户确认分享后执行的回调函数
              // logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
              // _this.showMsg("分享成功!")
            },
            cancel: function (res) {
               alert("分享失败")
              // 用户取消分享后执行的回调函数
              // logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title:"柏明", // 分享标题
            desc: "1。你的画风：毕加索宝宝有自己的抽象世界！2.你的画风：梵高宝宝感情色彩很浓郁哦！3。你的画风：马蒂斯“野兽派”代表，随意而鲜明！4你的画风：莫奈宝宝是位柔情的印象派", // 分享描述
            link: " http://h5ip.cn/graffiti", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: "https://i.loli.net/2019/05/24/5ce76088c2c2280629.png", // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
               alert("分享成功")
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
               alert("分享失败")
            }
          });
          //分享到QQ
          // wx.onMenuShareQQ({
          //   title: _this.newDetailObj.title, // 分享标题
          //   desc: _this.desc, // 分享描述
          //   link: window.location.href.split('#')[0], // 分享链接
          //   imgUrl: _this.newDetailObj.thu_image, // 分享图标
          //   success: function (res) {
          //     // 用户确认分享后执行的回调函数
          //     logUtil.printLog("分享到QQ好友成功返回的信息为:",res);
          //   },
          //   cancel: function (res) {
          //     // 用户取消分享后执行的回调函数
          //     logUtil.printLog("取消分享给QQ好友返回的信息为:",res);
          //   }
          // });

          //分享到QQ空间
          // wx.onMenuShareQZone({
          //   title: _this.newDetailObj.title, // 分享标题
          //   desc: _this.desc, // 分享描述
          //   link: window.location.href.split('#')[0], // 分享链接
          //   imgUrl: _this.newDetailObj.thu_image, // 分享图标
          //   success: function (res) {
          //     // 用户确认分享后执行的回调函数
          //     logUtil.printLog("分享到QQ空间成功返回的信息为:",res);
          //   },
          //   cancel: function (res) {
          //     // 用户取消分享后执行的回调函数
          //     logUtil.printLog("取消分享到QQ空间返回的信息为:",res);
          //   }
          // });
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    this.topimg = "http://jtarget.cn/graffiti/public" + this.$route.query.path;
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
  height: 24rem;
  width: 78%;
  background: white;
  margin: 4rem auto;
  border-radius: 10px;
  border: solid 1px #e4e4e4;
}
.fxtopimg > img {
  width: 100%;
  height: 75%;
}
.con {
  height: 24%;
}
.con1 {
  width: 56%;
  height: 100%;
  font-size: 14px;
  font-family: HappyZcool-2016;
  font-weight: 700;
  line-height: 20px;
  float: left;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
}
.con2 {
  width: 40%;
  height: 100%;
  float: left;
}
.con2-img {
  height: 100%;
}
.con2-img > img {
  width: 72%;
  height: 91%;
}
.botton {
  width: 100%;
  margin-top: 4rem;
}
.fxbtn1,
.fxbtn2 {
  width: 50%;
  float: left;
}
.botton img {
  width: 65%;
  height: 5rem;
}
.tip {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 16rem;
}
.tip > img {
  width: 4rem;
  right: 34px;
  position: absolute;
}
.tishi {
  background: url(/static/img/kuang.b0a41a1.png) no-repeat;
  height: 4rem;
  background-size: 100%;
  text-align: center;
  line-height: 5rem;
  position: absolute;
  width: 80%;
  top: 6rem;
}
</style>