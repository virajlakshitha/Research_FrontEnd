import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { Pcpart } from '../model/pcpart';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  pcpart: Pcpart[];
  employeeForm: FormGroup;
  logged = 'false';
  laptop_comparison = 'false';

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      category: new FormControl("all"),
      name: new FormControl()
    });
    if(localStorage.getItem('username')){
      this.logged = "true";
    }
  }

  onSubmit(): void {
    var category = this.employeeForm.value.category;
    var name = this.employeeForm.value.name;
    if(name == null || name == ""){
      
    } else {
      window.location.href = '/browse/pcparts/'+category+'/'+name;
    }
  }

}
