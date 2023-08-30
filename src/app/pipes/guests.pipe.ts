import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guests'
})
export class GuestsPipe implements PipeTransform {

  transform(value: { [key: string]: number }): string {
    const values = { guest: (value['adult'] + value['child']), infant: value['infant'], pet: value['pet'] } as { [key:string]: number }
    return Object.keys(values).reduce((acc, key: string) => {
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
