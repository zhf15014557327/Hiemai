module.exports = {
    configureWebpack: {
        // webpack配置
        // 代码合并时自动合并到webpack.config.js上
        externals: {
            // 这些事忽略不合并的代码
           'vue': 'Vue',
           'vue-router':'VueRouter',
           'vuex':'Vuex',
           'axios':"axios",
           "moment":"moment"
          }
    }
  }