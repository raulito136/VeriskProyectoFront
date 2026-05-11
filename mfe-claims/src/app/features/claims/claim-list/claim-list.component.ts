import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClaimService } from '../../../services/claim.service';
import { TableComponent, ButtonComponent, LoaderComponent } from '@policy-system/ui';

@Component({
  selector: 'app-claim-list',
  imports: [CommonModule, RouterModule, TableComponent, ButtonComponent, LoaderComponent],
  templateUrl: './claim-list.component.html'
})
export class ClaimListComponent implements OnInit {
  private claimService = inject(ClaimService);
  private router = inject(Router);

  claimsList = signal<any[]>([]);
  loading = signal<boolean>(true);

  tableColumns = [
    { key: 'claimNumber', label: 'Claim Number' },
    { key: 'policyNumber', label: 'Policy' },
    { key: 'statusCode', label: 'Status' }
  ];

  ngOnInit() {
    this.claimService.getAllClaims().subscribe(res => {
      this.claimsList.set(res.data);
      this.loading.set(false);
    });
  }

  irAlDetalle(fila: any) {
    this.router.navigate([fila.id]);
  }
}