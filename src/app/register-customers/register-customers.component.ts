import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'protractor';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-customers',
  templateUrl: './register-customers.component.html',
  styleUrls: ['./register-customers.component.css']
})
export class RegisterCustomersComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      re_password: new FormControl()
    });
  }

  onSubmit(): void {
    var username = this.employeeForm.value.username;
    var email = this.employeeForm.value.email;
    var password = this.employeeForm.value.password;
    var re_password = this.employeeForm.value.re_password;
  }

}
