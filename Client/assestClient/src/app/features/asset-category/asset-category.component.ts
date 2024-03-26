
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { AssetCategoryService } from './asset-category-service';

@Component({
  selector: 'app-asset-category',
  templateUrl: './asset-category.component.html',
  styleUrls: ['./asset-category.component.css']
})


export class AssetCategoryComponent implements OnInit {
 
  constructor(private categoryService:AssetCategoryService,private toastservice:ToasterService,private modalService:NgbModal,private router: Router) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }
addCategory(){

}
}
