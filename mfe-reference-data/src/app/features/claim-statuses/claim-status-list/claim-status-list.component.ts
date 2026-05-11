import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';

@Component({
    selector: 'app-claim-status-list',
    imports: [CommonModule, RouterLink, SwitchComponent],
    templateUrl: './claim-status-list.component.html',
    styleUrl: './claim-status-list.component.css'
})
export class ClaimStatusListComponent {
  errores = signal<string[]>([]);
  showAll = signal<boolean>(false);
  
  private claimService = inject(ClaimStatusService);

  claimsStatuses = signal<ClaimStatus[]>([]);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.errores.set([]);
    this.claimService.getClaimStatuses(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.claimsStatuses.set(apiResponse.data);
      },
      error: (err)=>{
        this.errores.set([err]);
      }
    })
  }

  onShowAllChange(value: boolean) {
    console.log('Switch cambiado a:', value, 'haciendo llamada a la API...');
    this.showAll.set(value);
    this.loadAll();
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
}