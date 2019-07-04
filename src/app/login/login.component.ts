import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(): void {
    var email = this.employeeForm.value.email;
    var password = this.employeeForm.value.password;
    console.log(email+"/"+password);
    this.router.navigate(['/']);
  }

}
