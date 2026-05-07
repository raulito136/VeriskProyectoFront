import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageTypeService } from 'mfe-reference-data/src/app/services/coverage-type.service';
import { CoverageType } from 'mfe-reference-data/src/app/models/coverage-type.model';

@Component({
    selector: 'app-coverage-type-form',
    imports: [CommonModule],
    templateUrl: './coverage-type-form.component.html',
    styleUrl: './coverage-type-form.component.css'
})
export class CoverageTypeFormComponent {
  private status=false;
  private coverageService= inject(CoverageTypeService);

  submit(item:CoverageType){
    if(item.id){
      this.coverageService.updateCoverageType(item.id,item).subscribe({
        next:(apiResponse)=>{
          console.log("Coverage Type updated successfully:", apiResponse);
        },
        error:(err)=>{
          console.error("Error updating coverage type:", err);
        }
      })
    }else{
      this.coverageService.createCoverageType(item).subscribe({
        next:(apiResponse)=>{
          console.log("Coverage Type created successfully:", apiResponse);
        },
        error:(err)=>{
          console.error("Error creating coverage type:", err);
        }
      })
    }
  }

    changeStatus(){
    this.status=!this.status;
  }
}
