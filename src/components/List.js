import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
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

export default function List({ title, cards, listID, index }) {
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
                <EditableField title={title} />
                {cards.map((card, i) => (
                  <TodoCard
                    index={i}
                    key={card.id}
                    listID={listID}
                    id={card.id}
                    description={card.description}
                    name={card.name}
                  />
                ))}
                {provided.placeholder}
                <ActionButton listID={listID} />
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
}

connect()(ActionButton);
