import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { StayIndexComponent } from './pages/stay-index/stay-index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StayListComponent } from './cmps/stay-list/stay-list.component';
import { StayPreviewComponent } from './cmps/stay-preview/stay-preview.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ImgGalleryComponent } from './cmps/img-gallery/img-gallery.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RateAndRevComponent } from './cmps/rate-and-rev/rate-and-rev.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { LoginSignupComponent } from './cmps/login-signup/login-signup.component';
import { FancyBtnComponent } from './cmps/fancy-btn/fancy-btn.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StayDetailsComponent } from './pages/stay-details/stay-details.component';
import { svgs } from '../assets/data/svgs';
import { MySvgComponent } from './cmps/my-svg/my-svg.component';
import { StayReviewsComponent } from './cmps/stay-reviews/stay-reviews.component';
import { OrderComponent } from './cmps/order/order.component';
import { GuestPickerComponent } from './cmps/guest-picker/guest-picker.component';
import { PluralPipe } from './pipes/plural.pipe';
import { GuestsPipe } from './pipes/guests.pipe';
import { LocalizePipe } from './pipes/localize.pipe';
import { DatePickerComponent } from './cmps/date-picker/date-picker.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StayBookComponent } from './pages/stay-book/stay-book.component';

@NgModule({
  declarations: [
    AppComponent,
    StayIndexComponent,
    StayListComponent,
    StayPreviewComponent,
    AppHeaderComponent,
    ImgGalleryComponent,
    RateAndRevComponent,
    LoginSignupComponent,
    FancyBtnComponent,
    StayDetailsComponent,
    MySvgComponent,
    StayReviewsComponent,
    OrderComponent,
    GuestPickerComponent,
    PluralPipe,
    GuestsPipe,
    LocalizePipe,
    DatePickerComponent,
    StayBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const key in svgs) {
      try {
        iconRegistry.addSvgIconLiteral(`${key}`, sanitizer.bypassSecurityTrustHtml(svgs[key]));
      } catch (err) {
        console.log(key)
        throw err
      }
    }
  }
}
