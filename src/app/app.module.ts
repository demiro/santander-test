import { PersonService } from './services/person.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/shared/app-header/app-header.component';
import { AppFooterComponent } from './components/shared/app-footer/app-footer.component';
import { PersonFormComponent } from './components/shared/person-form/person-form.component';
import { PersonTableComponent } from './components/shared/person-table/person-table.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    PersonFormComponent,
    PersonTableComponent,
    MainPageComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
