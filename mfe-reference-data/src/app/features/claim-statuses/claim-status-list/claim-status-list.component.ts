import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';
import { RouterLink } from '@angular/router';
import { SwitchComponent } from 'libs/ui/src/lib/switch/switch.component';
import { LoaderComponent } from 'libs/ui/src/lib/loader/loader.component';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';

@Component({
    selector: 'app-claim-status-list',
    imports: [CommonModule, RouterLink, SwitchComponent, LoaderComponent, ButtonComponent, LoaderComponent],
    templateUrl: './claim-status-list.component.html',
    styleUrl: './claim-status-list.component.css'
})
export class ClaimStatusListComponent {
  errores = signal<string[]>([]);
  showAll = signal<boolean>(false);
  
  private claimService = inject(ClaimStatusService);

  claimsStatuses = signal<ClaimStatus[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(){
    this.loadAll();
  }

  loadAll(){
    this.loading.set(true);
    this.errores.set([]);
    this.claimService.getClaimStatuses(this.showAll()).subscribe({
      next:(apiResponse)=>{
        this.claimsStatuses.set(apiResponse.data);
        this.loading.set(false);
      },
      error: (err)=>{
        this.errores.set([err]);
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
      const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este tipo de Claim Status?');

  if (!confirmed) return;
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

  toggle(policy: ClaimStatus) {
      if (policy.isActive) {
        this.delete(policy.id);
      } else {
        this.errores.set([]);
        this.claimService.activateClaimStatus(policy.id).subscribe({
          next: (apiResponse) => {
            console.log("Claim Status activated successfully:", apiResponse);
            this.loadAll();
          },
          error: (err) => {
            console.error("Error activating claim status:", err);
            this.errores.set([err]);
          }
        });
      }
    }
}