import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageTypeService } from 'mfe-reference-data/src/app/services/coverage-type.service';
import { CoverageType } from 'mfe-reference-data/src/app/models/coverage-type.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-coverage-type-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coverage-type-list.component.html',
  styleUrl: './coverage-type-list.component.css',
})
export class CoverageTypeListComponent {
  private coverageService=inject(CoverageTypeService);
  coverageTypes=signal<CoverageType[]>([]);


  ngOnInit(){
      this.loadAll();
  }

  loadAll(){
    this.coverageService.getCoverageTypes().subscribe({
      next:(apiResponse)=>{
        this.coverageTypes.set(apiResponse.data);
      },
      error: (err)=>{
        console.error('Error fetching coverage types:', err);
      }
    })
  }

  delete(id:number){
    this.coverageService.deleteCoverageType(id).subscribe({
      next:(apiResponse)=>{
        console.log("Coverage Type deleted successfully:", apiResponse);
        this.loadAll();
      },
      error:(err)=>{
        console.error("Error deleting coverage type:", err);
      }
    })
  }
}