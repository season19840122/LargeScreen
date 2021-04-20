<template>
  <div class="capsule-wrap">
    <div class="title-wrap">
      <h3 class="title">投递量</h3>
      <div class="decoration"></div>
    </div>
    <div class="sort-wrap">
      <ul>
        <li :class="index === tabIndex ? 'active' : ''" v-for="(item, index) in type" :key="index" @click="onChange(index)">
          <pre>{{ item }}</pre>
        </li>
      </ul>
    </div>
    <!-- <dv-capsule-chart class="bar" :config="capsule" /> -->
    <v-chart class="bar" :option="bar" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CapsuleChart',
    props: {
      option: Object,
    },
    data() {
      return {
        capsule: {
          data: [
            {
              name: '可回收',
              value: 167,
            },
            {
              name: '易腐',
              value: 67,
            },
            {
              name: '其他',
              value: 123,
            },
            {
              name: '有害',
              value: 55,
            },
          ],
          unit: '',
          showValue: true,
        },
        bar: {},
        tabIndex: 0,
        type: ['今日垃圾量  |  ', '季度垃圾量  |  ', '年度垃圾量'],
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
      var { classifyData, createData } = this
      console.log('classifyData', classifyData)
      var data = classifyData
      createData(data.deVolume[0].value)
    },
    methods: {
      createData(data) {
        var { getOptions } = this
        var opt = getOptions(data)
        this.bar = opt
      },
      getOptions(data) {
        var option = {
          grid: {
            // 绘图区调整
            x: 90, // 左留白
            y: 0, // 上留白
            x2: 60, // 右留白
            y2: 10, // 下留白
          },
          dataset: {
            dimensions: ['name', 'value'],
            source: data,
          },
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0],
            position: 'top',
          },
          yAxis: {
            type: 'category',
            position: 'left',
            nameLocation: 'start',
            data: ['有害', '其他', '易腐', '可回收'],
            axisLine: {
              show: false,
            }, // 坐标轴
            axisTick: [
              {
                // 坐标轴小标记
                show: false,
              },
            ],
            axisLabel: {
              align: 'left',
              margin: 70,
              formatter: (value) => {
                let p = 'a'
                if (value === '有害') {
                  p = 'd'
                } else if (value === '其他') {
                  p = 'c'
                } else if (value === '易腐') {
                  p = 'b'
                } else {
                  p = 'a'
                }
                return '{' + p + '|}{v|' + value + '}'
              },
              rich: {
                a: {
                  height: 3,
                  width: 7,
                  backgroundColor: '#275CC7',
                  padding: 0,
                },
                b: {
                  height: 3,
                  width: 7,
                  backgroundColor: '#02CEB4',
                  padding: 0,
                },
                c: {
                  height: 3,
                  width: 7,
                  backgroundColor: '#909393',
                  padding: 0,
                },
                d: {
                  height: 3,
                  width: 7,
                  backgroundColor: '#FC4501',
                  padding: 0,
                },
                v: {
                  padding: [0, 0, 0, 10],
                  color: '#909393',
                },
              },
            },
          },
          series: [
            {
              type: 'bar',
              seriesLayoutBy: 'row',
              barMinHeight: 30, // 最小柱高
              barWidth: 8, // 柱宽度
              barMaxWidth: 100, // 最大柱宽度
              // data: [1, 23489, 29034, 104970],
              label: {
                show: true, // 显示文本
                position: 'right', // 数据值位置
                formatter: '{@value}吨',
                textStyle: {
                  color: '#E4E4E4',
                  fontSize: 14,
                },
              },
              itemStyle: {
                color: '#02CEB4',
                borderRadius: [3, 3, 3, 3],
              },
            },
          ],
        }
        return option
      },
      onChange(index) {
        this.tabIndex = index
        var { classifyData, getOptions, createData } = this
        console.log('classifyData', classifyData)
        var data = classifyData
        var barData = {}
        if (index === 0) {
          barData = data.deVolume[0].value
        } else if (index === 1) {
          barData = data.deVolume[1].value
        } else {
          barData = data.deVolume[2].value
        }
        createData(barData)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .capsule-wrap {
    width: 100%;
    height: 220px;
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
    .sort-wrap {
      margin: 30px 20px 10px;
      ul {
        li {
          cursor: pointer;
          float: left;
          color: #909393;
          font-size: 14px;
          &.active {
            color: #02ceb4;
          }
        }
      }
    }
  }
</style>
