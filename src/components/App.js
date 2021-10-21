import React, { Component } from "react";
import * as uuid from "uuid";
import ContactList from "./ContactsList";
import Filter from "./Filter";
import ContactForm from "./ContactForm";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (item) => {
    const normalizedItemName = item.name.toLowerCase();
    const searchExists = this.state.contacts
      .map((contact) => contact.name.toLowerCase())
      .includes(normalizedItemName);

    if (searchExists) {
      alert(`${normalizedItemName} is already in contacts`);
    } else {
      const contact = {
        ...item,
        id: uuid.v4(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  setFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;

    const displayedContacts = this.getContacts();

    return (
      <div className={styles.app}>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.setFilter} />
        <ContactList
          contacts={displayedContacts}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}
