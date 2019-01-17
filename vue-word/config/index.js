'use strict'
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target:'http://10.21.40.40/scherger/api.php',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      },
      '/addword':{
        target:'http://10.21.40.40/VueWordApi/addword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/addword':''
        }
      },
      '/taddword':{
        target:'http://10.21.40.40/VueWordApi/taddword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/addword':''
        }
      },
      '/getword':{
        target:'http://10.21.40.40/VueWordApi/getword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/getword':''
        }
      },
      '/userword':{
        target:'http://10.21.40.40/VueWordApi/userword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/userword':''
        }
      },
      '/getsound':{
        target:'http://fanyi.baidu.com/gettts',
        changeOrigin:true,
        pathRewrite:{
          '^/getsound':''
        }
      },
      '/mycollection':{
        target:'http://10.21.40.40/VueWordApi/mycollection.php',
        changeOrigin:true,
        pathRewrite:{
          '^/mycollection':''
        }
      },
      '/getmycollection':{
        target:'http://10.21.40.40/VueWordApi/getmycollection.php',
        changeOrigin:true,
        pathRewrite:{
          '^/getmycollection':''
        }
      },
      '/deleteword':{
        target:'http://10.21.40.40/VueWordApi/deleteword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/deleteword':''
        }
      },
      '/updateword':{
        target:'http://10.21.40.40/VueWordApi/updateword.php',
        changeOrigin:true,
        pathRewrite:{
          '^/updateword':''
        }
      },
      '/Translate':{
        target:'http://openapi.youdao.com/api',
        changeOrigin:true,
        pathRewrite:{
          '^/Translate':''
        }
      },
      '/getsubject':{
        target:'http://10.21.40.40/VueWordApi/getsubject.php',
        changeOrigin:true,
        pathRewrite:{
          '^/getsubject':''
        }
      },
      '/answer':{
        target:'http://10.21.40.40/VueWordApi/answer.php',
        changeOrigin:true,
        pathRewrite:{
          '^/answer':''
        }
      },
      '/summary':{
        target:'http://10.21.40.40/VueWordApi/summary.php',
        changeOrigin:true,
        pathRewrite:{
          '^/summary':''
        }
      },
      '/day':{
        target:'http://10.21.40.40/VueWordApi/day.php',
        changeOrigin:true,
        pathRewrite:{
          '^/day':''
        }
      },
      '/week':{
        target:'http://10.21.40.40/VueWordApi/week.php',
        changeOrigin:true,
        pathRewrite:{
          '^/week':''
        }
      }
    },

    // Various Dev Server settings
    host: '10.21.40.40', // can be overwritten by process.env.HOST
    port: 1234, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
