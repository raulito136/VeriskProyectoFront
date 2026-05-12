import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionService } from 'mfe-reference-data/src/app/services/region.service';
import { Region } from 'mfe-reference-data/src/app/models/region.model';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';
import { LoaderComponent } from 'libs/ui/src/lib/loader/loader.component';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';

@Component({
    selector: 'app-region-list',
    imports: [CommonModule, RouterLink, SwitchComponent, LoaderComponent, ButtonComponent],
    templateUrl: './region-list.component.html',
    styleUrl: './region-list.component.css'})
export class RegionListComponent {
  private status=false;
  private regionService=inject(RegionService);
  regions = signal<Region[]>([]);
  loading = signal<boolean>(true);

  public errores= signal<string[]>([]);
  public showAll = signal<boolean>(false);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.errores.set([]);
    this.loading.set(true);
    this.regionService.getRegions(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.regions.set(apiResponse.data);
        this.loading.set(false);
      },
      error:(err)=>{
        console.error('Error fetching regions:', err);
        this.errores.set([err]);
        this.loading.set(false);
      }
    })
  }

  delete(id:number){
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este tipo de póliza?');

  if (!confirmed) return;
    this.errores.set([]);
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