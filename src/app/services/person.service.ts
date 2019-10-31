import { Person } from 'src/app/models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  people$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
    this.load().subscribe(response => {
      this.people$.next(response);
    });
  }

  load() {
    return this.http.get<Person>('/assets/data/mockup.json').pipe(
      tap(response => {
        // deal with some data normalization, sanitation, error handling
      })
    );
  }

  add(person: Person) {}
}
