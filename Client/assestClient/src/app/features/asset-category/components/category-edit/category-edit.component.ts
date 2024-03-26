import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AssetCategoryService } from '../../asset-category-service';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryData: any={};

  constructor(private fb: FormBuilder,private router:Router,private dataService:ShareDataService,private categoryService:AssetCategoryService,private toastService:ToasterService, private zone: NgZone) { }

  ngOnInit(): void {
    this.getData();
  }

  editCategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    status: ['', [Validators.required]],
    category_id:['']
  })

//getters
get name(){
  return this.editCategoryForm.get('name');
}
get status(){
  return this.editCategoryForm.get('status');
}

getData(){
  this.dataService.data.subscribe(response=>{
    this.categoryData=response;
    console.log(this.categoryData);
    
    this.editCategoryForm.patchValue({
      name:this.categoryData.name,
      status:this.categoryData.status,
      category_id:this.categoryData.category_id
    })
  })
}


onSubmit(){
  if(this.editCategoryForm.valid){
    this.categoryService.editCategory(this.editCategoryForm.value).subscribe((response: any)=>{
      console.log(response);
      this.toastService.showSuccess("Category Updated");
    },
      ( error: any)=>{
      console.log(error); 
      this.toastService.showError("Error in updation")
    });
  }else{
    this.toastService.showError("All fields are mandatory");
  }
  
}
closeToaster(){
  this.zone.run(() => { this.router.navigate(['/dashboard/category/edit']) })
}
}
