import { Person } from 'src/app/models/person';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { constructor } from 'q';
import { PersonService } from 'src/app/services/person.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.scss']
})
export class PersonTableComponent implements OnInit, OnDestroy {
  @Input() data: Person[] = [];

  @ViewChild('checkAll', { static: true }) checkAllEl: ElementRef;

  isSelectedAll: boolean = false;
  peopleSubscription: Subscription;
  totalSelected: 0;

  constructor(private personService: PersonService) {
    // Definitely not the way to go in sub-component, but for the simplicity sake
    this.peopleSubscription = this.personService.people$.subscribe(people => {
      this.totalSelected = 0;
      this.isSelectedAll = false;
      Object.keys(people).forEach(id => {
        if (people[id].checked === true) {
          this.totalSelected++;
        }
      });
      const total = Object.keys(people).length;

      if (this.totalSelected === total) {
        this.isSelectedAll = true;
      }

      if (this.totalSelected > 0 && this.totalSelected !== total) {
        this.checkAllEl.nativeElement.indeterminate = true;
      }
    });
  }

  ngOnInit() {}

  toggleCheckboxAll() {
    // again, this should be delegated to parent (main page component), but for simplicity
    this.personService.toggleAll(this.isSelectedAll);
  }

  toggleCheckboxOne(id: number) {
    // again, this should be delegated to parent (main page component), but for simplicity
    this.personService.togglePerson(id);
  }

  deletePerson(id: number) {
    // read previous comments
    this.personService.deletePerson(id);
  }

  updatePerson(person: Person) {
    this.personService.updatePerson(person.id, person.name);
  }

  ngOnDestroy() {
    if (this.peopleSubscription) {
      this.peopleSubscription.unsubscribe();
    }
  }
}
