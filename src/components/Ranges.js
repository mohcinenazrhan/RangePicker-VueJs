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
        const merged = this.ranges.reduce((m, r) => {
            if (range.contains(r)) {
                this.removeRange(r)
            } else {
                if (r.intersect(range)) {
                    r.merge(range)
                    return true
                }
            }
            return m
        }, false)

        if (merged === false) {
            this.ranges.push(range)
        }
    }

    removeRange (range) {
        this.ranges = this.ranges.filter(r => r !== range)
    }

    static fromTimestamps (ranges) {
        return new Ranges(ranges.map(range => {
            return new Range(new Date(range[0]), new Date(range[1]))
        }))
    }

    toTimestamps () {
        return this.ranges.map(range => {
            return [range.getStart().getTime(), range.getEnd().getTime()]
        })
    }
}