import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.css']
})
export class AssetAddComponent implements OnInit {

  constructor( private assetservice: AssetService,private router:Router,private toastservice:ToasterService) { }
   //validations
   addAssetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(5)]),
    category_id: new FormControl('', [Validators.required]),
    manufacturer_id: new FormControl('', [Validators.required]),
    model_id: new FormControl('', [Validators.required]),
    serial_no: new FormControl('', [Validators.required,]),
    employee_id: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    group_in_charge: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    audit_status: new FormControl('', [Validators.required]),
       

  })

  ngOnInit(): void {
  }
  addAsset(){
    if (this.addAssetForm.valid){
   this.assetservice.createAsset(this.addAssetForm.value).subscribe((data) => {
     this.toastservice.showSuccess("Asset Added Successfully")
     this.router.navigate(['dashboard/assets'])
   
   },
     error => {
       console.log(error);
       this.toastservice.showSuccess("Sorry cannot add asset at this moment")
     });
 }
 else{
   this.toastservice.showSuccess("All Fields are required")
   alert("All Fields are required")
   
 }
}
}
