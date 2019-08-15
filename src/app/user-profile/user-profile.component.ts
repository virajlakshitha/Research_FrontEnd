import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { User } from '../model/user';
import { UserProfileService } from '../service/user-profile.service';
import { error } from 'protractor';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  pcpart: Pcpart[];
  user: User[];
  user_object: User;
  type = 'vendor';

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.getAllPCParts('ebay');
    this.getUserData('viraj');
  }

  getAllPCParts(vendor: string) {
    this.userProfileService.findByVendor(vendor).subscribe(data => {
      this.pcpart = data;
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data')
    );
  }

  getUserData(username: string) {
    this.userProfileService.findByUserUsername(username).subscribe(data => {
      this.user_object = data;
    },
    (error: any) => console.log(error),
    () => console.log('Get all Data'));
  }

}
