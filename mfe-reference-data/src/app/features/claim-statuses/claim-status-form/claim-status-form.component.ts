import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';

@Component({
    selector: 'app-claim-status-form',
    imports: [CommonModule],
    templateUrl: './claim-status-form.component.html',
    styleUrl: './claim-status-form.component.css'
})
export class ClaimStatusFormComponent {
  private claimService=inject(ClaimStatusService);

  submit(item:ClaimStatus){

    if(item.id){
    this.claimService.createClaimStatus(item).subscribe({
      next:(apiResponse)=>{
        console.log('Claim status created successfully:', apiResponse);
      },
      error: (err)=>{
        console.error('Error creating claim status:', err);
      }
    })
  }else{
    this.claimService.updateClaimStatus(item.id,item).subscribe({
      next:(apiResponse)=>{
        console.log("Claim status updated successfully:", apiResponse);
      },
      error: (err)=>{
        console.error('Error updating claim status:', err);
      }
    })
  }
}
}
