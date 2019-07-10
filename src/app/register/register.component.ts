import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { error } from 'protractor';
import {Router} from "@angular/router";
import { UserAccessService } from '../service/user-access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  vendorForm: FormGroup;
  user: Object;

  constructor(private userAccessService: UserAccessService, private router: Router) { }

  ngOnInit() {
    this.vendorForm = new FormGroup({
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
    var username = this.vendorForm.value.username;
    var email = this.vendorForm.value.email;
    var password = this.vendorForm.value.password;
    var re_password = this.vendorForm.value.re_password;
    var street1 = this.vendorForm.value.street1;
    var street2 = this.vendorForm.value.street2;
    var city = this.vendorForm.value.city;
    var province = this.vendorForm.value.province;
    var tel = this.vendorForm.value.tel;
    var mobile = this.vendorForm.value.mobile;

    this.userAccessService.saveVendor(username, email, password, street1, street2, city, province, tel, mobile).subscribe(data => {
      this.user = data;
      console.log(data);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

}
