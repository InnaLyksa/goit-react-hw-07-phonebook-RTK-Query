import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { Notification, Success, Error } from '../utils/notifications';

import {
  FormAddContact,
  LabelContactForm,
  InputContactForm,
  ButtonSubmit,
  MessageError,
} from './ContactForm.styled';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from 'redux/contactRTKSlice';

const nameInputId = nanoid();
const numberInputId = nanoid();

const phoneRegEx =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const nameRegEx = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegEx, {
      message:
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan',
      excludeEmptyString: false,
    })
    .required('Name is required field!'),
  phone: yup
    .string()
    .matches(phoneRegEx, {
      message:
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
      excludeEmptyString: false,
    })
    .required('Number is required field!'),
});

const initialValues = {
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const { data: mycontacts } = useFetchContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleSubmit = async (values, { resetForm }) => {
    const isDublicateName = mycontacts.find(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    const isDublicateNumber = mycontacts.find(
      ({ phone }) => phone === values.phone
    );
    if (isDublicateName) {
      return Notification(values.name);
    } else {
      if (isDublicateNumber) {
        return Notification(values.phone);
      }
    }
    try {
      await addContact(values);
      Success(values.name, 'added to phonebook');
      resetForm();
    } catch (error) {
      Error();
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormAddContact autoComplete="off">
        <LabelContactForm htmlFor={nameInputId}> Name:</LabelContactForm>
        <InputContactForm type="text" name="name" id={nameInputId} />
        <MessageError name="name" component="div" />

        <LabelContactForm htmlFor={numberInputId}>Number:</LabelContactForm>
        <InputContactForm id={numberInputId} type="tel" name="phone" />
        <MessageError name="phone" component="div" />

        <ButtonSubmit type="submit">Add contact</ButtonSubmit>
      </FormAddContact>
    </Formik>
  );
};
