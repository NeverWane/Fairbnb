import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { Stay } from 'src/app/models/stay.model';

@Component({
  selector: 'stay-details',
  templateUrl: './stay-details.component.html',
  styleUrls: ['./stay-details.component.scss']
})
export class StayDetailsComponent {
  stay$: Observable<Stay> | null = null

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.stay$ = this.route.data.pipe(map(data => data['stay']))
  }
}
