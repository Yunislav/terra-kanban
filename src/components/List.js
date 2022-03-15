import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import ActionButton from './ActionButton';
import EditableField from './EditableField';

const ListContainer = styled.div`
  background-color: var(--color-gray);
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  margin-right: 8px;
  height: 100%;
`;

export default function List({ title, cards, listID }) {
  return (
    <Droppable droppableId={String(listID)}>
      {(provided) => (
        <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
          <EditableField title={title} />
          {cards.map((card, index) => (
            <TodoCard
              index={index}
              key={card.id}
              id={card.id}
              description={card.description}
              name={card.name}
            />
          ))}
          <ActionButton listID={listID} />
          {provided.placeholder}
        </ListContainer>
      )}
    </Droppable>
  );
}

connect()(ActionButton);
