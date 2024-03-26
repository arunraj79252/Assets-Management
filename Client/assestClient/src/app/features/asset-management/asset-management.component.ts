import { Component, OnInit } from '@angular/core';
import { AssetListComponent } from './components/asset-list/asset-list.component';
import { AssetService } from './components/asset.service';
import { AssetCategoryService } from '../asset-category/asset-category-service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asset-management',
  templateUrl: './asset-management.component.html',
  styleUrls: ['./asset-management.component.css']
})
export class AssetManagementComponent implements OnInit {
  categories: any
  userswithassets: any
  //
  categoryid: string = ''
  model: string = ''
  manufacturer: string = ''
  status: string = ''
  auditstatus: string = ''
  assignment: string = ''
  assignedto: string = ''
  assignedon: string = ''
  date: string = ''
  modelhelp = false
  manufacturerhelp = false

  constructor(private assetservice: AssetService, private categoryservice: AssetCategoryService) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById('date')).disabled = true;
    this.loadCategories()
    this.loadUsers()

  }

  loadCategories() {
    this.categoryservice.listAssetCategories().subscribe((data) => {
      this.categories = data;


    },
      error => {
        console.log(error);
      });
  }

  loadUsers() {
    this.assetservice.usersWithAssets().subscribe((data) => {
      this.userswithassets = data;


    },
      error => {
        console.log(error);
      });
  }
  setCategoryId() {

    this.categoryid = (<HTMLInputElement>document.getElementById('category')).value
  }

  setModel() {
    this.model = (<HTMLInputElement>document.getElementById('model')).value
    this.hideModelHelp()
  }

  setManufacturer() {
    this.manufacturer = (<HTMLInputElement>document.getElementById('manufacturer')).value
    this.hideManufacturerHelp()
  }

  setStatus() {

    this.status = (<HTMLInputElement>document.getElementById('status')).value
  }

  setAuditStatus() {

    this.auditstatus = (<HTMLInputElement>document.getElementById('auditstatus')).value
  }

  setAssignmentStatus() {
    this.assignment = (<HTMLInputElement>document.getElementById('assignment')).value
    if (this.assignment == '0') {
      (<HTMLInputElement>document.getElementById('assignedto')).value = "";
      (<HTMLInputElement>document.getElementById('assignedto')).disabled = true;
    }
    else {
      (<HTMLInputElement>document.getElementById('assignedto')).disabled = false;
    }
  }
  setAssignedTo() {
    this.assignedto = (<HTMLInputElement>document.getElementById('assignedto')).value
  }

  setAssignedOn() {
    this.assignedon = (<HTMLInputElement>document.getElementById('assignedon')).value
    if (this.assignedon == '0') {
      (<HTMLInputElement>document.getElementById('date')).value = "";
      (<HTMLInputElement>document.getElementById('date')).disabled = true;
      this.date = ""

    }
    else {
      (<HTMLInputElement>document.getElementById('date')).disabled = false;
    }
  }
  setDate() {
    this.date = (<HTMLInputElement>document.getElementById('date')).value
  }
  showModelHelp(){
    this.modelhelp=true
  }
  hideModelHelp(){
    this.modelhelp=false
  }
  showManufacturerHelp(){
    this.manufacturerhelp=true
  }
  hideManufacturerHelp(){
    this.manufacturerhelp=false
  }
}
