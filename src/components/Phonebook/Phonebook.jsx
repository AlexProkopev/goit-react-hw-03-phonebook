import React from 'react';
import css from "./PhoneBook.module.css"

export default class Phonebook extends React.Component {
  state = {
    name: '',
      number: "",
  };

  handleInputChange = e => {
    e.preventDefault();
    const value = e.target.value;

    this.setState({ [e.target.name]: value });
    console.log(value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const name = this.state.name;
    const number = this.state.number;

    const contacts = {
      name: String(name),
      number: Number.parseFloat(number),
    };

    this.props.handleAddContact(contacts);

    this.setState({ name: '', number: "" });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor="name">Введете имя</label>
        <input className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
          
          <label className={css.label} htmlFor="number">Введете Номер</label>
        <input
        className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required 
          value={this.state.number}
          onChange={this.handleInputChange}
        />
        <button className={css.submitBtn} type="submit">Add contact</button>
      </form>
    );
  }
}