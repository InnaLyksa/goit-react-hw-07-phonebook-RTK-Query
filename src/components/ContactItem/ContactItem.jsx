import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactRTKSlice';
import { ReactComponent as Phone } from '../../icons/phone.svg';

import { ContactListItem, ContactText, DeleteBtn } from './ContactItem.styled';
import { Success } from '../utils/notifications';

export const ContactItem = ({ id, name, number }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  return (
    <ContactListItem>
      <ContactText href={`tel:${number}`}>
        <Phone />
        {name}: {number}
      </ContactText>

      <DeleteBtn
        type={'button'}
        onClick={() => {
          deleteContact(id);
          Success(name, 'deleted!');
        }}
        disabled={isLoading}
      >
        Delete
      </DeleteBtn>
    </ContactListItem>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
