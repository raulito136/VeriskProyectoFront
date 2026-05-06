import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  DatepickerComponent,
} from '@policy-system/ui';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    DatepickerComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  carsOptions = [
    { value: 'bwm', content: 'BMW' },
    { value: 'nissan', content: 'Nissan' },
    { value: 'peugeot', content: 'Peugeot' },
    { value: 'alpha-romeo', content: 'Alpha Romeo' },
    { value: 'ferrari', content: 'Ferrari' },
  ];

  claimDate: string = '';
  today: string = new Date().toISOString().split('T')[0]; // max claim date
}
