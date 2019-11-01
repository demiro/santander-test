import { Person } from 'src/app/models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs';
const clonedeep = require('lodash.clonedeep');

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  people$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentPeopleState: any = {};

  constructor(private http: HttpClient) {
    this.load().subscribe(response => {
      Object.keys(response).forEach(id => {
        this.currentPeopleState[id] = { id: parseInt(id, 10), name: response[id] };
      });
      this.emitNewState();
    });
  }

  load() {
    return this.http.get<Person>('/assets/data/mockup.json').pipe(
      tap(response => {
        // deal with some data normalization, sanitation, error handling
      })
    );
  }

  add(person: Person) {
    const id = new Date().getTime();
    this.currentPeopleState[id] = { id, name: person.name, checked: false };
    this.emitNewState();
  }

  deleteAll() {
    this.currentPeopleState = {};
    this.emitNewState();
  }

  deletePerson(id) {
    if (!!this.currentPeopleState[id]) {
      delete this.currentPeopleState[id];
    }
    this.emitNewState();
  }

  toggleAll(checked: boolean) {
    Object.keys(this.currentPeopleState).forEach(id => {
      console.log('PERSON', this.currentPeopleState[id]);
      this.currentPeopleState[id].checked = checked;
    });
    this.emitNewState();
  }

  togglePerson(id: number) {
    if (this.currentPeopleState[id].checked === null) {
      this.currentPeopleState[id].checked = true;
    } else {
      this.currentPeopleState[id].checked = !this.currentPeopleState[id].checked;
    }

    this.emitNewState();
  }

  private getCurrentState() {
    return clonedeep(this.currentPeopleState);
  }

  private emitNewState() {
    console.log('NEW STATE', this.currentPeopleState);
    this.people$.next(this.currentPeopleState);
  }
}
