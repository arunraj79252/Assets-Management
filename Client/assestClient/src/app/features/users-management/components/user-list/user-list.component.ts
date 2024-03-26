import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetService } from 'src/app/features/asset-management/components/asset.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { ShareDataService } from '../../share-data.service';
import { UserManagementService } from '../../user-management.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  userData: any={};
  detailData: any={};

  p: number = 1;
  totalPages: any;
  pageNo: any;
  hasNextPage: boolean = true;
  count: any = 0;
  
  mode:any='user';
  assetId: any;
  //pagination attributes
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: this.p,
    totalItems: ""

  };

  constructor(private fb: FormBuilder, private userservice: UserManagementService, private router: Router, private dataService: ShareDataService,private toastservice:ToasterService,private modalService:NgbModal, private assetservice:AssetService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.listUsers("",1);
   
    //data send from asset module to assign asset to user

     if (this.assetservice.getMode() == "assettouser") {
        this.mode= this.assetservice.getMode();
        this.assetId=this.assetservice.getSelAssetId();    
     }

  }

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    employeeid: [''],
    email: [''],
    role: [''],
    status: ['']
  })

  //List Users
  listUsers(search: any,status:any) {
    this.userservice.listUsers(this.config.currentPage, this.config.itemsPerPage,search,status).subscribe((data: any) => {
      if (data) {
        this.count = data.totalCount
        this.config.totalItems = data.totalCount
        this.userData = data.users
        this.hasNextPage = data.hasNextPage
      }
    });
  }

  pageChanged(event: number) {
    this.config.currentPage = event;
    this.config.totalItems = this.count;
    this.listUsers("",1);
  }

  editUser(user: any) {
    this.dataService.sendData(user);
  }

  detailView(user_id: any) {
    this.userservice.userDetails(user_id).subscribe((data: any) => {
      this.detailData=data;
      });
  }
  
//search button click
  searchData() {
    var search="";
    var firstName = this.searchForm.value.firstName;
    var lastName=this.searchForm.value.lastName;
    var employeeid=this.searchForm.value.employeeid;
    var email=this.searchForm.value.email;
    var role=this.searchForm.value.role;
    var status=this.searchForm.value.status;
    this.searchForm.reset()
    if (firstName != null) {
      search=search+'&first_name='+firstName;
    }
    if(lastName!=null){
      search=search+'&sur_name='+lastName;
    }
    if(employeeid!=null){
      search=search+'&employee_id='+employeeid;
    }
    if(email!=null){
      search=search+'&email='+email;
    }
    if(role!=null){
      search=search+'&role='+role;
    }

    if(status==null){
      status=1;
    }
    
    this.listUsers(search,status);
  }

  confirmDeleteModal(content:any){
    this.modalService.open(content, { centered: true });  
    }

    //assign assest to user
    assignAsset(employeeId:any){
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
      alert(`Assest ${this.assetId} is assigned to employee ${employeeId} on ${currentDateTime}`);
      // this.assetservice.assignAsset(employeeId,this.assetId,currentDateTime).subscribe({
      //   error: (e: any) => console.log(e),
      //   complete: () => {
      //     this.toastservice.showSuccess("Assest assigned to user!!...")
      //   }   
      // })
    }  

}
