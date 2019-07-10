import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import {Router} from "@angular/router";
import { UserAccessService } from '../service/user-access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customerForm: FormGroup;
  user: Object;

  constructor(private userAccessService: UserAccessService, private router: Router) { }

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
    this.userAccessService.login(username, password).subscribe(data => {
      this.user = data;
      console.log(data);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    return true;
  }

}
