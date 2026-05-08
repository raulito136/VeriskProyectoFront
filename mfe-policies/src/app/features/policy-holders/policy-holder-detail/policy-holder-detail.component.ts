import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyHolderService } from '../../../services/policy-holder.service';
import { PolicyHolder } from '../../../models/policy-holder.model';
import { CardComponent, ButtonComponent, LoaderComponent, TableComponent } from '@policy-system/ui';

@Component({
  selector: 'app-policy-holder-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, LoaderComponent, TableComponent],
  templateUrl: './policy-holder-detail.component.html',
  styleUrl: './policy-holder-detail.component.css',
})
export class PolicyHolderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(PolicyHolderService);

  policyHolder?: PolicyHolder;
  isLoading = false;
  errorMessages: string[] = [];

  policyColumns = [
    { key: 'policyNumber', label: 'Policy Number' },
    { key: 'policyTypeCode', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'startDate', label: 'Start Date' }
  ];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadPolicyHolder(+idParam);
    }
  }

  loadPolicyHolder(id: number): void {
    this.isLoading = true;
    this.service.getPolicyHolderById(id).subscribe({
      next: (response) => {
        this.policyHolder = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessages = err.error?.errors?.map((e: any) => e.message) || ['Failed to load details.'];
        this.isLoading = false;
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/policy-holders']);
  }

  onEdit(): void {
    if (this.policyHolder) {
      this.router.navigate(['/policy-holders', this.policyHolder.id, 'edit']);
    }
  }

  onPolicySelect(row: any): void {
    this.router.navigate(['/policies', row.id]);
  }
}
