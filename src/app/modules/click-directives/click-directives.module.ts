import { NgModule } from '@angular/core';
import { ClickOutsideDirective, ClickStopDirective } from 'src/app/directives/clicks.directive';

@NgModule({
  imports: [],
  declarations: [ClickStopDirective, ClickOutsideDirective],
  exports: [ClickStopDirective, ClickOutsideDirective]
})
export class ClickDirectives { }