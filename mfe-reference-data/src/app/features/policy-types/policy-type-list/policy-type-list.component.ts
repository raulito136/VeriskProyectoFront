import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PolicyType } from 'mfe-reference-data/src/app/models/policy-type.model';
import { PolicyTypeService } from 'mfe-reference-data/src/app/services/policy-type.service';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';

@Component({
    selector: 'app-policy-type-list',
    imports: [CommonModule, RouterLink, SwitchComponent],
    templateUrl: './policy-type-list.component.html',
    styleUrl: './policy-type-list.component.css'
})
export class PolicyTypeListComponent {
  private status=false;
  private policyService=inject(PolicyTypeService);
  policyTypes=signal<PolicyType[]>([]);
  public showAll = signal<boolean>(false);

  public errores = signal<string[]>([]);


  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.policyService.getPolicyTypes(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.policyTypes.set(apiResponse.data);
      },
      error:(err)=>{
        console.error('Error fetching policy types:', err);
        this.errores.set([err]);
      }
    })
  }

  delete(id:number){
    this.policyService.deletePolicyType(id).subscribe({
      next:(apiResponse)=>{
        console.log("Policy Type deleted successfully:", apiResponse);
        this.loadAll();
      },
      error:(err)=>{
        console.error("Error deleting policy type:", err);
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