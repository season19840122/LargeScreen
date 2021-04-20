<template >
<div>
  <el-container id="container"> </el-container>
  <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
  </div>
</template>
<script>
export default {
  data() {
    return {
      marker: {}, //点标记
      markers: [], //点集合
      map: {} //地图对象
    };
  },
  methods: {
    //初始化地图
    initMap() {
      //创建地图
      this.map = new AMap.Map("container", {
        cursor: "default",
        resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
        expandZoomRange: true, //是否支持可以扩展最大缩放级别,和zooms属性配合使用设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
        // gestureHandling: "greedy",//谷歌里面的// hybrid包含卫星和地名
        zooms: [3, 20],
        zoom: 8,
        defaultCursor: "pointer", //变成小手 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范
        showLabel: true, //显示地图文字标记
        layers: [
          new AMap.TileLayer.Satellite() //默认卫星
          // new AMap.TileLayer.RoadNet(), //地图路网
          // new AMap.Buildings({// 楼块图层
          // zooms: [16, 18],
          // zIndex: 10,
          // heightFactor: 2 //2倍于默认高度，3D下有效
          // })
        ] //Satellite卫星地图，RoadNet路网，地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个TileLayer类实现
        // viewMode: "3D", //是否3d视角
        // pitch: 40 //俯仰角度，默认0，[0,83]，2D地图下无效 。（自V1.4.0开始支持）
      });

      //行政区域
      AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
        //创建一个实例
        var districtExplorer = new DistrictExplorer({
          eventSupport: true,
          map: this.map
        });
        //feature被点击
        // districtExplorer.on("featureClick", (e, feature) => {});
        //外部区域被点击
        // districtExplorer.on("outsideClick", e => {});

        //内部区域feature被点击
        districtExplorer.on("featureClick", (e, feature) => {
          console.log("feature", feature);
          adcodes = []; //清空区码数组
          adcodes = [feature.properties.adcode]; //绘制地图区域
          // this.initCity(feature); //调用city城市地图
          districtExplorer.loadMultiAreaNodes(adcodes, (error, areaNodes) => {
            //设置定位节点，支持鼠标位置识别
            console.log("areaNodes", areaNodes);
            //注意节点的顺序，前面的高优先级
            districtExplorer.setAreaNodesForLocating(areaNodes);
            //清除已有的绘制内容
            districtExplorer.clearFeaturePolygons();
            for (var i = 0, len = areaNodes.length; i < len; i++) {
              renderAreaNode(areaNodes[i]);
              this.initTown(areaNodes[i]);
            }
            //更新地图视野
            this.map.setFitView(districtExplorer.getAllFeaturePolygons());
          });
        });
        //外部区域被点击
        districtExplorer.on("outsideClick", e => {
          this.removeArea(); //清除地图上的文字marker标记
          //setTimeout(() => {
            //this.map.setCenter([119.92, 28.45]); //设置地图中心
          //}, 1000);

          /***清空监听的项目名称id和adcode***/
          adcodes = [];
          adcodes = [
            330000 //浙江
          ];
          // this.initCity(); //获取城市区域
          districtExplorer.loadMultiAreaNodes(adcodes, (error, areaNodes) => {
            //设置定位节点，支持鼠标位置识别
            //注意节点的顺序，前面的高优先级
            districtExplorer.setAreaNodesForLocating(areaNodes);
            //清除已有的绘制内容
            districtExplorer.clearFeaturePolygons();
            for (var i = 0, len = areaNodes.length; i < len; i++) {
              renderAreaNode(areaNodes[i]);
              this.initTown(areaNodes[i]);
            }
            //更新地图视野 下钻上浮效果
            this.map.setFitView(districtExplorer.getAllFeaturePolygons());
          });
        });

        //设置绘制的子区域和父区域的自身属性（包括线颜色，透明度等）
        function renderAreaNode(areaNode) {
          //绘制子级区划
          districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
            return {
              cursor: "default",
              bubble: true,
              // strokeColor: "#00a4ce", //线颜色
              strokeColor: "#03d7a1",
              strokeOpacity: 1, //线透明度
              strokeWeight: 1.5, //线宽
              // fillColor: "#09152a", //填充色
              fillColor: "#072942",
              fillOpacity: 0.1 //填充透明度
            };
          });
          //绘制父区域
          districtExplorer.renderParentFeature(areaNode, {
            cursor: "default",
            bubble: true,
            // strokeColor: "#00a4ce", //线颜色
            strokeColor: "#03d7a1",
            strokeOpacity: 1, //线透明度
            strokeWeight: 1.5, //线宽
            // fillColor: "#09152a", //填充色
            fillColor: "#072942",
            fillOpacity: 0.5 //填充透明度
          });
        }
        var adcodes = [];
        //根据角色来绘制不同的区域
        adcodes = [
          330000 //浙江
        ];
        // this.initCity();
        //绘制多区域
        districtExplorer.loadMultiAreaNodes(adcodes, (error, areaNodes) => {
          //设置定位节点，支持鼠标位置识别
          //注意节点的顺序，前面的高优先级
          districtExplorer.setAreaNodesForLocating(areaNodes);
          //清除已有的绘制内容
          districtExplorer.clearFeaturePolygons();
          for (var i = 0, len = areaNodes.length; i < len; i++) {
            renderAreaNode(areaNodes[i]);
            this.initTown(areaNodes[i]);
          }
          //更新地图视野 下钻效果
          this.map.setFitView(districtExplorer.getAllFeaturePolygons());
        });
      });

      //AMap.DistrictSearch 行政区查询服务，提供行政区相关信息 这里实际上就是挖一个只有浙江省的空白覆盖区域，外部不让点击
      // new AMap.DistrictSearch({
      // extensions: "all",
      // subdistrict: 0
      // }).search("浙江省", (status, result) => {
      // // 外多边形坐标数组和内多边形坐标数组
      // var outer = [
      // new AMap.LngLat(-360, 90, true),
      // new AMap.LngLat(-360, -90, true),
      // new AMap.LngLat(360, -90, true),
      // new AMap.LngLat(360, 90, true)
      // ];
      // var holes = result.districtList[0].boundaries;

      // var pathArray = [outer];
      // pathArray.push.apply(pathArray, holes);
      // var polygon = new AMap.Polygon({
      // pathL: pathArray,
      // strokeColor: "#0d4f50",
      // strokeWeight: 1,
      // fillColor: "#0d4f50",
      // fillOpacity: 0.5
      // });
      // polygon.setPath(pathArray);
      // this.map.add(polygon); //添加多边形 外部区域不让点了
      // });
    },

    /**各市级地图***这里要想渲染点标记就需要后台接口给你全部数据来循环里面的详细内容或者自己点出来*****/
    initCity(feature) {

      if (
        feature.properties.adcode == undefined ||
        feature.properties.adcode == null ||
        feature.properties.adcode == ""
      ) {
        adcode = "";
      }
      this.removeArea(); //清空文字点标记
      this.marker = new AMap.Marker({
        content: `<h1 class ="markerCss">${feature.properties.name} </h1>`,
        position: [feature.properties.center[0], feature.properties.center[1]],
        offset: new AMap.Pixel(0, 0)
      });
      this.markers.push(this.marker);
      this.map.add(this.markers);
    },
    //多个县级名称
    initTown(AreaNode) {

      if (
        AreaNode.adcode == undefined ||
        AreaNode.adcode == null ||
        AreaNode.adcode == ""
      ) {
        adcode = "";
      }
      this.removeArea(); //清空文字点标记
      if (AreaNode._data.geoData.lngLatSubList) {
        AreaNode._data.geoData.lngLatSubList.forEach(item => {
          this.marker = new AMap.Marker({
            content: `<h1 class ="markerCss">${item.properties.name} </h1>`,
            position: [item.properties.center[0], item.properties.center[1]],
            offset: new AMap.Pixel(0, 0)
          });
          this.markers.push(this.marker);
        });
      }else{
        this.initCity(AreaNode._data.geoData.parent)
      }

      this.map.add(this.markers);
    },
    /******清空省市区域坐标**/
    removeArea() {
      this.map.remove(this.markers);
      this.markers = [];
    },


  },
  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 2000);
  },
  beforeDestroy() {}
};
</script>
<style lang="scss" scoped>
#container {
  height: 500px;
  width: 500px;
  background-color: pink;
}
.markerCss {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
</style>
