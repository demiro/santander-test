import { Person } from 'src/app/models/person';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss']
})
export class PersonTableComponent implements OnInit {
  @Input() data: Person[] = [];

  constructor() {}

  ngOnInit() {}
}
