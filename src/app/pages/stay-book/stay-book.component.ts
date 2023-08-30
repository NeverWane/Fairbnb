import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, Subscription, take } from 'rxjs';
import { Stay } from 'src/app/models/stay.model';
import { storageService } from 'src/app/services/async-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'stay-book',
  templateUrl: './stay-book.component.html',
  styleUrls: ['./stay-book.component.scss']
})
export class StayBookComponent {
  stay$: Observable<Stay> | null = null
  modal: string | null = null
  private subscription: Subscription | null = null
  countMap = {
    adult: 1,
    child: 0,
    infant: 0,
    pet: 0,
  }
  // countMap = {
  //   guest: parseInt(this.$route.query.adult) + parseInt(this.$route.query.child || 0),
  //   infant: this.$route.query.infant,
  //   pet: this.$route.query.pet,
  // }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.stay$ = this.route.data.pipe(map(data => data['stay']))
    this.subscription = this.route.queryParams.subscribe(params => {
      this.countMap = {
        adult: parseInt('' + params['adult']) || 1,
        child: parseInt(params['child']) || 0,
        infant: parseInt(params['adult']) || 0,
        pet: parseInt(params['pet']) || 0
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  getCheckin() {
    return this.route.snapshot.queryParams['startDate']
  }

  getCheckout() {
    return this.route.snapshot.queryParams['endDate']
  }

  dates() {
    if (!this.getCheckin() || !this.getCheckout()) {
      this.router.navigate([''])
      return
    }
    const checkin = new Date(this.getCheckin())
    const checkout = new Date(this.getCheckout())
    let from = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkin.getTime()))
    let to = ''
    if (checkin.getFullYear() !== checkout.getFullYear()) {
      from += `, ${checkin.getFullYear()}`
      to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
      to += `, ${checkout.getFullYear()}`
    } else if (checkin.getMonth() !== checkout.getMonth()) {
      to = (new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(checkout.getTime()))
    } else {
      to = '' + checkout.getDate()
    }
    return from + ' - ' + to
  }

  nights() {
    const checkin = new Date(this.getCheckin()).getTime()
    const checkout = new Date(this.getCheckout()).getTime()
    if (!checkin || !checkout) return
    return parseInt('' + (checkout - checkin) / 1000 / 60 / 60 / 24)
  }

  nightsTxt() { //replace later
    const count = this.nights()
    const txt = count + ' night'
    return count === 1 ? txt : ` ${txt}s`
  }

  onDateChange(ev: any) {
  }

  updateDate(range: any) {
    const newQuery = { ...this.route.snapshot.queryParams }
    if (range.start) {
      newQuery['startDate'] = range.start
    } else {
      delete newQuery['startDate']
    }
    if (range.end) {
      newQuery['endDate'] = range.end
    } else {
      delete newQuery['endDate']
    }
    this.modal = null
    this.router.navigate([], { queryParams: newQuery })
  }

  updateCounts(counts: any) {
    this.countMap.adult = counts.adult || 0
    this.countMap.child = counts.child || 0
    this.countMap.infant = counts.infant || 0
    this.countMap.pet = counts.pet || 0
  }

  updateQuery() {
    const newQuery = { ...this.route.snapshot.queryParams, ...this.countMap } as { [key: string]: number }
    for (const key in newQuery) {
      if (!newQuery[key]) {
        delete newQuery[key]
      }
    }
    this.modal = null
    this.router.navigate([], { queryParams: newQuery })
  }

  createOrder() {
    const user = this.userService.getLoggedInUser()
    if (!user) {
      console.log('Not logged in')
      return
    }
    this.stay$?.pipe(take(1)).subscribe(stay => {
      const newQuery = { ...this.route.snapshot.queryParams }
      const order = {
        _id: storageService.makeId(),
        hostId: stay.host._id,
        stayId: stay._id,
        guestId: user._id,
        createdAt: Date.now(),
        ...newQuery,
        totalPrice: stay.price * (114 / 100),
        status: 'pending'
      }
      user.orders.unshift(order)
      if (this.userService.save(user)) {
        console.log('Created order: ' + order._id)
      }
      this.router.navigate([''])
    })
  }

  onBack() {
    this.router.navigate(['stay', this.route.snapshot.params['stayId']], { queryParams: this.route.snapshot.queryParams })
  }

  stopPropagation(ev: MouseEvent) {
    ev.stopPropagation()
    return 'true'
  }
}
