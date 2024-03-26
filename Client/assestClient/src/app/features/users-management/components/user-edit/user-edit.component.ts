import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';
import { ShareDataService } from '../../share-data.service';
import { UserManagementService } from '../../user-management.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userData: any;
  

  constructor(private toastservice:ToasterService,private fb: FormBuilder, private userservice: UserManagementService, private router:Router, private zone: NgZone,private dataService:ShareDataService) { }

  ngOnInit(): void {
    this.getData();
  }
  editUserForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]],
    sur_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    employee_id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    role: ['', [Validators.required]],
    status:['',[Validators.required]],
    phone:['',[Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]]
  });
  // Getter method to access formcontrols
  get name() {
    return this.editUserForm.get('first_name');
  }

  get lname() {
    return this.editUserForm.get('sur_name');
  }

  get emailid() {
    return this.editUserForm.get('email');
  }

  get employeeid() {
    return this.editUserForm.get('employee_id');
  }

  get roles() {
    return this.editUserForm.get('role');
  }

  get status(){
    return this.editUserForm.get('status');
  }
  get phone(){
    return this.editUserForm.get('phone');
  }
  onChange(event: any) {
    this.editUserForm.get('role')?.setValue(event.target.value)
  }
  
//Get data from list to edit values
  getData(){
    this.dataService.data.subscribe(response => {
      this.userData=response;
      this.editUserForm.patchValue({
        first_name:this.userData.first_name,
        sur_name:this.userData.sur_name,
        email:this.userData.email,
        employee_id:this.userData.employee_id,
        role:this.userData.role,
        user_id:this.userData.user_id,
        status:this.userData.status
      });
    });
  }

  onSubmit(){
    if (this.editUserForm.valid) {
      this.userservice.editUser(this.userData.user_id,this.editUserForm.value).subscribe({
        error: (e: any) => console.log(e),
        complete: () => {
          this.toastservice.showSuccess("User Edited!!...")
        }
      })
    }
  }

  closeToaster(){
    this.zone.run(()=>{this.router.navigate(['/dashboard/user'])})
  }


}
