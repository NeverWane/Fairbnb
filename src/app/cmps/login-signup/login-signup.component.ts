import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription, take } from 'rxjs'
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
  email = new FormControl('', [Validators.required, Validators.email])
  firstName = new FormControl('', [Validators.required])
  lastName = new FormControl('', [Validators.required])
  password = new FormControl('', [Validators.required])
  currStage: string = 'email'
  @Output() close = new EventEmitter
  subscription!: Subscription

  constructor(private userService: UserService) { }

  stopPropagation(ev: MouseEvent) {
    ev.stopPropagation()
  }

  checkEmail() {
    if (!this.email) return
    this.userService.users$
      .pipe(take(1))
      .subscribe((users) => {
        const user = users?.find(user => user.email === this.email.value)
        if (user) {
          this.currStage = 'password'
        } else {
          this.currStage = 'signup'
        }
      })
  }

  checkPassword() {
    this.userService.users$
      .pipe(take(1))
      .subscribe((users) => {
        const user = users?.find(user => user.email === this.email.value && user.password === this.password.value)
        if (user) {
          this.userService.login(user)
          location.reload()
        } else {
          console.log('Incorrect password')
        }
        this.password.reset('')
      })
  }

  async onSignUp() {
    if (!(this.email.value && this.password.value && this.firstName.value && this.lastName.value)) return null
    let newUser = this.userService.getEmptyUser() as Partial<User>
    newUser.email = this.email.value
    newUser.password = this.password.value
    newUser.fullname = (this.firstName.value + ' ' + this.lastName.value)
    newUser.imgUrl = ''
    newUser.orders = []
    newUser.stays = []
    return this.userService.save(newUser as User)
  }

  onClose() {
    this.email.reset('')
    this.password.reset('')
    this.firstName.reset('')
    this.lastName.reset('')
    this.currStage = 'email'
    this.close.emit()
  }
}
