import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  starClass: string;

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit() {
    this.setStar(this.contact.isFavorite);
  }

  onContactClicked() {
    this.router.navigate(['/contact-edit', this.contact.name]);
  }

  onStarClicked() {
    this.contactService.setFavorite(!this.contact.isFavorite, this.contact.name);
    this.setStar(this.contact.isFavorite);
  }

  setStar(isFavorite: boolean) {
    if (isFavorite) {
      this.starClass = "glyphicon glyphicon-star checked";
    }
    else {
      this.starClass = "glyphicon glyphicon-star-empty";
    }
  }

}
