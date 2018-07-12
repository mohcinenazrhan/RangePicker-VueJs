<template>
  <div>
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
          :key="index" :class="classForDay(day, month, newRange)" 
          @mousedown="startDrag(day)"
          @mouseover="overDay(day)"
          @dblclick="removeRange(day)">
            {{ day.getDate() }}
          </div>
        </div>
      </div>
    </div>
    <div class="rangepicker_actions">
      <button class="rangepicker_cancel" @click="cancel">Cancel</button>
      <button class="rangepicker_save" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
  import Month from './Month.js'
  import Ranges from './Ranges.js'
  import Range from './Range.js'

  export default {
    data () {
      return {
        months: [],
        weekdays: [],
        ranges: [],
        newRange: null,
        cursor: 1,
        stratDate: null
      }
    },
    mounted() {
      this.ranges = Ranges.fromTimestamps(this.value)
      this.weekdays = Month.allDaysName()      
      this.months = Month.createMonthsForYear(this.year)  
      document.addEventListener('mouseup', this.onRelease)
    },
    destroyed() {
      document.removeEventListener('mouseup', this.onRelease)      
    },
    methods: {
      classForDay (day, month, newRange) {
        let classes = []

        let range = this.ranges.contains(day)
        if (range !== null) {
          classes.push('rangepicker_range')  
          
          if ( range.isStart(day) ) { classes.push('rangepicker_range-start') }
          if ( range.isEnd(day) ) { classes.push('rangepicker_range-end') }
        }

        if (newRange !== null) {
          if (newRange.contains(day)) {
            classes = ['rangepicker_newrange']
            if ( newRange.isStart(day) ) { classes.push('rangepicker_range-start') }
            if ( newRange.isEnd(day) ) { classes.push('rangepicker_range-end') }
          }
        }

        if (!month.contains(day)) {
          classes.push('rangepicker_out')
        }
        return classes
      },
      startDrag (day) {
        let range = this.ranges.contains(day)
        if (range) {
          if (range.isStart(day)) {
            this.newRange = range
            this.ranges.removeRange(range)
            this.stratDate = range.getEnd()
            this.cursor = 0
          } else if (range.isEnd(day)) {
            this.newRange = range
            this.ranges.removeRange(range)
            this.stratDate = range.getStart()
            this.cursor = 1
          }
        } else {
          this.stratDate = day
          this.newRange = new Range(day, day)
        }
        
      },
      overDay (day) {
        if (this.newRange !== null) {
          try {
            if (this.cursor === 1) {
              this.newRange.setEnd(day)            
            } else {
              this.newRange.setStart(day)            
            }
          } catch (e) {
            this.cursor = Math.abs(this.cursor - 1)
            this.newRange = new Range(this.stratDate, this.stratDate)
            this.overDay (day)
          }  
        }
      },
      onRelease () {
        if (this.newRange) {
          this.ranges.addRange(this.newRange)
        }
        this.newRange = null
      },
      removeRange (day) {
        let range = this.ranges.contains(day)
        if (range) {
          this.ranges.removeRange(range)
        }
      },
      endDrag () {
        // @mouseup="endDrag()"
        this.ranges['ranges'].push(this.newRange)
        this.newRange = null
      },
      cancel () {
        this.$emit('cancel')
      },
      save () {
        this.$emit('input', this.ranges.toTimestamps())
        this.$emit('save')
      }
    },
    props: {
      year: Number,
      value: Array
    }
  }
</script>

<style lang="scss" src="./rangepicker.scss"></style>