<template>
  <div class="index">
    <dv-loading class="loading" v-if="prepare">Loading...</dv-loading>
    <dv-full-screen-container v-else>
      <!-- 天气插件链接：https://www.tianqiapi.com/index/plugin -->
      <iframe
        scrolling="no"
        src="https://tianqiapi.com/api.php?style=tz&skin=apple&color=fff&align=right"
        frameborder="0"
        width="100%"
        height="40"
        allowtransparency="true"
        style="z-index: 9999; position: absolute; padding: 10px 40px 0 0;"
      ></iframe>
      <div class="map-wrap">
        <Map />
      </div>
      <div class="wrap">
        <Header />
        <div class="content">
          <div class="left-content">
            <RingChart />
            <LineChart />
            <BarChart />
            <BarChart :title="title" />
          </div>
          <div class="bottom-content">
            <PieChart />
          </div>
          <div class="right-content">
            <RingChart :className="className" />
            <CapsuleChart />
            <Mission />
            <ScrollBoard />
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getData } from '@api'
  import { getUrlParam } from '@utils'

  import Header from '@components/Header'
  import RingChart from '@components/RingChart'
  import LineChart from '@components/LineChart'
  // import LineChart from '@components/LineChart-bak'
  import BarChart from '@components/BarChart'
  import PieChart from '@components/PieChart'
  import CapsuleChart from '@components/CapsuleChart'
  import Mission from '@components/Mission'
  import ScrollBoard from '@components/ScrollBoard'
  import Map from '@components/Map'

  export default {
    name: 'Index',
    components: {
      Header,
      RingChart,
      LineChart,
      BarChart,
      PieChart,
      CapsuleChart,
      Mission,
      ScrollBoard,
      Map,
    },
    data() {
      return {
        prepare: true,
        className: 'sanhua',
        title: '督导计划完成率',
        // classifyData: {}
      }
    },
    mounted() {
      const { init } = this
      init()
    },
    methods: {
      ...mapActions(['getClassifyData']),
      init() {
        var { getQueryString, getClassifyData } = this

        getQueryString('token')

        getData().then((res) => {
          this.prepare = false
          // console.log('classifyData', res.data);
          // classifyData = res.data
          getClassifyData(res.data)
        })

        getData().then((res) => {
          this.prepare = false
          // console.log(res.data);
          // classifyData = res.data
          getClassifyData(res.data)
        })
      },
      getQueryString(name) {
        // 是否需要设置 token
        var t = getUrlParam(name)
        console.log('token', t)
        if (t !== '' && t !== null) {
          window.localStorage.setItem('Authorization', 'Bearer ' + t)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .index {
    width: 100%;
    height: 100%;
    color: #fff;
    .loading {
      background-color: #001111;
    }
    #dv-full-screen-container {
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
      // width: 100%;
      // height: 100%;
      // padding-bottom: 10px;
    }
    .map-wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #001111;
    }
    .wrap {
      width: 100%;
      height: 100%;
      // width: 1920px;
      // height: 1080px;
      display: flex;
      flex-direction: column;
      .content {
        // flex: 1;
        // width: 100%;
        height: calc(100% - 86px);
        margin-bottom: 10px;
        display: flex;
        justify-content: space-around;
        padding: 0 34px;
        .left-content,
        .right-content {
          position: relative;
          // flex: 1;
          width: 408px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .bottom-content {
          flex: 1;
          display: flex;
          flex-direction: column-reverse;
        }
      }
    }
  }
</style>
