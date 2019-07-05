import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit(): void {
    var username = this.customerForm.value.username;
    var password = this.customerForm.value.password;
    if(this.checkLogin(username, password) == true){
      this.router.navigate(['/']);
    }
  }

  checkLogin(username, password): boolean {
    if(username == "abc" && password == "123"){
      return true;
    }
    else{
      return false;
    }
  }

}
