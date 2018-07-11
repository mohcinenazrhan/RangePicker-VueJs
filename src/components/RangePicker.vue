<template>
  <div class="rangepicker">
    <div class="rangepicker_month" v-for="(month, index) in months" :key="index">
      <div class="rangepicker_monthtitle">
        {{ month.getName() }}
      </div>

      <div class="rangpicker_days">
        <div v-for="(day, index) in weekdays" :key="index" >{{ day }}</div>
      </div>

      <div class="rangepicker_numbers">
        <div class="rangepicker_day" v-for="(day, index) in month.getDays()" 
        :key="index" :class="classForDay(day, month)">
          {{ day.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import month from './Month.js'

  export default {
    data () {
      return {
        months: [],
        weekdays: []
      }
    },
    mounted() {
      this.weekdays = month.allDaysName()      
      this.months = month.createMonthsForYear(this.year)  
    },
    methods: {
      classForDay (day, month) {
        let classes = []
        if (!month.contains(day)) {
          classes.push('rangepicker_out')
        }
        return classes
      }
    },
    props: {
      year: Number
    }
  }
</script>

<style lang="scss" src="./rangepicker.scss"></style>