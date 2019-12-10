import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Contact[] = [];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.favorites = this.contactService.getFavorites();
  }
}
