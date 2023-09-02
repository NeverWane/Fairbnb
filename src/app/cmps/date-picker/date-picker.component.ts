import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @Input() header: any = null
  @Input() footer: any = null
  @Output() change = new EventEmitter()
  @Output() close = new EventEmitter()
  @Output() save = new EventEmitter()

  fromDate: NgbDate | null = null
  toDate: NgbDate | null = null
  hoveredDate: NgbDate | null = null
  range: { start: number | string, end: number | string } = {
    start: '',
    end: ''
  }
  private route = inject(ActivatedRoute)
  private subscription: Subscription | null = null

  ngOnInit() {
    this.subscription = this.route.queryParamMap.subscribe(params => {
      this.range.start = params.get('startDate') || ''
      this.range.end = params.get('endDate') || ''
      if (this.range.start) {
        const date = new Date(this.range.start)
        this.fromDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      }
      if (this.range.end) {
        const date = new Date(this.range.end)
        this.toDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  onClear() {
    this.range.start = ''
    this.range.end = ''
    this.fromDate = null
    this.toDate = null
    this.change.emit(this.range)
  }

  onClose() {
    this.close.emit()
  }

  displayMonths() {
    return window.innerWidth > 744 ? 2 : 1
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
    this.range.start = this.fromDate ? `${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}` : ''
    this.range.end = this.toDate ? `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}` : ''
    this.change.emit(this.range)
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }
}
