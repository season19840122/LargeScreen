const path = require('path')
const webpack = require('webpack')
// const glob = require("glob-all");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const CompressionWebpackPlugin = require("compression-webpack-plugin");
// const PrerenderSpaPlugin = require("prerender-spa-plugin");
// const AliOssPlugin = require("webpack-oss");
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
// const SpritesmithPlugin = require('webpack-spritesmith')
// let has_sprite = true

// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// const addStylusResource = rule => {
//   rule
//     .use("style-resouce")
//     .loader("style-resources-loader")
//     .options({
//       patterns: [resolve("src/assets/stylus/variable.styl")]
//     });
// };

// try {
//   let result = fs.readFileSync(path.resolve(__dirname, './icons.json'), 'utf8')
//   result = JSON.parse(result)
//   const files = fs.readdirSync(path.resolve(__dirname, './src/assets/icons'))
//   has_sprite = files && files.length ? files.some(item => {
//     let filename = item.toLocaleLowerCase().replace(/_/g, '-')
//     return !result[filename]
//   }) : false
// } finally {
//   has_sprite = false
// }

// 雪碧图样式处理模板
// const SpritesmithTemplate = function(data) {
//   // pc
//   let icons = {}
//   let tpl = `.ico {
//   display: inline-block;
//   background-image: url(${data.sprites[0].image});
//   background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
// }`

//   data.sprites.forEach(sprite => {
//     const name = '' + sprite.name.toLocaleLowerCase().replace(/_/g, '-')
//     icons[`${name}.png`] = true
//     tpl = `${tpl}
// .ico-${name}{
//   width: ${sprite.width}px;
//   height: ${sprite.height}px;
//   background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
// }
// `
//   })

//   fs.writeFile(
//     path.resolve(__dirname, './icons.json'),
//     JSON.stringify(icons, null, 2),
//     (err, data) => {}
//   )

//   return tpl
// }
// const format = AliOssPlugin.getFormat();

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  // publicPath: '/dashboard', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    // const cdn = {
    //   // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
    //   css: ["//unpkg.com/element-ui@2.10.1/lib/theme-chalk/index.css"],
    //   js: [
    //     "//unpkg.com/vue@2.6.10/dist/vue.min.js", // 访问 https://unpkg.com/vue/dist/vue.min.js 获取最新版本
    //     "//unpkg.com/vue-router@3.0.6/dist/vue-router.min.js",
    //     "//unpkg.com/vuex@3.1.1/dist/vuex.min.js",
    //     "//unpkg.com/axios@0.19.0/dist/axios.min.js",
    //     "//unpkg.com/element-ui@2.10.1/lib/index.js"
    //   ]
    // };

    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      // html中添加cdn
      // args[0].cdn = cdn;
      return args
    })

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@utils', resolve('src/utils'))
      .set('@assets', resolve('src/assets'))
      .set('@scss', resolve('src/assets/styles/scss'))
      .set('@components', resolve('src/components'))
      // .set('@plugins', resolve('src/plugins'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))
      // .set('@layouts', resolve('src/layouts'))

    // 压缩图片
    // config.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     mozjpeg: { progressive: true, quality: 65 },
    //     optipng: { enabled: false },
    //     pngquant: { quality: "65-90", speed: 4 },
    //     gifsicle: { interlaced: false },
    //     webp: { quality: 75 }
    //   });

    // const types = ["vue-modules", "vue", "normal-modules", "normal"];
    // types.forEach(type =>
    //   addStylusResource(config.module.rule("stylus").oneOf(type))
    // );

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    if (IS_PROD) {
      // config.optimization.delete("splitChunks");
    }
    return config
  },
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理端口
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target: 'https://test.zjzhxw.com/api/suyuan', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
