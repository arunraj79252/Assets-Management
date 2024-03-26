import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  assetid: any
  asset: any

  constructor(private route: ActivatedRoute, private assetservice: AssetService,private router:Router,private toastservice:ToasterService) { }

  ngOnInit(): void {
    
    this.assetid = this.route.snapshot.paramMap.get('id');
    this.loadAssets()

  }
  //validations
    editAssetForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(5)]),
    category_id: new FormControl('', [Validators.required]),
    manufacturer_id: new FormControl('', [Validators.required]),
    model_id: new FormControl('', [Validators.required]),
    serial_no: new FormControl('', [Validators.required]),
    employee_id: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    group_in_charge: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [Validators.required]),
    audit_status: new FormControl('', [Validators.required]),
    last_audited_date: new FormControl('', [Validators.required]),
   

  })
  loadAssets() {

    this.assetservice.listAssetById(this.assetid).subscribe((data) => {
      this.asset = data;
      this.editAssetForm.patchValue(this.asset)
    
    },
      error => {
        console.log(error);
      });
  }
  editAsset(){
     if (this.editAssetForm.valid){
    this.assetservice.editAsset(this.asset.asset_id,this.editAssetForm.value).subscribe((data) => {
      this.toastservice.showSuccess("Asset Updated")
      this.router.navigate(['dashboard/assets'])
    
    },
      error => {
        console.log(error);
        this.toastservice.showSuccess("Cannot update asset")
      });
  }
  else{
    this.toastservice.showSuccess("All Fields are required")
    alert("All Fields are required")
    
  }
}
  
}
