export default class Range {
    constructor (start, end) {
        this.start = start
        this.end = end
    }

    contains (date) {
        return date.getTime() >= this.start.getTime() && 
                date.getTime() <= this.end.getTime()
    }

    getStart () {
        return this.start
    }

    setStart (date) {
        if (date.getTime() > this.end.getTime()) {
            throw new Error('start > end')
        }
        this.start = date
    }

    getEnd () {
        return this.end
    }

    setEnd (date) {
        if (date.getTime() < this.start.getTime()) {
            throw new Error('end < start')
        }
        this.end = date
    }

    isStart (date) {
        return date.toDateString() === this.start.toDateString()  
    }
    
    isEnd (date) {
        return date.toDateString() === this.end.toDateString()
    }
}