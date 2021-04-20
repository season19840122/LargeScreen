<template>
  <div class="ring-wrap" :class="className">
    <div class="ring-outter" v-for="(item, index) in pies" :key="index">
      <!-- <dv-charts class="ring" :option="gauge" /> -->
      <v-chart class="ring" :option="item" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'RingChart',
    props: {
      className: String,
      // data: Object
    },
    data() {
      return {
        gauge: {
          series: [
            {
              type: 'gauge',
              startAngle: -Math.PI / 2,
              endAngle: Math.PI * 1.5,
              arcLineWidth: 3,
              radius: '80%',
              data: [{ name: '知晓率', value: 40 }],
              axisLabel: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              pointer: {
                show: false,
              },
              backgroundArc: {
                style: {
                  stroke: '#304445',
                },
              },
              details: {
                show: true,
                formatter: '{value}%\n{name}',
                style: {
                  fill: '#02CEB4',
                  fontSize: 14,
                },
              },
            },
          ],
          color: ['#02CEB4'],
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

        if (className !== 'sanhua') {
          var opt1 = getOptions(data.awareness.rate, '知晓率')
          var opt2 = getOptions(data.participate.rate, '参与率')
          var opt3 = getOptions(data.correctRate.rate, '正确率')
          // var arr = [].concat[opt1, opt2, opt3]
          this.pies.push(opt1, opt2, opt3)
        } else {
          var opt1 = getOptions(data.resource.rate, '资源化')
          var opt2 = getOptions(data.harmless.rate, '无害化')
          var opt3 = getOptions(data.reduction.rate, '减量化')
          // var arr = [].concat[opt1, opt2, opt3]
          this.pies.push(opt1, opt2, opt3)
        }
      },
      getOptions(rate, name) {
        var option = {
          title: {
            text: [`{a|${rate * 100}%}`, `{b|${name}}`].join('\n'),
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 20,
                  color: '#02CEB4',
                },
                b: {
                  fontSize: 14,
                  color: '#9EA1A1',
                },
              },
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
              radius: ['82%', '90%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              hoverAnimation: false,
              data: [
                { name: name, value: rate },
                { name: '', value: 1 - rate },
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
  .ring-wrap {
    width: 100%;
    height: 175px;
    background-image: url(../assets/images/sanlv.png);
    background-repeat: no-repeat;
    padding: 57px 20px;
    display: flex;
    justify-content: space-between;
    &.sanhua {
      background-image: url(../assets/images/sanhua.png);
    }
    .ring-outter {
      width: 104px;
      height: 99px;
      background-image: url(../assets/images/ring-bg.png);
      background-repeat: no-repeat;
      padding: 7px;
      .ring {
        width: 104px - 14;
        height: 99px - 14;
      }
    }
  }
</style>
