import { useSelector } from 'react-redux';
import { selectFilterValue, selectFilteredContacts } from 'redux/selectors';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';

export const ContactList = ({ mycontacts = [] }) => {
  const filterValue = useSelector(selectFilterValue);
  const filteredContacts = selectFilteredContacts(mycontacts, filterValue);
  const sortedContacts = filteredContacts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <List>
      {sortedContacts.map(({ id, name, phone }) => (
        <ContactItem key={id} id={id} name={name} number={phone} />
      ))}
    </List>
  );
};
