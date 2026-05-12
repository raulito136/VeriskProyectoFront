import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PolicyType } from 'mfe-reference-data/src/app/models/policy-type.model';
import { PolicyTypeService } from 'mfe-reference-data/src/app/services/policy-type.service';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';
import { LoaderComponent } from 'libs/ui/src/lib/loader/loader.component';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';

@Component({
    selector: 'app-policy-type-list',
    imports: [CommonModule, RouterLink, SwitchComponent, LoaderComponent, ButtonComponent],
    templateUrl: './policy-type-list.component.html',
    styleUrl: './policy-type-list.component.css'
})
export class PolicyTypeListComponent {
  private status=false;
  private policyService=inject(PolicyTypeService);
  policyTypes = signal<PolicyType[]>([]);
  loading = signal<boolean>(true);
  public showAll = signal<boolean>(false);

  public errores = signal<string[]>([]);


  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.errores.set([]);
    this.loading.set(true);
    this.policyService.getPolicyTypes(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.policyTypes.set(apiResponse.data);
        this.loading.set(false);
      },
      error:(err)=>{
        console.error('Error fetching policy types:', err);
        this.errores.set([err]);
        this.loading.set(false);
      }
    })
  }

  delete(id: number) {
  const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este tipo de Policy?');

  if (!confirmed) return;

  this.errores.set([]);
  this.policyService.deletePolicyType(id).subscribe({
    next: (apiResponse) => {
      console.log("Policy Type deleted successfully:", apiResponse);
      this.loadAll();
    },
    error: (err) => {
      console.error("Error deleting policy type:", err);
      this.errores.set([err]);
    }
  });
}

  onShowAllChange(value: boolean) {
    console.log('Switch cambiado a:', value, 'haciendo llamada a la API...');
    this.showAll.set(value);
    this.loadAll();
  }
}