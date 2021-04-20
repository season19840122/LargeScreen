<template>
  <div class="map-wrap">
    <button v-show="adcodeList.length > 1" type="button" class="go-back" @click="goBack">返回</button>
    <div id="map-echarts" ref="echarts" class="chart" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as echarts from 'echarts'
  import axios from 'axios'
  import { getData } from '@api'
  import { getUrlParam } from '@utils'

  export default {
    name: 'Map',
    props: {
      code: {
        type: String,
        default: '330000', // 浙江省行政编码
      },
    },
    data() {
      return {
        chart: null,
        adcodeList: [],
      }
    },
    mounted() {
      this.init(this.$props.code)
    },
    methods: {
      ...mapActions(['getClassifyData']),
      init(adcode) {
        this.getJson(adcode).then((geoJson) => {
          if (this.$data.chart) {
            this.$data.chart.dispose()
          }
          const chart = echarts.init(this.$refs.echarts)
          this.$data.adcodeList.push(adcode)
          const mapJson = {}
          geoJson.features.forEach((feature) => {
            mapJson[feature.properties.name] = feature.properties
          })
          echarts.registerMap(adcode, geoJson)
          chart.hideLoading()
          chart.setOption(this.getOptions(adcode))
          chart.on('click', (e) => {
            const feature = mapJson[e.name]
            if (feature.adcode === adcode) {
              return
            }
            this.onChange(feature.adcode)
          })
          this.$data.chart = chart
        })
      },
      goBack() {
        const adcodeList = this.$data.adcodeList
        const current = adcodeList.pop()
        if (current) {
          const parent = adcodeList.pop()
          if (parent) {
            this.onChange(parent)
          }
        }
      },
      onChange(value) {
        this.$emit('onChange', value)
        this.init(value)
        console.log('code', value)
        this.syncData(value)
      },
      syncData(code) {
        var { getQueryString, getClassifyData } = this

        getQueryString('token')

        getData({
          code: code,
        }).then((res) => {
          // this.prepare = false;
          console.log('map', res.data)
          // getClassifyData({});
          // this.$store.dispatch('getClassifyData', res.data)
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
      getJson(adcode) {
        return axios.get('geo/' + adcode + '.json').then((resp) => {
          return resp.data
        })
      },
      getOptions(mapName) {
        const image = document.createElement('img')
        image.src = require('../assets/images/map-bg.jpg')
        return {
          geo: [
            // 画边框和选中颜色
            {
              map: mapName,
              zlevel: 3,
              aspectScale: 1,
              layoutCenter: ['50%', '50%'],
              layoutSize: '95%',
              label: { show: true, color: '#fff', fontSize: 16 },
              itemStyle: {
                normal: {
                  areaColor: 'transparent',
                  borderColor: '#28D2C9',
                  borderWidth: 3,
                  shadowColor: '#28D2C9',
                  shadowBlur: 15,
                  shadowOffsetY: 6,
                },
              },
              emphasis: {
                itemStyle: {
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(208, 240, 255, 0.6)' }, // 0% 处的颜色
                      { offset: 1, color: 'rgba(49, 115, 242, 0.6)' }, // 100% 处的颜色
                    ],
                    global: false,
                  },
                },
                label: { show: true, color: '#fff' },
              },
            },
            // 画阴影
            {
              map: mapName,
              zlevel: 2,
              aspectScale: 1, // 长宽比
              layoutCenter: ['50%', '54%'],
              layoutSize: '95%',
              silent: true,
              itemStyle: {
                normal: {
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(45, 243, 255, 0.2)' }, // 0% 处的颜色
                      { offset: 1, color: 'rgba(88, 167, 255, 0.2)' }, // 100% 处的颜色
                    ],
                    global: false,
                  },
                  borderColor: '#092720',
                  borderWidth: 4,
                },
              },
            },
            // 画底图
            // {
            //   map: mapName,
            //   zlevel: 1,
            //   aspectScale: 1, // 长宽比
            //   layoutCenter: ['50%', '54%'],
            //   layoutSize: '95%',
            //   silent: true,
            //   itemStyle: {
            //     normal: {
            //       color: {
            //         image: image,
            //         repeat: 'repeat',
            //       },
            //       borderColor: '#092720',
            //       borderWidth: 4,
            //     },
            //   },
            // },
          ],
          series: [],
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .map-wrap {
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/map-bg.jpg);
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .chart {
    flex: 1;
    // width: 980px;
    // height: 740px;
    width: 700px;
    height: 800px;
    padding-bottom: 200px;
  }
  .go-back {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 800;
    width: 82px;
    height: 42px;
    line-height: 42px;
    margin-top: -20%;
    margin-left: -20%;
    font-size: 18px;
    color: #28d2c9;
    background: url(../assets/images/btn-back.png) no-repeat center;
    cursor: pointer;
    &:hover {
      background: url(../assets/images/btn-back-hov.png) no-repeat center;
    }
  }
</style>
