import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
  DatepickerComponent,
  SwitchComponent,
  FormComponent,
  TableComponent,
  PaginationComponent,
  CardComponent,
  TimelineComponent,
  TimelineEvent,
  InlineErrorComponent,
  LoaderComponent,
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
    SwitchComponent,
    FormComponent,
    TableComponent,
    PaginationComponent,
    CardComponent,
    TimelineComponent,
    InlineErrorComponent,
    LoaderComponent,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  exampleError: string = 'This field is required and must contain valid data.';
  showGlobalLoader: boolean = false;
  
  triggerGlobalLoader() {
    this.showGlobalLoader = true;
    setTimeout(() => {
      this.showGlobalLoader = false;
    }, 2500);
  }
  
  testTimelineEvents: TimelineEvent[] = [
    { title: 'Claim Drafted', timestamp: 'Yesterday, 10:00 AM', description: 'Agent started drafting the claim.', status: 'default' },
    { title: 'Information Required', timestamp: 'Yesterday, 02:30 PM', description: 'Additional documents requested from customer.', status: 'warning' },
    { title: 'Documents Uploaded', timestamp: 'Today, 09:15 AM', status: 'info' },
    { title: 'Claim Approved', timestamp: 'Today, 11:45 AM', description: 'Claim successfully processed and approved.', status: 'success' },
  ];
  
  testTableCols = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];
  testTableData = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
  ];
  
  currentPage: number = 1;
  isCardLoading: boolean = true;
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
