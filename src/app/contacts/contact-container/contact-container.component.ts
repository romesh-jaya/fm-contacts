import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.css']
})
export class ContactContainerComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    if (!this.route.snapshot['_routerState'].url.includes('/favorites')) {
      this.router.navigate(['/contacts']);
    }
    this.contacts = this.contactService.getContacts();
  }

  onAddContact() {
    this.router.navigate(['/contact-edit']);
  }



}
