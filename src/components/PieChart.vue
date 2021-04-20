<template>
  <div class="pie-wrap">
    <div class="title-wrap">
      <h3 class="title">溯源概况</h3>
      <div class="decoration"></div>
    </div>
    <div class="pie-outter">
      <div class="ring-outter" v-for="(item, index) in pies" :key="index">
        <!-- <dv-charts class="pie" :option="pie" /> -->
        <v-chart class="pie" :option="item" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'PieChart',
    data() {
      return {
        pie1: {
          title: {
            text: '',
          },
          color: ['#02CEB4', '#818F8D'],
          series: [
            {
              type: 'pie',
              data: [
                { name: '参与小区', value: 70 },
                { name: '未参与小区', value: 30 },
              ],
              radius: ['40%', '55%'],
              insideLabel: {
                show: false,
                // formatter: '{name}\n{percent}%',
              },
              outsideLabel: {
                show: true,
                formatter: '{name}\n{percent}%',
                labelLineEndLength: 20,
                style: {
                  fill: '#E4E4E4',
                  fontSize: 14,
                },
                labelLineStyle: {
                  stroke: '#02CEB4',
                },
              },
              roseType: true,
            },
          ],
        },
        pies: [],
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
        this.pies = []
        var { className, classifyData, getOptions } = this
        console.log('classifyData', classifyData)
        var data = classifyData
        var opt1 = getOptions(data.installRate.boundRate, {
          title: '溯源覆盖\n比例',
          name: '参与小区',
          name1: '未参与\n小区',
        })
        var opt2 = getOptions(data.troubleRate.intactRate, {
          title: '溯源设施\n完好比例',
          name: '设施完好',
          name1: '故障',
        })
        var opt3 = getOptions(data.attendance.rate, {
          title: '出勤比例',
          name: '出勤',
          name1: '未出勤',
        })
        // var arr = [].concat[opt1, opt2, opt3]
        this.pies.push(opt1, opt2, opt3)
      },
      getOptions(rate, obj) {
        var option = {
          title: {
            text: obj.title,
            x: 'center',
            y: 'center',
            textStyle: {
              color: '#02CEB4',
              fontSize: 14,
            },
          },
          tooltip: {
            show: false,
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              color: ['#02CEB4', '#304445'],
              radius: ['40%', '55%'],
              avoidLabelOverlap: false,
              label: {
                // alignTo: 'edge',
                formatter: '{a|{b}}\n{b|{c}%}',
                minMargin: 5,
                // edgeDistance: 10,
                lineHeight: 15,
                rich: {
                  a: {
                    fontSize: 14,
                    fontFamily: 'Source Han Sans CN',
                    fontWeight: 500,
                    color: '#E4E4E4',
                  },
                  b: {
                    fontSize: 14,
                    fontFamily: 'Source Han Sans CN',
                    fontWeight: 500,
                    color: '#FC4501',
                  },
                },
              },
              labelLine: {
                lineStyle: {
                  color: '#02CEB4',
                },
              },
              hoverAnimation: false,
              data: [
                { name: obj.name, value: rate*100 },
                { name: obj.name1, value: (1 - rate)*100 },
              ],
            },
          ],
        }
        return option
      },
      randomExtend(minNum, maxNum) {
        if (arguments.length === 1) {
          return parseInt(Math.random() * minNum + 1, 10)
        } else {
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pie-wrap {
    position: relative;
    // width: 976px;
    height: 250px;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    .title-wrap {
      width: 100%;
      height: 24px;
      padding: 5px 0;
      background: url(../assets/images/title-bg-big.png) no-repeat;
      background-size: 100% 100%;
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
    .pie-outter {
      // flex: 1;
      margin-top: 16px;
      padding: 0 20px;
      width: 100%;
      height: 204px;
      background: url(../assets/images/bottom-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      .ring-outter {
        width: 320px;
        height: 220px;
        background-image: url(../assets/images/ring-bg-big.png);
        background-position: 90px 38px;
        background-repeat: no-repeat;
        // padding: 7px;
        .pie {
          width: 320px;
          height: 220px;
        }
      }
    }
  }
</style>
