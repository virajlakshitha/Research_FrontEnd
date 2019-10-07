import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../service/user-profile.service';
import { Model } from './model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private model: Model;

  constructor(private userProfileService: UserProfileService) {
    this.model = new Model();
  }

  ngOnInit() {
    this.model.userForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      street1: new FormControl(),
      street2: new FormControl(),
      city: new FormControl(),
      province: new FormControl(),
      tel: new FormControl(),
      mobile: new FormControl(),
      credit: new FormControl()
    });

    this.getAllPCParts('ebay');
    this.getUserData('viraj');
  }

  getAllPCParts(vendor: string) {
    this.userProfileService.findByVendor(vendor).subscribe(data => {
      this.model.pcpart = data["responseObject"];
    },
      (error: any) => console.log(error));
  }

  getUserData(username: string) {
    this.userProfileService.findByUserUsername(username).subscribe(data => {
      this.model.user_object = data["responseObject"];
    },
      (error: any) => console.log(error));
  }

}
