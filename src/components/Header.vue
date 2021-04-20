<template>
  <div class="header-wrap">
    <div class="decoration">
      <div class="title">垃圾分类溯源数据中心</div>
      <div class="right-text">

        <!-- 天气插件链接：https://www.tianqiapi.com/index/plugin -->
        <iframe
          scrolling="no"
          src="https://tianqiapi.com/api.php?style=tz&skin=apple&color=fff&align=right"
          frameborder="0"
          width="100%"
          height="40"
          allowtransparency="true"
        ></iframe>
        <div class="date">{{ date }} {{ time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFilter, timeFilter } from '@utils/clock'
export default {
  name: "Header",
  data() {
    return {
      date: '',
      time: ''
    };
  },
  mounted() {
    this.clock()
  },
  methods: {
    clock() {
      // let now = new Date()
      // this.date = dateFilter(now)
      // this.time = timeFilter(now)
      let task = setInterval(() => {
        var now = new Date()
        this.date = dateFilter(now)
        this.time = timeFilter(now)
      }, 1000)
    }
  },
};
</script>

<style lang="scss" scoped>
.header-wrap {
  position: relative;
  width: 100%;
  height: 86px;
  flex-shrink: 0;
  background: url(../assets/images/header-bg.png) no-repeat;
  background-size: 100% 100%;
  .decoration {
    width: 100%;
    height: 100%;
    background: url(../assets/images/header-decoration.gif) no-repeat 0 -12px;
    background-size: 100% 100%;
  }
  .title {
    position: absolute;
    letter-spacing: 3px;
    font-family: fzlthFont;
    font-size: 40px;
    font-weight: 600;
    color: #eff7ff;
    left: 50%;
    transform: translateX(-50%);
  }
  .right-text {
    position: absolute;
    right: 35px;
    top: 10px;
    font-size: 16px;
    font-family: Aria;
    font-weight: 400;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .date {
      width: 300px;
      margin-right: 280px;
    }
    iframe {
      position: absolute;
      padding: 9px 10px 0 70px;
    }
  }
}
</style>
