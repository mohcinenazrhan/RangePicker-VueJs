export default class Month {
    constructor (year, month) {
        this.year = year
        this.month = month
        this.start = new Date(this.year, this.month)
    }

    getName () {
        return this.start.toLocaleString('fr-fr', {month: 'long'})
    }

    contains (date) {
        return date.getMonth() === this.month
    }

    getDays() {
        let days = []
        // console.log(this.start, this.start.getDay());
        
        if (this.start.getDay() !== 1) {
            // to make Monday as the first day & Sunday as the last
            const lenDaysbefore = this.start.getDay() === 0 ? 7 : this.start.getDay()
            for (let i = lenDaysbefore - 1; i > 0; i--) {
                // console.log(i);
                let date = this.clone(this.start)
                date.setDate((i - 1) * -1)
                days.push(date)
            }
        }
    
        // Get last day in month
        let end = this.clone(this.start)
        end.setMonth(end.getMonth() + 1)
        // setDate : set day 
        end.setDate(0)

        for (let i = 0; i < end.getDate(); ++i) {
            let date = this.clone(this.start)
            date.setDate(i + 1)
            days.push(date)
        }
        
        const lastDay = days[days.length - 1]
        if (lastDay.getDay() !== 0) {
            const lenDaysafter = 7 - lastDay.getDay()
            const lastDate = lastDay.getDate()

            for (let i = 1; i <= lenDaysafter; i++) {
                let date = this.clone(this.start)
                date.setDate(lastDate + i)
                days.push(date)
            }
        }

        return days
    }

    clone (date) {
        return new Date(date.getTime())
    }

    static createMonthsForYear (year) {
        let months = []
        for (let i = 0; i < 12; i++) {
            months.push(new Month(year, i))
        }
        return months
    }
    
    static allDaysName () {
        const date = new Date(0);
        let days = []
        for (let i = 0; i < 7; i++) {
            date.setDate(5 + i);

            let weekday = new Intl.DateTimeFormat(["fr"], {
                weekday: "short"
            }).format(date);

            days.push(weekday)
        }
        return days
    }
}