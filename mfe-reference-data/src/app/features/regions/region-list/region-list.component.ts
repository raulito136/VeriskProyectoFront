import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionService } from 'mfe-reference-data/src/app/services/region.service';
import { Region } from 'mfe-reference-data/src/app/models/region.model';

@Component({
  selector: 'app-region-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.css',
})
export class RegionListComponent {
  private regionService=inject(RegionService);
  regions=signal<Region[]>([]);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.regionService.getRegions().subscribe({
      next:(apiResponse)=>{
        this.regions.set(apiResponse.data);
      },
      error:(err)=>{
        console.error('Error fetching regions:', err);
      }
    })
  }
}
