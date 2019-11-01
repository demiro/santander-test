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

  constructor(private personService: PersonService) {
    // Definitely not the way to go in sub-component, but for the simplicity sake
    this.peopleSubscription = this.personService.people$.subscribe(people => {
      let checked: number = 0;
      Object.keys(people).forEach(id => {
        if (people[id].checked) {
          checked++;
        }
      });

      if (checked === people.length) {
        this.isSelectedAll = true;
      } else if (checked === 0) {
        this.isSelectedAll = false;
      } else {
        this.isSelectedAll = false;
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
    return false;
  }

  deletePerson(id: number) {
    // read previous comments
    this.personService.deletePerson(id);
  }

  ngOnDestroy() {
    if (this.peopleSubscription) {
      this.peopleSubscription.unsubscribe();
    }
  }
}
