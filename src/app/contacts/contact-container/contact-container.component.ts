import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.css']
})
export class ContactContainerComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.route.snapshot['_routerState'].url.includes('/favorites')) {
      this.router.navigate(['/contacts']);
    }
  }

  onAddContact() {
    this.router.navigate(['/contact-edit']);
  }

}
