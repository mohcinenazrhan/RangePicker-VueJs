<template>
  <div id="app">
    <range-picker :year="2017"/>
  </div>
</template>

<script>
import RangePicker from './components/RangePicker.vue'

export default {
  name: 'app',
  components: {
    RangePicker
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
