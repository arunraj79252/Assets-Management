import { Component, OnInit, AfterViewInit, NgZone} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../../user-management.service';
import { ToasterService } from 'src/app/shared/toaster/toaster.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
})
export class UserAddComponent implements OnInit {


  constructor(private toastservice:ToasterService,private fb: FormBuilder, private userservice: UserManagementService, private router:Router,
    private zone: NgZone) { }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }


  addUserForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$')]],
    sur_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    employee_id: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    role: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    phone:['', [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]]
  });


  // Getter method to access formcontrols
  get name() {
    return this.addUserForm.get('first_name');
  }

  get lname() {
    return this.addUserForm.get('sur_name');
  }

  get emailid() {
    return this.addUserForm.get('email');
  }

  get employeeid() {
    return this.addUserForm.get('employee_id');
  }

  get roles() {
    return this.addUserForm.get('role');
  }

  get phone(){
    return this.addUserForm.get('phone');
  }
  onChange(event: any) {
    this.addUserForm.get('role')?.setValue(event.target.value)
  }

  // Submit Registration Form
  onSubmit() {
    if (this.addUserForm.valid) {
      console.log(this.addUserForm.value)
      this.userservice.addUser(this.addUserForm.value).subscribe({
        error: (e) => console.log(e),
        complete: () => {
          this.toastservice.showSuccess("User added!!...")
        }
      })
    }
  }

  closeToaster(){
    this.zone.run(()=>{this.router.navigate(['/dashboard/user'])})
  }
}

