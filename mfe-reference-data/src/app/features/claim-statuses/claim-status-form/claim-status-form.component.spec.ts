import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimStatusFormComponent } from './claim-status-form.component';

describe('ClaimStatusFormComponent', () => {
  let component: ClaimStatusFormComponent;
  let fixture: ComponentFixture<ClaimStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimStatusFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
