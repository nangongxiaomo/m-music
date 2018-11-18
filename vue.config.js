module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        base: '@/base',
        common: '@/common',
        api: '@/api'
      }
    }
  }
}
