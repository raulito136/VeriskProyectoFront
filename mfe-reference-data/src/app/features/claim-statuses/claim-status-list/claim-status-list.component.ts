import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';

@Component({
  selector: 'app-claim-status-list',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './claim-status-list.component.html',
  styleUrl: './claim-status-list.component.css'
})
export class ClaimStatusListComponent {
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
}
