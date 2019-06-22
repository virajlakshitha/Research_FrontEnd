import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import { Pcpart } from '../model/pcpart';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  pcpart: Pcpart[];
  // employeeForm: FormGroup;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   category: new FormControl(),
    //   name: new FormControl()
    // });
  }

  onSubmit(): void {
    // console.log(this.employeeForm.value);
    // var category = 'RAM';
    // var name = 'Kinston 4GB RAM';
    // this.searchService.findByName(category, name).subscribe(data => {
    //   this.pcpart = data;
    // },
    //   (error: any) => console.log(error),
    //   () => console.log('Gets all data')
    // );

    // this.pcpart = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" }];
  }

}
