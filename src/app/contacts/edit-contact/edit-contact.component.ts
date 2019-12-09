import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  originalName: string;
  alert: string;
  name: string;
  email: string;
  phone: number;
  editMode: boolean = false;
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
    this.setDataForEdit();
    this.route.params.subscribe((params: Params) => {
      this.name = params['name'];
      this.setDataForEdit();
    });
  }

  setDataForEdit() {
    let contact: Contact;
    if (this.name) {
      contact = this.contactService.getContact(this.name);
    }
    if (contact) {
      this.name = contact.name;
      this.originalName = contact.name;
      this.phone = contact.phone;
      this.email = contact.email;
      this.editMode = true;
    }
    else {
      //if contact is not found, then navigate to the Add contact screen
      this.router.navigate(['/contact-edit']);
    }
  }


  onSave() {
    let saveSuccess = false;
    if (!this.editMode) {
      saveSuccess = this.contactService.addContact(new Contact(this.name, this.email, this.phone));
      if (saveSuccess) {
        this.router.navigate(['/']);
      }
    }
    else {
      saveSuccess = this.contactService.updateContact(this.originalName,
        new Contact(this.name, this.email, this.phone));
      if (saveSuccess) {
        this.router.navigate(['/']);
      }
    }

    if (!saveSuccess) {
      this.alert = "Contact " + this.name + " already exists.";
      setTimeout(() => {
        this.alert = null;
      }, 3000
      );
    }
  }

  onBackToContacts() {
    this.router.navigate(['/']);
  }

}
