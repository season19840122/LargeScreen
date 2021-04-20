<template>
  <div class="amap-wrapper">
    <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    option: Object
  },
  data() {
    return {
      map: {
        msg: 'vue-amap向你问好！'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
}
</style>
