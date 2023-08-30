import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: number | { [key: string]: number }, txt: string = ''): string {
    const values = (txt ? { [txt]: value } : value) as { [key: string]: number }
    return Object.keys(values).reduce((acc, key) => {
      if (values[key]) {
        acc += `${values[key]} ${this.toPlural(values[key], key)}, `
      }
      return acc
    }, '').slice(0, -2)
  }

  toPlural(num: number, key: string) {
    if (!num) return ''
    return Math.abs(num) === 1 ? key : `${key}s`
  }
}
