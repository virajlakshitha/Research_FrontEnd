/// <reference types="@types/googlemaps" />
import { Component, OnInit,ViewChild } from '@angular/core';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(this.gmapElement.nativeElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

}
