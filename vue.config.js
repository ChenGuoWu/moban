module.exports = {
  publicPath: "./",
  assetsDir: "static",
  outputDir: 'dist',

  css: {
    loaderOptions: {
           css: {
                   // options here will be passed to css-loader
           },
     postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                          remUnit: 37.5,//设计稿的 十分之一
                          "exclude": /node_modules/i
                })]
           }
      }
  },
  devServer: {
    proxy: {
      "/pro": {
        target: "http://192.168.65.29:8085",
        changeOrigin: true,
        pathRewrite: {
          '^/pro': ''
        }
      },
      "/dev": {
        target: "http://192.168.65.29:8085",
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
   
  },
  lintOnSave: false 
};