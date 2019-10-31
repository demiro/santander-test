import { PersonService } from 'src/app/services/person.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'santander-test';

  constructor(private personService: PersonService) {
    this.personService.load();
  }
}
