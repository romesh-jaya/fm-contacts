import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { ContactContainerComponent } from './contacts/contact-container/contact-container.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '', component: ContactContainerComponent, children: [
      { path: 'contacts', component: ContactsComponent },
    ]
  },
  { path: 'contact-edit', component: EditContactComponent },
  { path: 'contact-edit/:name', component: EditContactComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactComponent,
    EditContactComponent,
    ContactContainerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
