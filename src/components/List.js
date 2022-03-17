import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '@mui/material/Icon';
import TodoCard from './TodoCard';
import AddListOrCardButton from './AddListOrCardButton';
import { modifyColumnName, deleteEmptyList } from '../redux/BoardState';

const ListContainer = styled.div`
  background-color: var(--color-gray);
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 8px;
  height: 100%;
`;

const StyledInput = styled.input`
  width: 96%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

function List({ title, cards, listID, index, empty, dispatch }) {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    e.preventDefault();
    setIsEditing(false);
    dispatch(modifyColumnName(listID, listTitle));
  };

  const handleDeleteList = () => {
    dispatch(deleteEmptyList(listID));
  };

  const renderEditInput = () => (
    <form onSubmit={handleFinishEditing}>
      <StyledInput
        type="text"
        value={listTitle}
        onChange={handleChange}
        autoFocus
        onFocus={handleFocus}
        onBlur={handleFinishEditing}
      />
    </form>
  );

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)}>
            {/* eslint-disable-next-line no-shadow */}
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {isEditing ? (
                  renderEditInput()
                ) : (
                  <TitleContainer>
                    <ListTitle onClick={() => setIsEditing(true)}>{listTitle}</ListTitle>
                    {empty && <DeleteButton onClick={handleDeleteList}>delete</DeleteButton>}
                  </TitleContainer>
                )}
                {cards.map((card, i) => (
                  <TodoCard
                    index={i}
                    key={card.id}
                    listID={listID}
                    id={card.id}
                    description={card.description}
                    date={card.dateCreated}
                    open={card.status.open}
                    name={card.name}
                  />
                ))}
                {provided.placeholder}
                <AddListOrCardButton listID={listID} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
}

export default connect()(List);
