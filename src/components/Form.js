import React from 'react';
import styled from 'styled-components';
import Icon from '@mui/material/Icon';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Card from '@mui/material/Card';

const Container = styled.div`
  width: 300px;
  margin-bottom: 8px;
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 6px 8px 2px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
`;

const Form = ({ list, text = '', onChange, closeForm, children }) => {
  const placeholder = list ? 'Enter list title...' : 'Enter a description for this card';

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <Container>
      <StyledCard>
        <StyledTextArea
          placeholder={placeholder}
          autoFocus
          onFocus={handleFocus}
          value={text}
          onChange={(e) => onChange(e)}
          onBlur={closeForm}
        />
      </StyledCard>
      <ButtonContainer>
        {children}
        <StyledIcon onMouseDown={closeForm}>close</StyledIcon>
      </ButtonContainer>
    </Container>
  );
};

export default Form;
