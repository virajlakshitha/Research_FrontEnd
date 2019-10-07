import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
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
    this.checkLogin(username, password);
  }

  checkLogin(username, password) {
    this.userAccessService.login(username, password).subscribe(data => {
      this.user = data["responseObject"];
      if(data["responseCode"] == "111"){
        this.router.navigate(['/']);
      }
    },
      (error: any) => console.log(error));
  }

}
