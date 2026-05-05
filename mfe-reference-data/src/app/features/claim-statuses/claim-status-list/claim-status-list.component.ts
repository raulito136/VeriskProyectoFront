import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-claim-status-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './claim-status-list.component.html',
  styleUrl: './claim-status-list.component.css'
})
export class ClaimStatusListComponent {
  private status=false;
  private claimService=inject(ClaimStatusService);

  claimsStatuses= signal<ClaimStatus[]>([]);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.claimService.getClaimStatuses().subscribe({
      next:(apiResponse)=>{
        this.claimsStatuses.set(apiResponse.data);
      },
      error: (err)=>{
        console.error('Error fetching claim statuses:', err);
      }
    })
  }

  delete(id:number){
    this.claimService.deleteClaimStatus(id).subscribe({
      next:(apiResponse)=>{
        console.log('Claim status deleted successfully:', apiResponse);
        this.loadAll();
      },
      error: (err)=>{
        console.error('Error deleting claim status:', err);
      }
    })
  }
  
  changeStatus(){
    this.status=!this.status;
  }
}
