import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';


@Directive({
  selector: '[click.stop]'
})
export class ClickStopDirective {
  @Output('click.stop') clickStop = new EventEmitter()
  constructor() { }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
      ev.stopPropagation()
      this.clickStop.emit(ev)
  }
}

@Directive({
  selector: '[click.prevent]'
})
export class ClickPreventDirective {
  @Output('click.prevent') clickPrevent = new EventEmitter()
  constructor() { }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
      ev.preventDefault()
      this.clickPrevent.emit(ev)
  }
}

@Directive({
  selector: '[click.self]'
})
export class ClickSelfDirective {
  @Output('click.self') clickSelf = new EventEmitter()
  constructor(private ref: ElementRef) { }

  @HostListener('click', ['$event'])
  onClick(ev: MouseEvent) {
      if (ev.target === this.ref.nativeElement)
      this.clickSelf.emit(ev)
  }
}

@Directive({
  selector: '[click.outside]'
})
export class ClickOutsideDirective {
  @Output('click.outside') clickOutside = new EventEmitter()
  constructor(private ref: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(target: HTMLElement) {
      if (!this.ref.nativeElement.contains(target))
      this.clickOutside.emit()
  }
}