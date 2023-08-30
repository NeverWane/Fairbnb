import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Stay } from 'src/app/models/stay.model';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() stay: Stay | null = null
  showDatePicker: boolean = false
  showGuestPicker: boolean = false
  range = { start: '', end: '' }
  countMap: { [key: string]: number } = {
    adult: 1,
    child: 0,
    infant: 0,
    pet: 0
  }
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private subscription: Subscription | null = null

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.range.start = params.get('startDate') || ''
      this.range.end = params.get('endDate') || ''
      this.countMap['adult'] = parseInt(params.get('adult') || '1')
      this.countMap['child'] = parseInt(params.get('child') || '0')
      this.countMap['infant'] = parseInt(params.get('infant') || '0')
      this.countMap['pet'] = parseInt(params.get('pet') || '0')
      this.countMap = { ...this.countMap }
      this.ref.detectChanges()
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  onReserve() {
    if (!this.stay || !this.stay._id) return
    if (!this.range.start || !this.range.end) {
      this.showDatePicker = true
    } else {
      this.router.navigate(['book/stays', this.stay._id], { queryParams: this.route.snapshot.queryParams })
    }
  }


  nights() {
    const checkin = new Date(this.range.start).getTime()
    const checkout = new Date(this.range.end).getTime()
    return parseInt('' + (checkout - checkin) / 1000 / 60 / 60 / 24)
  }

  nightsTxt() { //replace later
    const count = this.nights()
    const txt = count + 'night'
    return count === 1 ? txt : ` ${txt}s`
  }

  priceNights() {
    if (!this.stay) return 0
    return this.nights() * this.stay.price
  }

  parseInt(num: number | string) {
    return parseInt('' + num)
  }

  updateQuery(event: any) {
    const newQuery = { ...this.route.snapshot.queryParams }
    for (const key in event) {
      if (event[key]) {
        newQuery[key] = event[key]
      } else {
        delete newQuery[key]
      }
    }
    this.router.navigate([], { queryParams: newQuery })
  }

  onDateClear() {
    this.range.start = ''
    this.range.end = ''
  }

  onDateChange(range: any) {
    this.range.start = range.start
    this.range.end = range.end
    const newQuery = { ...this.route.snapshot.queryParams }
    if (this.range.start) {
      newQuery['startDate'] = this.range.start
    } else {
      delete newQuery['startDate']
    }
    if (this.range.end) {
      newQuery['endDate'] = this.range.end
    } else {
      delete newQuery['endDate']
    }
    this.router.navigate([], { queryParams: newQuery })
  }
}
