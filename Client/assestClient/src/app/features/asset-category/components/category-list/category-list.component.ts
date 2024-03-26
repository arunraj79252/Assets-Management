import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AssetCategoryService } from '../../asset-category-service';
import { ShareDataService } from '../../share-data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:any={};
  categoryAttrib: any={};
  constructor(private categoryService:AssetCategoryService,private toastservice:ToasterService,private modalService:NgbModal,private router: Router,private dataService:ShareDataService) { }

  ngOnInit(): void {
    this.listCategory();
  }

listCategory(){
  this.categoryService.listAssetCategories().subscribe(data=>{
    this.categories=data;
    console.log(this.categories);  
  },
  error=>{
    console.log(error);  
  });
  
}

deleteCategory(id:any){
  this.categoryService.deleteCategory(id).subscribe(data=>{
    console.log("Delete Successfull");
    this.listCategory();
    this.toastservice.showSuccess("Record deleted "+ id);
  })
}

confirmDeleteModal(content:any){
  this.modalService.open(content, { centered: true });  
}

goToEditPage(category:any){
  
  this.dataService.sendData(category);
}
}
