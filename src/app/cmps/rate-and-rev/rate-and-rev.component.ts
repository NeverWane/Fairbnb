import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Review, Rating } from '../../models/review.model';

@Component({
  selector: 'rate-and-rev',
  templateUrl: './rate-and-rev.component.html',
  styleUrls: ['./rate-and-rev.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RateAndRevComponent {
  rate: string = ''
  rev: string = ''
  style: string = ''

  @Input() reviews!: Review[]
  @Input() showRev: string = 'full'
  @Input() zeroPadding: number = 0
  @Input() maxDecimal: number = 2
  @Input() minDecimal: number = 1
  @Input() iconSize: number = 12

  ngOnInit() {
    this.rate = this.setRate()
    this.rev = this.setRev()
    this.style = this.setStyle()
  }

  setRate() {
    if (!this.reviews?.length) return ''
    let rate = this.reviews.reduce((acc: number, review) => {
      for (const value of Object.values(review.rate)) {
        acc += value
      }
      return acc
    }, 0)
    rate = Math.floor((rate * Math.pow(10, this.maxDecimal)) / (this.reviews.length * Object.keys(this.reviews[0].rate).length))
    rate = rate / Math.pow(10, this.maxDecimal)
    const splitRating = ('' + rate).split('.')
    if (this.maxDecimal) {
      if (!splitRating[1]) splitRating[1] = ''
      let zeroTrail = splitRating[1].split('').reduce((acc, char) => {
        if (char === '0') {
          acc++
        } else {
          acc = 0
        }
        return acc
      }, 0) || 0
      while (splitRating[1].length < this.maxDecimal && (splitRating[1].length < this.minDecimal || zeroTrail < this.zeroPadding)) {
        splitRating[1] += '0'
        zeroTrail++
      }
    }
    splitRating[0] = splitRating[0].toLocaleString()
    return splitRating.join('.')
  }

  setRev() {
    const count = this.reviews.length
    switch(this.showRev) {
      case 'short': return `(${count})`
      case 'none': return ''
    }
    return `${count} review${count > 1 ? 's' : ''}`
  }

  setStyle() {
    const size = this.iconSize + 'px'
    return `width: ${size}; height: ${size}; font-size: ${size};`
  }
}
