import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ClaimService {
  constructor(private http: HttpClient) {}
  // Conexión directa a tu Claims.Api (que corre en el 5001)
  private apiUrl = 'http://localhost:5001/api/v1/claims';

  // Llama a tu [HttpGet] de ClaimsController
  getAllClaims(page = 1, pageSize = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  // Llama a tu [HttpGet("{id}")] (el cual incluye comentarios y auditoría internamente)
  getClaimById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Llama a tu [HttpPost] enviando el CreateClaimRequest que espera C#
  createClaim(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  // Llama a tu [HttpPatch("{id}/status")] enviando el UpdateStatusRequest
  updateStatus(id: number, newStatus: string, changedBy: string): Observable<any> {
    // Fíjate que el body debe coincidir con lo que dice tu documentación de Swagger/C#
    return this.http.patch(`${this.apiUrl}/${id}/status`, { statusCode: newStatus, changedBy: changedBy });
  }
}