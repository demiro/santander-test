import { PersonService } from 'src/app/services/person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  peopleSubscription: Subscription;
  data: Person[] = [];
  showDeleteAllPrompt: boolean = false;

  constructor(private personService: PersonService) {
    this.peopleSubscription = this.personService.people$.subscribe(people => {
      this.data = Object.keys(people).map(id => {
        return { id, name: people[id] };
      });
    });
  }

  ngOnInit() {}

  saveNew(person: Person) {
    this.personService.add(person);
  }

  deleteAll() {
    this.personService.deleteAll();
    this.showDeleteAllPrompt = false;
  }

  editAll() {
    // do something
  }
}
