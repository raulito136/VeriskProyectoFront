import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@policy-system/ui';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {}
