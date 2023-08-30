import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-svg',
  templateUrl: './my-svg.component.html',
  styleUrls: ['./my-svg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MySvgComponent {
  size: string = '12px'
  margin: string = '0'

  @Input() iconName!: string
  @Input() iconSize: string | number = 12
  @Input() marginSize: string | number = 0

  ngOnInit() {
    this.size = (typeof(this.iconSize) === 'string') ? this.iconSize : (this.iconSize + 'px')
    this.margin = (typeof(this.marginSize) === 'string') ? this.marginSize : (this.marginSize + 'px')
  }

}
