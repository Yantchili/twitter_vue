const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss;`
      }
    }
  }
})

