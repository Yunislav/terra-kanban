import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import Icon from '@mui/material/Icon';
import CardButton from './CardButton';
import Form from './Form';
import { editCard, archiveCard } from '../redux/BoardState';
import Switch from './Switch';

const CardContainer = styled.div`
  margin: 0 0 8px 0;
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
`;

const EditButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  top: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Icon)`
  position: absolute;
  display: none;
  right: 5px;
  bottom: 5px;
  opacity: 0.5;
  ${CardContainer}:hover & {
    display: block;
    cursor: pointer;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const CardContentStyled = styled(CardContent)`
  background-color: ${({ open }) => (open ? 'white' : 'lightgray')};
`;
const TodoCard = ({ description, id, listID, index, dispatch, name, date, open }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardDescription, setCardDescription] = useState('');

  const closeForm = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setCardDescription(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();
    dispatch(editCard(id, listID, cardDescription));
    setIsEditing(false);
  };

  // Im treating archiving the card as deleting it, just like github's kanban board
  const handleArchiveCard = () => {
    dispatch(archiveCard(id, listID));
  };

  const renderEditForm = () => (
    <Form text={cardDescription} onChange={handleChange} closeForm={closeForm}>
      <CardButton onClick={saveCard}>Save</CardButton>
    </Form>
  );
  // Name, Description, Created date, Status(Open, Closed), Order

  const renderCard = () => (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => setIsEditing(true)}
        >
          <Card>
            <EditButton onMouseDown={() => setIsEditing(true)} fontSize="small">
              edit
            </EditButton>
            <DeleteButton fontSize="small" onMouseDown={handleArchiveCard}>
              archive
            </DeleteButton>

            <CardContentStyled open={open}>
              <Typography sx={{ fontSize: 14 }} color="blue" component="div">
                {name}
              </Typography>
              <Typography>{description}</Typography>
              <Typography>Created on: {date}</Typography>
              <Switch listID={listID} id={id} open={open} />
            </CardContentStyled>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );

  return isEditing ? renderEditForm() : renderCard();
};

export default connect()(TodoCard);
