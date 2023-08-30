import { Component, ViewEncapsulation, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppHeaderComponent {
  loggedUser: User | null = null
  expanded: boolean = false
  showLogin: boolean = false
  pageLayout: string = 'home'
  private router = inject(Router)
  private routerSub = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd))
    .subscribe(event => this.updateLayout(event as NavigationEnd))

  constructor(private userService: UserService) {
    this.loggedUser = userService.getLoggedInUser()
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe()
  }

  toggleLogin(showLogin: boolean = !this.showLogin) {
    this.showLogin = showLogin
    document.body.style.overflow = this.showLogin ? 'hidden' : 'auto'
  }

  onLogout() {
    this.userService.logout()
    location.reload()
  }

  updateLayout(event: NavigationEnd) {
    const currPage = this.pageLayout
    if (event.url.startsWith('/stay')) {
      this.pageLayout = 'details'
    } else if (event.url.startsWith('/book')) {
      this.pageLayout = 'book'
    } else {
      this.pageLayout = 'home'
    }
    if (currPage !== this.pageLayout) {
      window.scrollTo(0, 0)
    }
  }
}
