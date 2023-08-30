import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userService: UserService) { }

  title = 'fairbnb';

  ngOnInit(): void {
      this.userService.query()
          .pipe(take(1))
          .subscribe({
              error: err => console.log('err:', err),
          })
  }
}
