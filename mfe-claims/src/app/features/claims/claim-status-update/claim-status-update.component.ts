import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimService } from '../../../services/claim.service';

@Component({
  selector: 'app-claim-status-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-status-update.component.html'
})
export class ClaimStatusUpdateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private claimService = inject(ClaimService);
  
  claimId!: number;
  newStatus = 'UNDER_REVIEW';

  ngOnInit() {
    this.claimId = Number(this.route.snapshot.paramMap.get('id'));
  }

  actualizarEstado() {
    this.claimService.updateStatus(this.claimId, this.newStatus, 'AdminUser').subscribe({
      next: () => this.router.navigate(['..']),
      error: (err) => alert('Your backend rejected the transition: ' + JSON.stringify(err.error.errors))
    });
  }
}