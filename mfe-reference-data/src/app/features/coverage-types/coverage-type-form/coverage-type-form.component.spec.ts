import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoverageTypeFormComponent } from './coverage-type-form.component';

describe('CoverageTypeFormComponent', () => {
  let component: CoverageTypeFormComponent;
  let fixture: ComponentFixture<CoverageTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverageTypeFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoverageTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
