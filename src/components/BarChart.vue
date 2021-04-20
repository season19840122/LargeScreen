<template>
  <div class="bar-wrap">
    <div class="title-wrap">
      <h3 class="title">{{ title }}</h3>
      <div class="decoration"></div>
    </div>
    <!-- <dv-charts class="bar" :option="bar" /> -->
    <v-chart class="bar" :option="bars" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BarChart',
    props: {
      title: {
        type: String,
        default: '正确率排行榜',
      },
    },
    data() {
      return {
        bar1: {
          title: {
            text: '周销售额趋势',
          },
          xAxis: {
            name: '第一周',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          yAxis: {
            name: '销售额',
            data: 'value',
          },
          series: [
            {
              data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
              type: 'bar',
              backgroundBar: {
                show: true,
              },
            },
          ],
        },
        bars: {},
      }
    },
    watch: {
      classifyData(newCount, oldCount) {
        // Our fancy notification (2).
        this.createData()
      },
      // classifyData: {
      //   handler(newVal, oldVal) {
      //     // 当有值是再执行相应的方法
      //     this.createData()
      //   },
      //   // immediate如果为true 代表如果在 wacth 里声明了之后，就会立即先去执行里面的handler方法
      //   // 初始化立即执行，这样我们就可以在created中去掉某些预先请求接口了
      //   immediate: true,
      //   deep: true, // 如果是对象要深度监听
      // },
    },
    computed: {
      ...mapGetters(['classifyData']),
    },
    mounted() {
      const { createData } = this

      createData()
    },
    methods: {
      createData() {
        var { title, classifyData, getOptions } = this
        // classifyData = this.$store.state.app.classifyData
        console.log('bar', classifyData)
        var data = classifyData
        var barData = {}

        if (title !== '督导计划完成率') {
          // test data
          // data.deRateTop = [
          //   {
          //     "name": "五常街道",
          //     "last": 0.01,
          //     "this": 0.02
          //   },
          // ]
          for (var i of data.deRateTop) {
            i.last = i.last * 100
            i.this = i.this * 100
          }
          console.log('deRateTop', data.deRateTop)
          barData = data.deRateTop
        } else {
          // test data
          // data.suRateTop = [
          //   {
          //     "name": "五常街道",
          //     "last": 0.01,
          //     "this": 0.02
          //   },
          //   {
          //     "name": "五",
          //     "last": 0,
          //     "this": 0
          //   },
          //   {
          //     "name": "五2",
          //     "last": 0,
          //     "this": 0
          //   },
          //   {
          //     "name": "五3",
          //     "last": 0,
          //     "this": 0
          //   },
          //   {
          //     "name": "五4",
          //     "last": 0,
          //     "this": 0
          //   }
          // ]
          for (var i of data.suRateTop) {
            i.last = i.last * 100
            i.this = i.this * 100
          }
          console.log('suRateTop', data.suRateTop)
          barData = data.suRateTop
        }
        var opt = getOptions(barData)
        this.bars = opt
      },
      getOptions(data) {
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: (params) => {
              var name = params.seriesName === 'last' ? '上月' : '本月'
              var val = params.seriesName === 'last' ? params.data.last : params.data.this
              return `<div class="zd-echarts tooltip-box">
                <span></span><span></span><span></span><span></span>
                <div><div class="name">${name}：</div><div class="value">${val}%</div></div>
              </div>`
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
          legend: {
            show: true,
            top: 10,
            right: 40,
            itemHeight: 3,
            itemWidth: 12,
            itemGap: 20,
            icon: 'roundRect',
            formatter: (name) => {
              return name === 'last' ? '上月' : '本月'
            },
            data: [
              {
                name: 'last',
                icon:
                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQYlWNs7O/9z0AEYCJGEcOoQuooZGBgAAA4cAKwzOrH6QAAAABJRU5ErkJggg==',
              },
              {
                name: 'this',
                icon:
                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQYlWNkOrflPwMRgIkYRQyjCqmjkIGBAQAP8gKXraAqGAAAAABJRU5ErkJggg==',
              },
            ],
            textStyle: {
              color: '#E4E4E4',
            },
          },
          grid: {
            // 绘图区调整
            x: 60, // 左留白
            y: 40, // 上留白
            x2: 30, // 右留白
            y2: 30, // 下留白
          },
          dataset: {
            dimensions: ['name', 'last', 'this'],
            source: data,
          },
          xAxis: {
            type: 'category',
            // axisLabel: {
            //   interval: 0,      // 坐标轴刻度标签的显示间隔
            //   // rotate: 40        // 标签倾斜的角度
            // }
            // series data 方式
            // type: 'category',
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: { show: false },
          },
          yAxis: {
            type: 'value',
            max: 100,    //设置最大值
            min: 0,
            axisLabel: {
              formatter: '{value}%',
            },
            splitLine: {
              lineStyle: {
                color: '#273133',
              },
            },
          },
          series: [
            {
              //   data: [120, 200, 150, 80, 70, 110, 130],
              showBackground: true,
              backgroundStyle: {
                color: '#1E292A',
              },
              itemStyle: {
                color: '#818F8D',
                borderWidth: 0,
                decal: {
                  symbol: 'rect',
                  color: '#1E292A',
                  dashArrayX: [1, 0],
                  dashArrayY: [2, 6],
                },
              },
              type: 'bar',
              seriesLayoutBy: 'row',
              barWidth: 11,
              emphasis: {
                itemStyle: {
                  color: '#FC4501',
                },
              },
            },
            {
              //   data: [20, 40, 90, 40, 30, 70, 120],
              showBackground: true,
              backgroundStyle: {
                color: '#1E292A',
              },
              itemStyle: {
                color: '#02CEB4',
                borderWidth: 0,
                decal: {
                  symbol: 'rect',
                  color: '#1E292A',
                  dashArrayX: [1, 0],
                  dashArrayY: [2, 6],
                },
              },
              type: 'bar',
              seriesLayoutBy: 'row',
              barWidth: 11,
              emphasis: {
                itemStyle: {
                  color: '#FC4501',
                },
              },
            },
          ],
        }
        return option
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bar-wrap {
    width: 100%;
    height: 250px;
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
        // line-height: 12px;
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
    .bar {
      flex: 1;
      width: 100%;
      // height: 100%;
    }
  }
</style>
