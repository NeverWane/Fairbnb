import { Component } from '@angular/core';
import { Stay } from '../../models/stay.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'stay-index',
  templateUrl: './stay-index.component.html',
  styleUrls: ['./stay-index.component.scss']
})
export class StayIndexComponent {
  stays: Array<Stay> | null = null
  stays$: Observable<Stay[]> | null = null

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stays$ = this.route.data.pipe(map(data => data['stays']))
  }
}
