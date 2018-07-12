<template>
  <div id="app">
    <range-picker :year="2017" v-model="ranges"/>
  </div>
</template>

<script>
import RangePicker from './components/RangePicker.vue'

export default {
  name: 'app',
  components: {
    RangePicker
  },
  data () {
    return {
      ranges: [[1483484400000, 1484478216000], [1486162800000, 1492466400000], [1493676000000, 1494972000000], [1495231200000, 1495836000000], [1496268000000, 1496959200000], [1497650400000, 1498255200000], [1498860000000, 1499810400000], [1500069600000, 1501365600000], [1501711200000, 1502229600000], [1504130400000, 1504130400000], [1504389600000, 1506204000000], [1509228000000, 1509404400000], [1514415600000, 1514588400000], [1512082800000, 1512687600000]]
    }
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
