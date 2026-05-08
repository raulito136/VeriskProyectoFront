import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimComment } from '../../../models/claim-comment.model';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule, CommentFormComponent],
  template: `
    <div *ngFor="let c of comments">
      <strong>{{ c.authorName }}</strong> ({{ c.createdAt }}): {{ c.comment }}
    </div>
    <app-comment-form [claimId]="claimId"></app-comment-form>
  `
})
export class CommentListComponent {
  @Input() comments: ClaimComment[] = [];
  @Input() claimId!: number;
}