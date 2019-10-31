import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/models/person';
import { FormGroup } from '@angular/forms';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() btnText: string = 'Add';
  @Output() submitted: EventEmitter<Person> = new EventEmitter<Person>();
  personForm: FormGroup;

  constructor(private personService: PersonService) {}

  ngOnInit() {}

  onSubmitted(event: Event) {
    console.log(event);
    event.preventDefault();
    this.submitted.next({ name: 'blah' });
  }
}
