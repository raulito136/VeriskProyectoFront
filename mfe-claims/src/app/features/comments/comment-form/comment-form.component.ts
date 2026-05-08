import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClaimCommentService } from '../../../services/claim-comment.service';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="author" placeholder="Author">
    <input [(ngModel)]="text" placeholder="Comment">
    <button (click)="agregar()">Comment</button>
  `
})
export class CommentFormComponent {
  private commentService = inject(ClaimCommentService);
  @Input() claimId!: number;
  
  author = '';
  text = '';

  agregar() {
    this.commentService.addComment(this.claimId, this.author, this.text).subscribe(() => {
      alert('Comment added');
      location.reload(); // Forma rápida de refrescar la pantalla para ver el nuevo comentario
    });
  }
}