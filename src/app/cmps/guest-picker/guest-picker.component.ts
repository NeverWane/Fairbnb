import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'guest-picker',
  templateUrl: './guest-picker.component.html',
  styleUrls: ['./guest-picker.component.scss']
})
export class GuestPickerComponent {
  @Input() capacity: number = 1
  @Input() footer: { close?: boolean, save?: boolean, clear?: boolean } | null = null
  @Output() close = new EventEmitter()
  @Output() change= new EventEmitter()
  showHeader: boolean = false
  countMap: { [key: string]: number } = {
    adult: 1,
    child: 0,
    infant: 0,
    pet: 0
  }
  private route = inject(ActivatedRoute)
  private subscription: Subscription | null = null

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.countMap['adult'] = parseInt(params.get('adult') || '1')
      this.countMap['child'] = parseInt(params.get('child') || '0')
      this.countMap['infant'] = parseInt(params.get('infant') || '0')
      this.countMap['pet'] = parseInt(params.get('pet') || '0')
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  changeGuestCount(guestType: string, dif: number, min: number, max: number) {
      this.countMap[guestType] += dif
      if (this.countMap[guestType] < min || this.countMap[guestType] > max) {
          this.countMap[guestType] -= dif
      } else {
          this.change.emit(this.countMap)
      }
  }
}
