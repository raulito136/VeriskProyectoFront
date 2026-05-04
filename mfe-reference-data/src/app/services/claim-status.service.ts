import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClaimStatus } from '../models/claim-status.model';
import { ApiResponse, PagedResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimStatusService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5003/api/claim-statuses'; 

  getClaimStatuses() {
    return this.http.get<PagedResponse<ClaimStatus>>(this.apiUrl);
  }

  getClaimStatusById(id: number) {
    return this.http.get<ApiResponse<ClaimStatus>>(`${this.apiUrl}/${id}`);
  }

  getClaimStatusByCode(code: string) {
    return this.http.get<ApiResponse<ClaimStatus>>(`${this.apiUrl}/by-code/${code}`);
  }

  createClaimStatus(claimStatus: ClaimStatus) {
    return this.http.post<ApiResponse<ClaimStatus>>(this.apiUrl, claimStatus);
  }

  updateClaimStatus(id: number, claimStatus: ClaimStatus) {
    return this.http.put<ApiResponse<ClaimStatus>>(`${this.apiUrl}/${id}`, claimStatus);
  }

  deleteClaimStatus(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}