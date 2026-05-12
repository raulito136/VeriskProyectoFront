import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from '../../../services/claim.service';
import { FormComponent, InputComponent, ButtonComponent, DatepickerComponent } from '@policy-system/ui';

@Component({
  selector: 'app-claim-form',
  imports: [ReactiveFormsModule, FormComponent, InputComponent, ButtonComponent, DatepickerComponent],
  templateUrl: './claim-form.component.html'
})
export class ClaimFormComponent {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimService);
  private router = inject(Router);

  claimForm = this.fb.group({
    policyNumber: ['', Validators.required],
    claimDate: ['', Validators.required],
    amount: ['', Validators.required],
    description: ['', Validators.required]
  });

  guardarDatos() {
    if (this.claimForm.valid) {
      this.claimService.createClaim(this.claimForm.value).subscribe({
        next: () => this.router.navigate(['..']),
        error: (err) => alert('Error: ' + JSON.stringify(err.error.errors))
      });
    }
  }

  cancelar() {
    this.router.navigate(['..']);
  }
}