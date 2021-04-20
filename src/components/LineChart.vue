<template>
  <div class="line-wrap">
    <div class="title-wrap">
      <h3 class="title">投递次数</h3>
      <div class="decoration"></div>
    </div>
    <!-- <dv-charts class="line" :option="line1" /> -->
    <v-chart class="line" :option="line" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'LineChart',
    data() {
      return {
        line1: {
          title: {
            show: false,
          },
          xAxis: {
            name: '',
            data: ['02-01', '02-02', '02-03', '02-04', '02-05'],
          },
          yAxis: {
            name: '',
            type: 'value',
            data: 'value',
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
            // interval: 1,     //会出现负数刻度
            min: 1,
          },
          series: [
            {
              data: [0, 500, 1000, 1500, 2500],
              type: 'line',
              lineArea: {
                show: true,
                gradient: ['rgba(2, 206, 180, 0.2)'],
              },
              lineStyle: {
                color: '#737373',
              },
              label: {
                style: {
                  fontSize: 14,
                  color: '#737373',
                },
              },
            },
          ],
          // color: ['#737373']
        },
        line: {},
      }
    },
    computed: {
      ...mapGetters(['classifyData']),
    },
    watch: {
      classifyData(newCount, oldCount) {
        // Our fancy notification (2).
        this.createData()
      },
    },
    mounted() {
      const { createData } = this

      createData()
    },
    methods: {
      createData() {
        var { classifyData, getOptions } = this
        console.log('this', this)
        console.log('classifyData', classifyData)
        var data = classifyData
        var opt = getOptions(data.deCount)
        console.log(data.deCount)
        this.line = opt
      },
      getOptions(data) {
        var option = {
          tooltip: {
            trigger: 'axis',
            renderMode: 'html',
            formatter: (params) => {
              return `<div class="zd-echarts tooltip-box">
                <span></span><span></span><span></span><span></span>
                <div>${params[0].data.num}次</div>
              </div>`
            },
            axisPointer: {
              type: 'none',
              axis: 'x',
            },
            backgroundColor: 'rgba(2, 206, 180, 0.2)',
            borderWidth: 0,
            padding: 0,
            textStyle: {
              color: '#FC4501',
              fontWeight: 'bold',
              fontSize: 14,
            },
          },
          grid: {
            // 绘图区调整
            x: 60, // 左留白
            y: 30, // 上留白
            x2: 30, // 右留白
            y2: 30, // 下留白
          },
          dataset: {
            dimensions: ['date', 'num'],
            source: data,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#737373',
              },
            },
            splitLine: {
              lineStyle: {
                color: '#273133',
              },
            },
          },
          series: [
            {
              // data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              lineStyle: {
                color: '#02CEB4',
              },
              itemStyle: {
                color: '#FC4501',
              },
              areaStyle: {
                color: 'rgba(2, 206, 180, 0.2)',
              },
              showSymbol: false,
              symbol:
                'path://M9,2A7,7,0,1,1,2,9,7,7,0,0,1,9,2M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z M9,5a4,4,0,1,0,4,4A4,4,0,0,0,9,5Z',
              symbolSize: 16,
            },
          ],
        }
        return option
      },
    },
  }
</script>

<style lang="scss" scoped>
  .line-wrap {
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-wrap {
      width: 100%;
      height: 24px;
      padding: 5px 0;
      background: url(../assets/images/title-bg.png) no-repeat;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 16px;
        font-weight: bold;
        color: #e4e4e4;
        text-indent: 17px;
        margin-top: -10px;
      }
      .decoration {
        width: 42px;
        height: 10px;
        background: url(../assets/images/title-decoration.gif) no-repeat;
      }
    }
    .line {
      width: 100%;
      height: 100%;
    }
  }
</style>
