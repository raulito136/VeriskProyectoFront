import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-claim-status-list',
    imports: [CommonModule, RouterLink
    ],
    templateUrl: './claim-status-list.component.html',
    styleUrl: './claim-status-list.component.css'
})
export class ClaimStatusListComponent {
  errores= signal<string[]>([]);
  private status=false;
  private claimService=inject(ClaimStatusService);

  claimsStatuses= signal<ClaimStatus[]>([]);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.errores.set([]);
    this.claimService.getClaimStatuses().subscribe({
      next:(apiResponse)=>{
        this.claimsStatuses.set(apiResponse.data);
      },
      error: (err)=>{
        this.errores.set([err]);
      }
    })
  }

  delete(id:number){
    this.errores.set([]);
    this.claimService.deleteClaimStatus(id).subscribe({
      next:(apiResponse)=>{
        this.loadAll();
      },
      error: (err)=>{
        this.errores.set([err]);
      }
    })
  }
  
  changeStatus(){
    this.status=!this.status;
  }
}