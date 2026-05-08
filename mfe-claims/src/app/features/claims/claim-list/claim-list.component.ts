import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Añadimos Router para navegar al hacer clic
import { ClaimService } from '../../../services/claim.service';
// 1. Importa los componentes de UI:
import { TableComponent, ButtonComponent, LoaderComponent } from '@policy-system/ui';

@Component({
  selector: 'app-claim-list',
  // 2. Agrégalos al array 'imports':
  imports: [CommonModule, RouterModule, TableComponent, ButtonComponent, LoaderComponent],
  templateUrl: './claim-list.component.html'
})
export class ClaimListComponent implements OnInit {
  private claimService = inject(ClaimService);
  private router = inject(Router);

  claimsList = signal<any[]>([]);
  loading = signal<boolean>(true); // Útil para el Loader

  // 3. Define las columnas que espera tu <lib-table>
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

  // 4. Navegación cuando el usuario hace clic en una fila de la tabla
  irAlDetalle(fila: any) {
    this.router.navigate([fila.id]);
  }
}