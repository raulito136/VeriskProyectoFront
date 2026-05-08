import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClaimStatusService } from 'mfe-reference-data/src/app/services/claim-status.service';
import { FormComponent } from 'libs/ui/src/lib/form/form.component';
import { InputComponent } from 'libs/ui/src/lib/input/input.component';
import { TextareaComponent } from 'libs/ui/src/lib/textarea/textarea.component';
import { ButtonComponent } from 'libs/ui/src/lib/button/button.component';
import { ClaimStatus } from 'mfe-reference-data/src/app/models/claim-status.model';

@Component({
  selector: 'app-claim-status-form',
  standalone: true,
  imports: [CommonModule, FormComponent, InputComponent, TextareaComponent, ButtonComponent, ReactiveFormsModule], 
  templateUrl: './claim-status-form.component.html',
  styleUrl: './claim-status-form.component.css'
})
export class ClaimStatusFormComponent implements OnInit {
  private claimService = inject(ClaimStatusService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public isEditMode = false;

  public myForm = this.fb.group({
    id: [null as number | null], 
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['']                 
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      
      this.isEditMode = true;
      this.claimService.getClaimStatusById(Number(id)).subscribe({
        next: (res) => {
          if (res.data) {
            this.myForm.patchValue({
              id: res.data.id,
              code: res.data.code,
              name: res.data.name,
              description: res.data.description
            });
          }
        },
        error: (err) => console.error('Error fetching claim status:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/reference-data/claim-statuses']);
  }

  onSubmitForm(event: Event) {
  if (this.myForm.invalid) return;

  const formValues = this.myForm.getRawValue();

  if (!this.isEditMode) {
    // 1. MODO CREAR: Construimos el objeto igual a CreateClaimStatusRequest (C#)
    const createPayload = {
      code: formValues.code ?? '',
      name: formValues.name ?? '',
      description: formValues.description ?? ''
    };

    // Es posible que el servicio de Angular te pida un tipo específico, 
    // pero a nivel de JSON, esto es lo que viaja.
    this.claimService.createClaimStatus(createPayload as any).subscribe({
      next: (res) => {
        console.log('Creado:', res);
        this.router.navigate(['/reference-data/claim-statuses']);
      },
      error: (err) => console.error(err)
    });

  } else {
    // 2. MODO EDITAR: Construimos el objeto igual a UpdateClaimStatusRequest (C#)
    // ¡OJO! Aquí NO incluimos el campo 'code' ni el 'id' dentro del cuerpo.
    const updatePayload = {
      name: formValues.name ?? '',
      description: formValues.description ?? '',
      isActive: true // Lo dejamos en true por defecto, o lo sacas del form si lo agregas después
    };

    // El ID se pasa en la URL (primer parámetro), y los datos en el body (segundo parámetro)
    this.claimService.updateClaimStatus(formValues.id!, updatePayload as any).subscribe({
      next: (res) => {
        console.log('Actualizado:', res);
        this.router.navigate(['/reference-data/claim-statuses']);
      },
      error: (err) => console.error(err)
    });
  }
}
}