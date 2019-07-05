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

  customerForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      re_password: new FormControl()
    })
  }

  onSubmit(): void {
    var username = this.customerForm.value.username;
    var email = this.customerForm.value.email;
    var password = this.customerForm.value.password;
    var re_password = this.customerForm.value.re_password;
  }

}
