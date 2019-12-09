import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onContactClicked() {
    this.router.navigate(['/contact-edit', this.contact.name]);
  }

}
