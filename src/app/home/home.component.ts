import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserAccessService } from '../service/user-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contactForm: FormGroup;

  lat: number = 6.914717;
  lng: number = 79.972926;
  zoom: number = 15;
  label:string = "Here";

  constructor(private userAccessService: UserAccessService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      email: new FormControl(),
      message: new FormControl()
    });
  }

  onSubmit(): void {
    var email = this.contactForm.value.email;
    var message = this.contactForm.value.message;
    this.userAccessService.addContact(email, message).subscribe(data => {
      
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    console.log(email+'/'+message);
  }

}
