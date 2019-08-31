import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compatible-pc-part-list',
  templateUrl: './compatible-pc-part-list.component.html',
  styleUrls: ['./compatible-pc-part-list.component.css']
})
export class CompatiblePcPartListComponent implements OnInit {

  @Input() game_id: string;

  constructor() { }

  ngOnInit() {
  }

}
