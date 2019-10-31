import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/shared/app-header/app-header.component';
import { AppFooterComponent } from './components/shared/app-footer/app-footer.component';
import { UserFormComponent } from './components/shared/user-form/user-form.component';
import { UserTableComponent } from './components/shared/user-table/user-table.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    UserFormComponent,
    UserTableComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
