import Card from '@mui/material/Card';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import TextareaAutosize from 'react-textarea-autosize';

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
