import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
  // console.log('cards', cards);
  return (
    <ListContainer>
      <EditableField title={title} />
      {cards.map((card) => (
        // console.log('hi', card);
        <TodoCard key={card.id} description={card.description} name={card.name} />
      ))}
      <ActionButton listID={listID} />
    </ListContainer>
  );
}

connect()(ActionButton);
