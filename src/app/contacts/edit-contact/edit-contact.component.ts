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
  readonly emptyStarClass = 'glyphicon glyphicon-star-empty';
  readonly coloredStarClass = 'glyphicon glyphicon-star checked';

  originalName: string;
  alert: string;
  name: string;
  email: string;
  phone: number;
  editMode = false;
  starClass: string = this.emptyStarClass;
  isFavorite: boolean;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.name = this.route.snapshot.params.name;
    this.setDataForEdit();
    this.route.params.subscribe((params: Params) => {
      this.name = params.name;
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
      this.isFavorite = contact.isFavorite;
      this.setStar();
      this.editMode = true;
    } else {
      // if contact is not found, then navigate to the Add contact screen
      this.router.navigate(['/contact-edit']);
    }
  }

  browseToPrevious() {
    const prevURL = this.contactService.previousURL;
    if (prevURL) {
      this.router.navigate([prevURL]);
    } else {
      this.router.navigate(['/']);
    }
  }


  onSave() {
    let saveSuccess = false;
    this.name = this.name.trim();
    if (!this.editMode) {
      saveSuccess = this.contactService.addContact(new Contact(this.name, this.email, this.isFavorite, this.phone));
      if (saveSuccess) {
        this.router.navigate(['/']);
      }
    } else {
      saveSuccess = this.contactService.updateContact(this.originalName,
        new Contact(this.name, this.email, this.isFavorite, this.phone));
      if (saveSuccess) {
        this.router.navigate(['/']);
      }
    }

    if (!saveSuccess) {
      this.alert = 'Contact ' + this.name + ' already exists.';
      setTimeout(() => {
        this.alert = null;
      }, 3000
      );
    }
  }

  onStarClicked() {
    this.isFavorite = !this.isFavorite;
    this.setStar();
  }

  setStar() {
    if (this.isFavorite) {
      this.starClass = this.coloredStarClass;
    } else {
      this.starClass = this.emptyStarClass;
    }
  }

  onBackToContacts() {
    this.browseToPrevious();
  }

}
