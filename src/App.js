import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from './components/List';
import ActionButton from './components/ActionButton';
import { sort } from './redux/BoardState';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
function App({ lists, cards, dispatch }) {
  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <List
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <ActionButton list />
            </ListsContainer>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
