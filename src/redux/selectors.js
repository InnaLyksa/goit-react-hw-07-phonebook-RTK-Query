export const selectFilterValue = state => state.filter.value;

export const selectFilteredContacts = (contacts, filterValue) =>
  contacts.filter(contact => contact.name.toLowerCase().includes(filterValue));
