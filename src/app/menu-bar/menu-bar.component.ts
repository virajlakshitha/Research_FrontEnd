import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
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

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      category: new FormControl(),
      name: new FormControl()
    });
  }

  onSubmit(): void {
    var category = this.employeeForm.value.category;
    var name = this.employeeForm.value.name;
    this.router.navigate(['/browse/pcparts/', name])
  }

}
