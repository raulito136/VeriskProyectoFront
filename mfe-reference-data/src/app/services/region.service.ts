import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Region } from '../models/region.model';
import { HtmlParser } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private http=inject(HttpClient);
  private apiUrl="http://localhost:5003/api/v1/regions";

  getRegions(){
    return this.http.get(this.apiUrl);
  }

  getRegionsById(id:number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createRegion(item:Region){
    return this.http.post(this.apiUrl,item);
  }

  updateRegion(id:number,item:Region){
    return this.http.put(`${this.apiUrl}/${id}`,item);
  }

  deleteRegion(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
