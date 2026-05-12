import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageTypeService } from 'mfe-reference-data/src/app/services/coverage-type.service';
import { CoverageType } from 'mfe-reference-data/src/app/models/coverage-type.model';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';
import { LoaderComponent } from 'libs/ui/src/lib/loader/loader.component';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';


@Component({
    selector: 'app-coverage-type-list',
    imports: [CommonModule, RouterLink, SwitchComponent, LoaderComponent, ButtonComponent],
    templateUrl: './coverage-type-list.component.html',
    styleUrl: './coverage-type-list.component.css'
})
export class CoverageTypeListComponent {
  private coverageService=inject(CoverageTypeService);
  coverageTypes = signal<CoverageType[]>([]);
  loading = signal<boolean>(true);

  errores = signal<string[]>([]);

  showAll = signal<boolean>(false);

  ngOnInit(){
      this.loadAll();
  }

  loadAll(){
    this.errores.set([]);
    this.loading.set(true);
    this.coverageService.getCoverageTypes(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.coverageTypes.set(apiResponse.data);
        this.loading.set(false);
      },
      error: (err)=>{
        this.errores.set([err]);
        console.error('Error fetching coverage types:', err);
        this.loading.set(false);
      }
    })
  }

  onShowAllChange(value: boolean) {
    console.log('Switch cambiado a:', value, 'haciendo llamada a la API...');
    this.showAll.set(value);
    this.loadAll();
  }

  delete(id:number){
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este tipo de póliza?');

  if (!confirmed) return;
    this.errores.set([]);
    this.coverageService.deleteCoverageType(id).subscribe({
      next:(apiResponse)=>{
        console.log("Coverage Type deleted successfully:", apiResponse);
        this.loadAll();
      },
      error:(err)=>{
        this.errores.set([err]);
        console.error("Error deleting coverage type:", err);
      }
    })
  }
}