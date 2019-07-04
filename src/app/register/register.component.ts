import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'protractor';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      re_password: new FormControl(),
      street1: new FormControl(),
      street2: new FormControl(),
      city: new FormControl(),
      province: new FormControl(),
      tel: new FormControl(),
      mobile: new FormControl(),
      card_number: new FormControl()
    });
  }

  onSubmit(): void {
    var username = this.employeeForm.value.username;
    var email = this.employeeForm.value.email;
    var password = this.employeeForm.value.password;
    var re_password = this.employeeForm.value.re_password;
    var street1 = this.employeeForm.value.street1;
    var street2 = this.employeeForm.value.street2;
    var city = this.employeeForm.value.city;
    var province = this.employeeForm.value.province;
    var tel = this.employeeForm.value.tel;
    var mobile = this.employeeForm.value.mobile;
    var card_number = this.employeeForm.value.card_number;
  }

}
