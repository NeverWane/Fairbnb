import { Component, Input } from '@angular/core';
import { Stay } from '../../models/stay.model';

@Component({
  selector: 'stay-list',
  templateUrl: './stay-list.component.html',
  styleUrls: ['./stay-list.component.scss']
})
export class StayListComponent {
  @Input() stays!: Array<Stay> | null

  trackById(idx: number, stay: Stay) {
    return stay._id
  }
}
