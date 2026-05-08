import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PolicyService } from '../../../services/policy.service';
import { Policy } from '../../../models/policy.model';
import { CardComponent, ButtonComponent, LoaderComponent } from '@policy-system/ui';

@Component({
  selector: 'app-policy-detail',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, LoaderComponent, CurrencyPipe, DatePipe],
  templateUrl: './policy-detail.component.html',
  styleUrl: './policy-detail.component.css',
})
export class PolicyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(PolicyService);

  policy?: Policy;
  isLoading = false;
  errorMessages: string[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.loadPolicy(+idParam);
    }
  }

  loadPolicy(id: number): void {
    this.isLoading = true;
    this.service.getPolicyById(id).subscribe({
      next: (response) => {
        this.policy = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessages = err.error?.errors?.map((e: any) => e.message) || ['Failed to load details.'];
        this.isLoading = false;
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/policies']);
  }

  onEdit(): void {
    if (this.policy) {
      this.router.navigate(['/policies', this.policy.id, 'edit']);
    }
  }

  onViewHolder(): void {
    if (this.policy) {
      this.router.navigate(['/policy-holders', this.policy.policyHolderId]);
    }
  }
}
