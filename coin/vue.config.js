const path = require('path');
const utils = {
  assetsPath: function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
      // 生产环境下的 static 路径
      ?
      'static'
      // 开发环境下的 static 路径
      :
      'static'

    return path.posix.join(assetsSubDirectory, _path)
  },
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? "./" : './',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        //   // target: 'http://192.168.0.159:8080',
        //   // target: 'http://192.168.0.180:8080',
        //   // target: 'http://ihospital.doctoradmin.ebaiyihui.com',
        target: 'https://3x.defi.dev/',
        ws: true,
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "AI Farmer";
        return args;
      })
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonrs/[name].[hash:7].[ext]')
        }
      }]
    }
  } 
}