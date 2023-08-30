import { Component, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'fancy-btn',
  templateUrl: './fancy-btn.component.html',
  styleUrls: ['./fancy-btn.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FancyBtnComponent {
  posX: number = 0
  posY: number = 0

  @Input() txt: string = ''
  @Input('iconName') icon: string = ''
  @Input() iconSize: number = 16

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.ref.detectChanges()
  }

  onHover(ev: MouseEvent) {
    this.posX = ev.offsetX
    this.posY = ev.offsetY
  }

  getContentWidth(width: number): string {
    return width + 'px'
  }
}
