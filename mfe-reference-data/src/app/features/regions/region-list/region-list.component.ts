import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionService } from 'mfe-reference-data/src/app/services/region.service';
import { Region } from 'mfe-reference-data/src/app/models/region.model';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';

@Component({
    selector: 'app-region-list',
    imports: [CommonModule, RouterLink, SwitchComponent],
    templateUrl: './region-list.component.html',
    styleUrl: './region-list.component.css'})
export class RegionListComponent {
  private status=false;
  private regionService=inject(RegionService);
  regions=signal<Region[]>([]);

  public errores= signal<string[]>([]);
  public showAll = signal<boolean>(false);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.regionService.getRegions(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.regions.set(apiResponse.data);
      },
      error:(err)=>{
        console.error('Error fetching regions:', err);
        this.errores.set([err]);
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
        this.errores.set([err]);
      }
    })
  }
  
  onShowAllChange(value: boolean) {
    console.log('Switch cambiado a:', value, 'haciendo llamada a la API...');
    this.showAll.set(value);
    this.loadAll();
  }
}