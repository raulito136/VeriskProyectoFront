import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClaimService } from '../../../services/claim.service';
import { Claim } from '../../../models/claim.model';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { AuditTrailComponent } from '../../audit/audit-trail/audit-trail.component';
import { CardComponent, TabsComponent, ButtonComponent } from '@policy-system/ui';

@Component({
  selector: 'app-claim-detail',
  imports: [CommonModule, RouterModule, CommentListComponent, AuditTrailComponent, CardComponent, TabsComponent, ButtonComponent],
  templateUrl: './claim-detail.component.html'
})
export class ClaimDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private claimService = inject(ClaimService);
  currentTab: string = 'Comments';
  claim = signal<Claim | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.claimService.getClaimById(id).subscribe(res => this.claim.set(res.data));
  }
}