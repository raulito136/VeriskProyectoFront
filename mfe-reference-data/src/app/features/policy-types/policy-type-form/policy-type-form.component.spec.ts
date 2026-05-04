import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyTypeFormComponent } from './policy-type-form.component';

describe('PolicyTypeFormComponent', () => {
  let component: PolicyTypeFormComponent;
  let fixture: ComponentFixture<PolicyTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyTypeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
