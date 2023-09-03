import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[emitRef]'
})
export class EmitRefDirective {
  @Output() emitRef = new EventEmitter()
  constructor(private ref: ElementRef) {}
  
  ngOnInit() {
    this.emitRef.emit(this.ref.nativeElement)
  }
}
