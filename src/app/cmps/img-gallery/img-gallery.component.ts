import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-gallery',
  templateUrl: './img-gallery.component.html',
  styleUrls: ['./img-gallery.component.scss']
})
export class ImgGalleryComponent {
  @Input() images!: string[]
  imgRefs: HTMLElement[] = []
  navRefs: HTMLElement[] = []
  idx = 0
  navStartIdx = 0
  upcomingIdx = 0

  onNext(ev: MouseEvent) {
    ev.stopPropagation()
    ev.preventDefault()
    const img = this.imgRefs[this.idx + 1]
    if (!img) return
    this.upcomingIdx = this.idx + 1
    img.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  onPrev(ev: MouseEvent) {
    ev.stopPropagation()
    ev.preventDefault()
    const img = this.imgRefs[this.idx -1]
    if (!img) return
    this.upcomingIdx = this.idx -1
    img.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  onScrollEnd(ev: any) {
    console.log(ev)
    const img = this.imgRefs[this.upcomingIdx]
    const imgPosX = img.getBoundingClientRect().left
    const maxMarginX = img.offsetWidth / 2
    const minPosX = img.offsetParent!.getBoundingClientRect().left - maxMarginX
    const maxPosX = img.offsetParent!.getBoundingClientRect().left + maxMarginX
    if (imgPosX <= maxPosX && imgPosX >= minPosX) {
      this.idx = this.upcomingIdx
      this.navStartIdx = this.getNavStart()
    }
  }

  getNavStart() {
    return Math.min(Math.max(this.idx - 2, 0), this.images.length - 5)
  }

  checkLarge(idx: number) {
    const distanceFromEdge = idx < this.images.length / 2 ? idx : (this.images.length - idx - 1)
    const nearEdge = this.navStartIdx === 0 || this.navStartIdx === this.images.length - 5
    if (nearEdge) {
      return distanceFromEdge < 3 || this.idx === idx
    } else {
      return this.navStartIdx < idx && Math.abs(this.navStartIdx + 2 - idx) <= 1
    }
  }

  checkMed(idx: number) {
    const distanceFromEdge = idx < this.images.length / 2 ? idx : (this.images.length - idx - 1)
    const nearEdge = this.navStartIdx === 0 || this.navStartIdx === this.images.length - 5
    if (nearEdge) {
      return distanceFromEdge === 3
    } else {
      return this.navStartIdx === idx || this.navStartIdx === idx - 4
    }
  }
}
