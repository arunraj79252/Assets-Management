import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AssetCategoryService } from '../../asset-category-service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  constructor(private fb: FormBuilder, private zone: NgZone, private router: Router,private categoryservice: AssetCategoryService,private toastService:ToasterService) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }
  
  addCategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    status:['',[Validators.required]],
    attribute: this.fb.array([]) ,  
    
  });
  attribute() : FormArray {  
    return this.addCategoryForm.get("attribute") as FormArray  
  }

  newQuantity(): FormGroup {  
    return this.fb.group({  
      name: '',
      required_status: '',  
    })  
  }  

  addAttribute() {
    this.attribute().push(this.newQuantity());  
    
  }
  removeAttribute(i: number) {
    this.attribute().removeAt(i);  
  }

  // Getter method to access formcontrols
  get name() {
    return this.addCategoryForm.get('name');
  }
  get attrib() {
    return this.addCategoryForm.get('attrib')
  }

  get status(){
    return this.addCategoryForm.get('status');
  }
  get aStatus(){
    return this.addCategoryForm.get('aStatus');

  }
 // test =[{category_attribute_id: 6, category_id: 45 ,name:"wired",reqired_status:''}];

  onSubmit() {
    
  if(this.addCategoryForm.valid){
     this.categoryservice.addCategory(this.addCategoryForm.value).subscribe((data: any)=>{
       console.log(data);
       this.toastService.showSuccess("Category Added");
      },
        ( error: any)=>{
        console.log(error); 
        this.toastService.showError("Error in new Entry")
      });
    }else{
      this.toastService.showError("All fields are mandatory");
    }
    //  this.categoryservice.addAttribute(this.test).subscribe(data=>{
    //   console.log("attrib data--",data);
    // })

  }
  closeToaster(){
    this.zone.run(() => { this.router.navigate(['/dashboard/category/add']) })
  }
    
}
