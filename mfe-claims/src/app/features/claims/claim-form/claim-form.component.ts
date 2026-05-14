import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from '../../../services/claim.service';
import { FormComponent, InputComponent, ButtonComponent, DatepickerComponent, ConfirmationComponent } from '@policy-system/ui';

@Component({
  selector: 'app-claim-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent, InputComponent, ButtonComponent, DatepickerComponent, ConfirmationComponent],
  templateUrl: './claim-form.component.html'
})
export class ClaimFormComponent {
  private fb = inject(FormBuilder);
  private claimService = inject(ClaimService);
  private router = inject(Router);
  
  showModal = signal(false);
  modalTitle = signal('');
  modalText = signal('');

  claimForm = this.fb.group({
    policyNumber: ['', Validators.required],
    claimDate: ['', Validators.required],
    amount: ['', Validators.required],
    description: ['', Validators.required]
  });

  guardarDatos() {
    if (this.claimForm.valid) {
      const data = {
        ...this.claimForm.value,
        amount: Number(this.claimForm.value.amount)
      };

      this.claimService.createClaim(data).subscribe({
        next: () => this.router.navigate(['claims']),
        error: (err) => {
          const errors = err.error?.errors || [{ message: 'Unknown error' }];
          this.showAlert('Error creating claim', errors.map((e: any) => e.message).join(', '));
        }
      });
    } else {
      this.showAlert('Validation Error', 'Please fill all required fields correctly.');
    }
  }

  showAlert(title: string, text: string) {
    this.modalTitle.set(title);
    this.modalText.set(text);
    this.showModal.set(true);
  }

  onModalClose() {
    this.showModal.set(false);
  }

  cancelar() {
    this.router.navigate(['claims']);
  }
}