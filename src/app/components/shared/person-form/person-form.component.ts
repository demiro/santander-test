import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from 'src/app/models/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit, OnChanges {
  @Input() btnText: string = 'Add';
  @Input() data: Person;
  @Output() submitted: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() cancelled: EventEmitter<Person> = new EventEmitter<Person>();
  personForm: FormGroup;

  constructor() {
    this.personForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    if (change.data) {
      this.personForm.controls.firstName.setValue(this.data.name);
    }
  }

  onSubmitted(event: Event) {
    event.preventDefault();
    // check the validation
    if (this.personForm.valid) {
      this.submitted.next({ name: this.personForm.controls.firstName.value });
      this.onResetName();
    }
  }

  onUpdated(event: Event) {
    event.preventDefault();
    if (this.personForm.valid) {
      this.submitted.next({ id: this.data.id, name: this.personForm.controls.firstName.value });
    }
  }

  onCancelled(event: MouseEvent) {
    event.preventDefault();
    this.cancelled.next();
  }

  onResetName() {
    this.personForm.controls.firstName.setValue('');
  }
}
