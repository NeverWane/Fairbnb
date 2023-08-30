import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {

  transform(values: { [key: string]: number | string } | number | number[] | string | string[], minDecimal: number = 1, maxDecimal: number = 2, zeroPadding: number = 0): string {
    if (typeof(values) === 'string' || typeof(values) === 'number') {
      values = [parseFloat('' + values)]
    } else if (typeof(values) === 'object') {
      values = Object.values(values).map(values => parseFloat('' + values))
    }
    const sum = values.reduce((acc, values) => {
      acc += values
      return acc
    }, 0)
    let average = Math.floor((sum * Math.pow(10, maxDecimal)) / values.length)
    average = average / Math.pow(10, maxDecimal)
    const splitAverage = ('' + average).split('.')
    if (maxDecimal) {
      if (!splitAverage[1]) splitAverage[1] = ''
      let zeroTrail = splitAverage[1].split('').reduce((acc, char) => {
        if (char === '0') {
          acc++
        } else {
          acc = 0
        }
        return acc
      }, 0) || 0
      while (splitAverage[1].length < maxDecimal && (splitAverage[1].length < minDecimal || zeroTrail < zeroPadding)) {
        splitAverage[1] += '0'
        zeroTrail++
      }
    }
    splitAverage[0] = parseInt(splitAverage[0]).toLocaleString()
    return splitAverage.join('.')
  }

}
