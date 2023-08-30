import { Component, Input } from '@angular/core';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'stay-reviews',
  templateUrl: './stay-reviews.component.html',
  styleUrls: ['./stay-reviews.component.scss']
})
export class StayReviewsComponent {
  categories: string[] = ['Cleanliness', 'Accuracy', 'Communication', 'Location', 'Check-in', 'Value']
  @Input() reviews: Review[] | null = null

  score(cat: string) {
    if (!this.reviews) return 0
    let score = 0
    for (const review of this.reviews) {
      score += parseFloat('' + review.rate[cat])
    }
    return ((score * 100 / this.reviews.length) / 100).toFixed(1)
  }

  getReviews() {
    return this.reviews?.slice(0, 6)
  }

  isClamped(i: number) {
    return true
  }
}
