import React from 'react';
import Phonebook from './Phonebook/Phonebook';
import { nanoid } from 'nanoid';
import Contacts from './Contacts/Contacts';
import Filters from './Filters/Filters';
import css from './App.module.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = contacts => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === contacts.name.toLowerCase()
      )
    ) {
      alert(`${contacts.name} is already in contacts`);
      return;
    } else if (
      this.state.contacts.some(contact => contact.number === contacts.number)
    ) {
      alert(`${contacts.number} is already in contacts`);
      return;
    }

    const uniqueId = nanoid();
    const formattedName =
      contacts.name.charAt(0).toUpperCase() + contacts.name.slice(1);

    this.setState(
      {
        contacts: [
          ...this.state.contacts,
          { id: uniqueId, name: formattedName, number: contacts.number },
        ],
      });
  };

  hendleDeletedContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  handleFilterContact = evt => {
    this.setState({
      filter: evt.currentTarget.value,
    })
  }

  getContacts = () => {
    const {contacts,filter} = this.state

    const filterLowerCase = filter.toLowerCase();

    return contacts.filter(({name}) =>
      name.toLowerCase().includes(filterLowerCase)
    )
  }

  //--------------------------------------

  componentDidMount(){
    const localContacts = JSON.parse(localStorage.getItem('contacts') || []);
    this.setState({
      contacts: localContacts 
    })

  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts!== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }


  render() {
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <Phonebook
          handleAddContact={this.handleAddContact}
          contactState={this.state.contacts}
        />

        <>
          <h2 className={css.title}>Contacts</h2>
          {this.state.contacts.length ? (
            <Filters handleFilterContact={this.handleFilterContact} value={this.state.filter} />
          ) : (
            <h2 className={css.title}>Создайте первый контакт</h2>
          )}
        </>
        <Contacts
          contacts={this.getContacts()}
          hendleDeletedContact={this.hendleDeletedContact}
        />
      </div>
    );
  }
}