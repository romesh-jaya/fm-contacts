import { Injectable } from "@angular/core";
import { Contact } from './contact.model';

@Injectable({ providedIn: "root" })
export class ContactService {
    contacts: Contact[] = [];

    constructor() {
        const contactsLoaded: [Contact] = JSON.parse(localStorage.getItem('contactsUserData'));
        if (!contactsLoaded) {
            return;
        }
        if (typeof contactsLoaded !== "object") {
            return;
        }
        this.contacts = contactsLoaded;
    }

    updateContact(oldName: string, newContact: Contact) {
        let indexFound: number = -1;

        this.contacts.forEach((contact, index) => {
            if (contact.name.toUpperCase() == oldName.toUpperCase()) {
                indexFound = index;
            }
        });

        if (indexFound >= 0) {
            if (oldName != newContact.name) {//only if a name change has taken place
                if (!this.checkForDuplicateName(newContact.name)) {
                    return false;
                }
            }
            this.contacts.splice(indexFound, 1);
            this.contacts.push(newContact);
            this.saveToLocalStore();
        }
        return true;

    }

    checkForDuplicateName(name: string) {
        let duplicateExists = false;

        this.contacts.forEach((contact) => {
            if (contact.name.toUpperCase() == name.toUpperCase()) {
                duplicateExists = true;
            }
        });

        if (duplicateExists) {
            return false;
        }
        return true;
    }


    addContact(newContact: Contact) {
        if (!this.checkForDuplicateName(newContact.name)) {
            return false;
        }

        this.contacts.push(newContact);
        this.saveToLocalStore();
        return true;
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(name: string) {
        let matchFound: Contact;

        this.contacts.forEach((contact) => {
            if (contact.name.toUpperCase() == name.toUpperCase()) {
                matchFound = contact;
            }
        });

        return matchFound;
    }

    saveToLocalStore() {
        this.contacts.sort(this.compare);
        localStorage.setItem('contactsUserData', JSON.stringify(this.contacts));
    }

    //this function is used for sorting contacts by name
    compare(contactA, contactB) {
        // Use toUpperCase() to ignore character casing
        const nameA = contactA.name.toUpperCase();
        const nameB = contactB.name.toUpperCase();

        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }
}