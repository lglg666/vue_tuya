<template lang="">
    <div class="hello">
    <div class="topimg" ref="topcanvas">
      <!-- <img :src="topimg" alt> -->
      <div class="dddd" @mousedown="canvasDown($event)" 
        @mouseup="canvasUp($event)"
        @mousemove="canvasMove($event)"
        @touchstart="canvasDown($event)" 
        @touchend="canvasUp($event)"
        @touchmove="canvasMove($event)" ><img :src="image" alt ref='img'></div>
   <canvas id="canvas" class="fl" ref="canvas" width="1000"height='1000'></canvas>
    </div>
    <div class="bottom">
        <div class="huaban">
            <div class="color" >
                <div class="color-list" ref='colorlist'  v-for="(item,index) in colorlist" :style="{backgroundColor:item.color,top:item.top}" :class="{'active1':ind1 === index}" @click="setColor(item.color,index)" style="position: relative">
                </div>
        </div>
        </div>
           <div class="button-wrapper"> 
             <div @click="_nextClick"><img :src="right" alt ></div>
          <div @click="_preClick"><img :src="left" alt   ></div>
          
          </div>
         <div class="muban">
            <div class="uill" v-for="(item,index) in utill" @click="setBrush(index)">
         <img :src="item.img" alt  :class="{'active':ind === index}">
         </div>
         </div>
     
    <div class="ok">
      <div class="btn2" @click="clear">
       <img :src="laji" alt>
       <span>重做</span>
    </div>
        <div class="btn" @click="getImage">
          完成了！
    </div>
     
    </div>
    </div>
  </div>
</template>
<script>
import topimg from "../assets/tuya.png";
import btn from "../assets/btn.png";
import bi from "../assets/ni.png";
import bi1 from "../assets/bi1.png";
import bi2 from "../assets/bi2.png";
import bi3 from "../assets/bi3.png";
import cha from "../assets/cha.png";
import laji from "../assets/laji.png";
import left from "../assets/left.png";
import right from "../assets/right.png";
export default {
  name: "Doodling",
  data() {
    return {
      topimg,
      btn,
      bi,
      bi1,
      bi2,
      bi3,
      laji,
      left,
      right,
      ind: "",
      ind1: "",
      colorlist: [
        {
          color: "#000000",
          top: "-1rem"
        },
        {
          color: "#52096c",
          top: "1rem"
        },
        {
          color: "#0469d1",
          top: "2rem"
        },
        {
          color: "#30c200",
          top: "1.5rem"
        },
        {
          color: "#8c8fa2",
          top: "0"
        },
        {
          color: "#0349b1",
          top: "-1.5rem"
        },
        {
          color: "#ff0103",
          top: "-1rem"
        },
        {
          color: "#fc4001",
          top: "1rem"
        },
        {
          color: "#ff7f00",
          top: "2rem"
        },
        {
          color: "#febe07",
          top: "1.5rem"
        },
        {
          color: "#feff03",
          top: "0"
        },
        {
          color: "#ffffff",
          top: "-1.5rem"
        }
      ],
      utill: [
        {
          name: "铅笔",
          img: bi
        },
        {
          name: "毛笔1",
          img: bi1
        },
        {
          name: "毛笔2",
          img: bi2
        },
        {
          name: "毛笔3",
          img: bi3
        },
        {
          name: "橡皮",
          img: cha
        }
      ],
      context: {},
      imgUrl: [],
      image: "",
      canvasMoveUse: true,
      // 存储当前表面状态数组-上一步
      preDrawAry: [],
      // 存储当前表面状态数组-下一步
      nextDrawAry: [],
      // 中间数组
      middleAry: [],
      // 配置参数
      config: {
        lineWidth: 1,
        lineColor: "#f2849e",
        shadowBlur: 2
      }
    };
  },

  methods: {
    isPc() {
      const userAgentInfo = navigator.userAgent;
      const Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    removeImg(src) {
      this.imgUrl = this.imgUrl.filter(item => item !== src);
    },
    initDraw() {
      const preData = this.context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      // 空绘图表面进栈
      this.middleAry.push(preData);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        console.log("canvasMove");
        const t = e.target;
        let canvasX;
        let canvasY;
        if (this.isPc()) {
          canvasX = e.clientX - t.parentNode.offsetLeft;
          canvasY = e.clientY - t.parentNode.offsetTop;
        } else {
          canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft;
          canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop;
        }
        this.context.lineTo(canvasX, canvasY);
        this.context.stroke();
      }
    },
    beginPath(e) {
      const canvas = document.querySelector("#canvas");
      if (e.target !== canvas) {
        console.log("beginPath");
        this.context.beginPath();
      }
    },
    // mouseup
    canvasUp(e) {
      console.log("canvasUp");
      const preData = this.context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (!this.nextDrawAry.length) {
        // 当前绘图表面进栈
        this.middleAry.push(preData);
      } else {
        this.middleAry = [];
        this.middleAry = this.middleAry.concat(this.preDrawAry);
        this.middleAry.push(preData);
        this.nextDrawAry = [];
      }
      this.canvasMoveUse = false;
    },
    // mousedown
    canvasDown(e) {
      console.log("canvasDown");
      this.canvasMoveUse = true;
      // client是基于整个页面的坐标
      // offset是cavas距离顶部以及左边的距离
      const canvasX = e.clientX - e.target.parentNode.offsetLeft;
      const canvasY = e.clientY - e.target.parentNode.offsetTop;
      this.setCanvasStyle();
      // 清除子路径
      this.context.beginPath();
      this.context.moveTo(canvasX, canvasY);
      console.log("moveTo", canvasX, canvasY);
      // 当前绘图表面状态
      const preData = this.context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      // 当前绘图表面进栈
      this.preDrawAry.push(preData);
    },
    // 设置颜色
    setColor(color, index) {
      this.config.lineColor = color;
      this.ind1 = index;
    },
    // 设置笔刷大小
    setBrush(type) {
      console.log(type);
      this.ind = type;
      if (type == 0) {
        this.config.lineWidth = 1;
        this.config.lineColor = "#303133";
      } else if (type == 1) {
        this.config.lineWidth = 20;
      } else if (type == 2) {
        this.config.lineWidth = 6;
      } else if (type == 3) {
        this.config.lineWidth = 3;
      } else {
        this.config.lineWidth = 30;
        this.config.lineColor = "#fff";
      }
    },
    //点击上一步
    _preClick: function() {
      if (this.preDrawAry.length > 0) {
        var popData = this.preDrawAry.pop();
        var midData = this.middleAry[this.preDrawAry.length + 1];
        this.nextDrawAry.push(midData);
        this.context.putImageData(popData, 0, 0);
      }
    },
    //点击下一步
    _nextClick: function() {
      if (this.nextDrawAry.length) {
        var popData = this.nextDrawAry.pop();
        var midData = this.middleAry[
          this.middleAry.length - this.nextDrawAry.length - 2
        ];
        this.preDrawAry.push(midData);
        this.context.putImageData(popData, 0, 0);
      }
    },
    // 生成图片
    getImage() {
      const self = this;
      const canvas = document.querySelector("#canvas");
      var img = new Image();
      console.log(canvas.width, canvas.height);
      img.crossOrigin = "";
      img.src = window.localStorage.getItem("image");
      console.log(window.localStorage.getItem("image"));
      // https://i.loli.net/2019/05/23/5ce65cf1b4bd882413.png
      // window.localStorage.getItem("image")
      img.onload = function() {
        // self.context.globalAlpha = 1;
        self.config.lineColor = "rgba(255, 255, 255, 0.5)";
        // self.context.shadowColor = self.config.lineColor;
        // self.context.strokeStyle = self.config.lineColor;
        self.context.drawImage(img, 0, 0, canvas.width, canvas.height);
        const src = canvas.toDataURL("image/png");
        console.log(src);
        // alert(src)
        self.axios
          .post(
            "http://jtarget.cn/graffiti/public/index.php?s=/index/Api/Upload",
            {
              uid: window.localStorage.getItem("uid"),
              file: src
            }
          )
          .then(function(response) {
            // console.table(response);
            // self.imgUrl =  'http://jtarget.cn/graffiti/public' + eval("("+response.data+")").url;
            // alert(self.imgUrl)
            window.localStorage.setItem(
              "tpid",
              eval("(" + response.data + ")").id
            );
            window.localStorage.setItem(
              "pingyu",
              eval("(" + response.data + ")").message
            );
            window.localStorage.setItem(
              "pingyuname",
              eval("(" + response.data + ")").name
            );
            self.$router.push({
              name: "share",
              query: {
                path: eval("(" + response.data + ")").url
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      };
    },
    //清除画布
    clear() {
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.preDrawAry = [];
      this.nextDrawAry = [];
      this.middleAry = [this.middleAry[0]];
    },
    // 设置绘画配置
    setCanvasStyle() {
      this.context.lineWidth = this.config.lineWidth;
      this.context.shadowBlur = this.config.shadowBlur;
      this.context.shadowColor = this.config.lineColor;
      this.context.strokeStyle = this.config.lineColor;
    },
    Touch() {
      document.body.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
        },
        { passive: false }
      ); // passive 参数不能省略，用来兼容ios和android
    }
  },

  mounted() {
    const self = this;
    self.image = window.localStorage.getItem("image");
    const canvas = document.querySelector("#canvas");
    self.context = canvas.getContext("2d");
    self.initDraw();
    self.setCanvasStyle();
    canvas.width = self.$refs.topcanvas.offsetWidth; //设定canvas的宽度
    canvas.height = self.$refs.topcanvas.offsetHeight; //设定canvas的高度
    console.log(self.context);
    self.Touch();
  }
};
</script>
<style lang="" scope>
.hello {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: url(../assets/tybg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  overflow-x: hidden;
}
.topimg {
  height: 45%;
  width: 78%;
  background: white;
  margin: 0 auto;
  /* border-radius: 10px; */
  /* border: solid 1px #e4e4e4; */
  /* margin-top: 1.5rem; */
}
.topimg > img {
  width: 100%;
  height: 100%;
}
.con {
  height: 24%;
}
.bottom {
  /* width: 100%;
  position: relative;
  top: -1.5rem; */
  width: 100%;
  position: absolute;
  top: 41vh;
  height: 55%;
  overflow: hidden;
}
.huaban {
  background: url(../assets/huaban.png) no-repeat;
  height: 27vh;
  background-size: 100% auto;
  width: 100%;
}
.muban {
  background: url(../assets/muban2.png) no-repeat;
  height: 6rem;
  background-size: 100% auto;
  width: 87%;
  margin: 0 auto;
  position: relative;
  top: -7vh;
}
.color {
  width: 100%;
  margin: 0 auto;
  height: 5rem;
  position: relative;
  top: 3rem;
}
.color-list {
  width: 10.3vw;
  height: 6vh;
  border-radius: 2.5rem;
  float: left;
  margin-left: 1.2rem;
  margin-bottom: 0.5rem;
  border: 1px solid #e0e0e0;
  z-index: 99;
  overflow: hidden;
}
.uill {
  height: 50%;
  width: 16%;
  background: white;
  border: outset;
  position: relative;
  top: 1rem;
  float: left;
  margin: 0 0.3rem;
}
.uill > img {
  width: 100%;
  pointer-events: none;
}
.ok {
  width: 100%;
  height: 4rem;
  position: relative;
  top: -7vh;
}
.btn {
  background: url(../assets/btn.png) no-repeat;
  background-size: 100% 100%;
  width: 41%;
  line-height: 3.5rem;
  font-size: 1.5rem;
  text-align: center;
  color: white;
  float: right;
  margin-left: 1rem;
  height: 100%;
}
.btn2 {
  width: 24%;
  line-height: 3rem;
  font-size: 1.5rem;
  color: #606266;
  float: right;
  background: white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 0.5rem;
  height: 3rem;
  margin-right: 2rem;
}
.btn2 img {
  width: 36%;
  height: 100%;
  /* padding-left: 1rem; */
}

.dddd {
  position: absolute;
  top: 0rem;
  height: 45%;
  width: 78%;
}
.dddd img {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.active {
  width: 130% !important;
}
.active1 {
  border: 1px solid red;
}
.button-wrapper {
  overflow: hidden;
  position: relative;
  top: -6vh;
}
.button-wrapper > div > img {
  pointer-events: none;
}
.button-wrapper :last-child {
  width: 17vw;
  float: left;
}
.button-wrapper :first-child {
  width: 17vw;
  float: right;
}
</style>