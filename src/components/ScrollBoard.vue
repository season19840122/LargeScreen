<template>
  <div class="scrollboard-wrap">
    <div class="title-wrap">
      <h3 class="title">满溢跟踪</h3>
      <div class="decoration"></div>
    </div>
    <dv-scroll-board class="scrollboard" :config="scrollboard" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ScrollBoard',
    props: {
      option: Object,
    },
    data() {
      return {
        scrollboard: {},
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
        console.log('classifyData', classifyData)
        var data = classifyData

        // test data
        // this.scrollboard = {
        //   header: ['点位名称', '时间', '执行人', '状态', '已耗时'],
        //   headerBGC: '',
        //   oddRowBGC: '',
        //   evenRowBGC: 'rgba(2, 206, 180, 0.1)',
        //   rowNum: 3,
        //   columnWidth: [120, 100, 100, 100, 90],
        //   align: ['center', 'center', 'center', 'center', 'center'],
        //   data: [
        //     {
        //       "time": "02-04 08:43:51",
        //       "point": "衢州海创园1号点位",
        //       "executor": "刘玉林",
        //       "spend": "1小时25分钟"
        //     },
        //     {
        //       "time": "02-04 08:43:51",
        //       "point": "衢州海创园1号点位",
        //       "executor": "刘玉林",
        //       "spend": "1小时25分钟"
        //     },
        //     {
        //       "time": "02-04 08:43:51",
        //       "point": "衢州海创园1号点位",
        //       "executor": "刘玉林",
        //       "spend": "1小时25分钟"
        //     },
        //     {
        //       "time": "02-04 08:43:51",
        //       "point": "衢州海创园1号点位",
        //       "executor": "刘玉林",
        //       "spend": "1小时25分钟"
        //     },
        //     {
        //       "time": "02-04 08:43:51",
        //       "point": "衢州海创园1号点位",
        //       "executor": "刘玉林",
        //       "spend": "1小时25分钟"
        //     }
        //   ]
        // }
        var opt = getOptions(data.overflow)
        this.scrollboard = opt
      },
      getOptions(data) {
        var taskData = []
        for (var i of data) {
          taskData.push([i.point, i.time, i.executor, '已派发', `<span style="color:#FC4501;">${i.spend}</span>`])
        }
        var option = {
          header: ['点位名称', '时间', '执行人', '状态', '已耗时'],
          headerBGC: '',
          oddRowBGC: '',
          evenRowBGC: 'rgba(2, 206, 180, 0.1)',
          rowNum: 3,
          columnWidth: [120, 100, 100, 100, 90],
          align: ['center', 'center', 'center', 'center', 'center'],
          data: taskData,
        }
        return option
      },
    },
  }
</script>

<style lang="scss">
  .dv-scroll-board {
    .header {
      .header-item {
        color: #02ceb4;
        .row-item {
        }
      }
    }
    .rows {
      .row-item {
        &:hover {
          background-image: url(../assets/images/table-hover.png);
          background-size: 100% 100%;
        }
        .ceil {
          // white-space: normal;
          font-weight: 500;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .scrollboard-wrap {
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
    .scrollboard {
      flex: 1;
      width: 100%;
      height: 200px;
    }
  }
</style>
