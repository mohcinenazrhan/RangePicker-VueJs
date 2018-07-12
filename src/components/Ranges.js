import Range from './Range'

export default class Ranges {
    constructor (ranges) {
        this.ranges = ranges
        // console.log(this.ranges);
    }

    contains (date) {
        for (const key in this.ranges) {         
            if ( this.ranges[key].contains(date) ) {
                return this.ranges[key]
            }
        }

        return null
    }

    addRange (range) {
        for (const key in this.ranges) {
            if ( this.ranges[key].intersect(range) ) {
                this.ranges[key].merge(range)
                return
            }
        }
        this.ranges.push(range)
    }
    static fromTimestamps (ranges) {
        return new Ranges(ranges.map(range => {
            return new Range(new Date(range[0]), new Date(range[1]))
        }))
    }
}