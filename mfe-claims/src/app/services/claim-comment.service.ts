import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimCommentService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5001/api/v1/claims';

  // Llama a tu [HttpPost("{id}/comments")] para enviar el CreateCommentRequest
  addComment(claimId: number, authorName: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${claimId}/comments`, { authorName, comment });
  }

  // Llama a tu [HttpDelete("{id}/comments/{commentId}")]
  deleteComment(claimId: number, commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${claimId}/comments/${commentId}`);
  }
}