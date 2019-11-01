import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  peopleSubscription: Subscription;
  data: Person[] = [];
  showDeleteAllPrompt: boolean = false;
  totalSelected: number = 0;

  constructor(private personService: PersonService) {
    this.peopleSubscription = this.personService.people$.subscribe(people => {
      this.data = [];

      this.totalSelected = 0;

      Object.keys(people).forEach(id => {
        if (people[id].checked === true) {
          this.totalSelected++;
        }
        this.data.push(people[id]);
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

  deleteSelected() {
    this.personService.deleteSelected();
    this.showDeleteAllPrompt = false;
  }

  editAll() {
    // do something
    if (this.totalSelected > 0) {
      this.personService.markSelectedForEditing();
    } else {
      this.personService.markAllForEditing();
    }
  }

  ngOnDestroy() {
    if (this.peopleSubscription) {
      this.peopleSubscription.unsubscribe();
    }
  }
}
