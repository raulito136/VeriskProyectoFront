import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyTypeService } from 'mfe-reference-data/src/app/services/policy-type.service';
import { PolicyType } from 'mfe-reference-data/src/app/models/policy-type.model';

@Component({
    selector: 'app-policy-type-form',
    imports: [CommonModule],
    templateUrl: './policy-type-form.component.html',
    styleUrl: './policy-type-form.component.css'
})
export class PolicyTypeFormComponent {
  private policyService= inject(PolicyTypeService);

  submit(item:PolicyType){
    if(item.id){
      this.policyService.createPolicyType(item).subscribe({
        next:(apiResponse)=>{
          console.log("Policy Type created successfully:", apiResponse);
        },
        error:(err)=>{
          console.error("Error creating policy type:", err);
        }
      })
    }else{
      this.policyService.updatePolicyType(item.id,item).subscribe({
        next:(apiResponse)=>{
          console.log("Policy Type updated successfully:", apiResponse);
        },
        error:(err)=>{
          console.error("Error updating policy type:", err);
        }
      })
    }
  }
}
