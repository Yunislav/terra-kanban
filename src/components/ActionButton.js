import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import { connect } from 'react-redux';
import { addList, addCard } from '../actions';

import {
  StyledActionCard,
  StyledTextArea,
  TextAreaButtonsContainer,
  StyledButton,
  ActionButtonContainer,
} from '../styles/ActionButton.styled';

const ActionButton = ({ list, listID, dispatch }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState('');
  const buttonText = list ? 'Add List' : 'Add Card';
  const placeHolder = list ? 'Enter a column name' : 'Enter a note';
  const buttontitle = list ? 'Add Column' : 'Add';
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);
  const handleInputChange = (e) => setText(e.target.value);

  const handleAddList = () => {
    if (text) {
      dispatch(addList(text));
      setText('');
      closeForm();
    }
  };

  const handleAddCard = () => {
    if (text) {
      dispatch(addCard(listID, text));
      setText('');
      closeForm();
    }
  };

  const renderForm = () => (
    <div className="InputForm" style={{ width: '300px' }}>
      <StyledActionCard>
        <StyledTextArea
          placeholder={placeHolder}
          autoFocus
          value={text}
          onChange={handleInputChange}
        />
      </StyledActionCard>
      <TextAreaButtonsContainer>
        <StyledButton onClick={list ? handleAddList : handleAddCard} $primary variant="contained">
          {buttontitle}
        </StyledButton>
        <StyledButton $primary={false} onClick={closeForm} variant="contained">
          Cancel
        </StyledButton>
      </TextAreaButtonsContainer>
    </div>
  );

  const renderAddButton = () => (
    <ActionButtonContainer onClick={openForm}>
      <Icon>add</Icon>
      <p>{buttonText}</p>
    </ActionButtonContainer>
  );
  return formOpen ? renderForm() : renderAddButton();
};

export default connect()(ActionButton);
