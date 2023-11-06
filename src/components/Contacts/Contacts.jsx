import React from 'react';
import css from './Contacts.module.css';

export default class Contacts extends React.Component {
  render() {
    return (
      <div>
        <ul className={css.listContacts}>
          {this.props.contacts.map(({ id, name, number }) => (
            <li className={css.elemContacts} key={id}>
              {name}: {number}{' '}
              <button
                className={css.btnContacts}
                type="button"
                onClick={() => {
                  this.props.hendleDeletedContact(id);
                }}
              >
                {' '}
                Deleted{' '}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}