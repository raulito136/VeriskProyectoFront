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
  private status=false;
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

  delete(id:number){
    this.regionService.deleteRegion(id).subscribe({
      next:()=>{
        console.log('Region deleted successfully');
        this.loadAll();
      },
      error:(err)=>{
        console.error('Error deleting region:', err);
      }
    })
  }
    changeStatus(){
    this.status=!this.status;
  }
}