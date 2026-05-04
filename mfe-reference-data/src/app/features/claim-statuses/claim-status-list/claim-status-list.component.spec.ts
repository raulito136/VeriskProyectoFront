import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimStatusListComponent } from './claim-status-list.component';

describe('ClaimStatusListComponent', () => {
  let component: ClaimStatusListComponent;
  let fixture: ComponentFixture<ClaimStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimStatusListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClaimStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
