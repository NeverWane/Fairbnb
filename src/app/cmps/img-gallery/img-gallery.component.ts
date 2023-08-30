import { Component, Input } from '@angular/core';
import { Stay } from '../../models/stay.model';

@Component({
  selector: 'img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss']
})
export class ImgGalleryComponent {
  @Input() stay!: Stay
}
