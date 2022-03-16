import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextareaAutosize from 'react-textarea-autosize';
import { addList, addCard } from '../redux/BoardState';

export const ActionButtonContainer = styled.div`
  display: flex;
  direction: column;
  width: 300px;
  height: 80px;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  cursor: pointer;
  ${({ list }) =>
    list &&
    `
  width: 300px;
  height: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: center;
  border: 2px dashed black;
  `}
`;

export const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  outline: none;
  border: none;
  overflow: hidden;
`;

export const StyledActionCard = styled(Card)`
  max-height: 265px;
  min-height: 58px;
  padding: 6px 8px 2px;
`;

export const TextAreaButtonsContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const StyledButton = styled(Button)`
  flex: 1;
  color: white;
  background-color: ${({ $primary }) => ($primary ? '#5aac44' : '#21262d')};
  margin-right: '4px';
  margin-left: ${({ $primary }) => ($primary ? '0px' : '4px')};
`;

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
