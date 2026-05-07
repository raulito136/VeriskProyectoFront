import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionService } from 'mfe-reference-data/src/app/services/region.service';
import { Region } from 'mfe-reference-data/src/app/models/region.model';

@Component({
    selector: 'app-region-form',
    imports: [CommonModule],
    templateUrl: './region-form.component.html',
    styleUrl: './region-form.component.css'
})
export class RegionFormComponent {
  private regionService=inject(RegionService);

  submit(item:Region){
    if(item.id){
      this.regionService.updateRegion(item.id,item).subscribe({
      next:(apiResponse)=>{
        console.log('Region updated successfully:', apiResponse);
      }, 
      error:(err)=>{
        console.error('Error updating region:', err);
      }
      })
    }else{
      this.regionService.createRegion(item).subscribe({
        next:(apiResponse)=>{
          console.log('Region created successfully:', apiResponse);
        },
        error:(err)=>{
          console.error('Error creating region:', err);
        }
      })
    }
  }
}
