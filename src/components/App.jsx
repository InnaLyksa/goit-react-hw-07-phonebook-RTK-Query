import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList, ContactForm, Filter } from 'components';
import { Container, SectionHeader, PageHeader } from './App.styled';
import { useFetchContactsQuery } from 'redux/contactRTKSlice';
import { Loader } from './utils/loader';
import { Error } from './utils/notifications';

export function App() {
  const { data, isError, isLoading } = useFetchContactsQuery();

  return (
    <Container>
      <PageHeader>Phonebook</PageHeader>
      <ContactForm />
      <SectionHeader>Contacts</SectionHeader>
      <Filter />
      {isLoading && !isError && <Loader />}
      {isError && !isLoading && <Error />}
      <ContactList mycontacts={data} />
      <ToastContainer />
    </Container>
  );
}
