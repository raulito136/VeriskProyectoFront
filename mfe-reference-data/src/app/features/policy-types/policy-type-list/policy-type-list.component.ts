import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PolicyType } from 'mfe-reference-data/src/app/models/policy-type.model';
import { PolicyTypeService } from 'mfe-reference-data/src/app/services/policy-type.service';

@Component({
  selector: 'app-policy-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-type-list.component.html',
  styleUrl: './policy-type-list.component.css',
})
export class PolicyTypeListComponent {
  private status=false;
  private policyService=inject(PolicyTypeService);
  policyTypes=signal<PolicyType[]>([]);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.policyService.getPolicyTypes().subscribe({
      next:(apiResponse)=>{
        this.policyTypes.set(apiResponse.data);
      },
      error:(err)=>{
        console.error('Error fetching policy types:', err);
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
      }
    })
  }

    changeStatus(){
    this.status=!this.status;
  }
}