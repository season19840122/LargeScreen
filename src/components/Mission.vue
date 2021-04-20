<template>
  <div class="mission-wrap">
    <div class="title-wrap">
      <h3 class="title">实时任务</h3>
      <div class="decoration"></div>
    </div>
    <div class="progress">
      <!-- <dv-capsule-chart :config="capsule" class="" /> -->
      <div class="title">
        <p class="name">任务进度</p>
        <p class="percent">{{ task.progress }}%</p>
      </div>
      <div class="capsule-container">
        <div class="capsule-item">
          <div class="capsule-item-column" :style="{ width: task.progress + '%' }"></div>
        </div>
      </div>
    </div>
    <dv-scroll-board class="scrollboard" :config="scrollboard" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Mission',
    data() {
      return {
        capsule: {
          data: [
            {
              name: '可回收',
              value: 167,
            },
          ],
        },
        task: {},
        scrollboard: {

        },
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
        // this.task = {
        //   progress: 60,
        //   detail: [
        //     {
        //       time: '02-04 08:43:51',
        //       point: '衢州海创园1号点位',
        //       executor: '刘玉林',
        //       status: '1',
        //     },
        //     {
        //       time: '02-04 08:43:51',
        //       point: '衢州海创园1号点位',
        //       executor: '刘玉林',
        //       status: '1',
        //     },
        //     {
        //       time: '02-04 08:43:51',
        //       point: '衢州海创园1号点位',
        //       executor: '刘玉林',
        //       status: '1',
        //     },
        //   ],
        // }
        var opt = getOptions(data.task.detail)
        this.task = data.task
        this.scrollboard = opt
      },
      getOptions(data) {
        var taskData = []
        for (var i of data) {
          // taskData.push([`<span>${i.point}<br>${i.point}</span>`, i.time, i.executor,  `<span style="color:#02CEB4;">${i.status}</span>`])
          if(i.status === '1') {
            i.status = '完成'
            i.color = '#02CEB4'
          } else {
            i.status = '未完成'
            i.color = '#FC4501'
          }
          taskData.push([i.point, i.time, i.executor,  `<span style="color: ${i.color};">${i.status}</span>`])

        }
        var option = {
          header: ['点位名称', '时间', '执行人', '状态'],
          headerBGC: '',
          oddRowBGC: '',
          evenRowBGC: 'rgba(2, 206, 180, 0.1)',
          rowNum: 3,
          columnWidth: [90],
          align: ['center', 'center', 'center', 'center'],
          data: taskData,
        }
        return option
      }
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
        // height: 58px !important;
        line-height: 1.5 !important;
        &:hover {
          background-image: url(../assets/images/table-hover.png);
          background-size: 100% 100%;
        }
        .ceil {
          white-space: normal;
          &:nth-of-type(3), &:nth-of-type(4) {
            line-height: 44px !important;
          }
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  .mission-wrap {
    width: 100%;
    height: 32%;
    padding: 7px;
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
    .progress {
      width: 377px;
      min-height: 56px;
      height: 56px;
      padding: 8px 30px;
      margin: 12px auto 10px;
      background-image: url(../assets/images/capsule-bg.png);
      background-repeat: no-repeat;
      .title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        .name {
          color: #e4e4e4;
        }
        .percent {
          font-weight: bold;
          color: #fc4501;
        }
      }
      .capsule-container {
        width: 318px;
        height: 6px;
        .capsule-item {
          background-color: #183634;
          height: 100%;
          margin: 5px 0px;
          border-radius: 5px;
        }
        .capsule-item-column {
          position: relative;
          height: 100%;
          margin-top: 1px;
          border-radius: 5px;
          transition: all 0.3s;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background-color: #02ceb4;
        }
      }
    }
  }
</style>
