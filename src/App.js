import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './components/List';
import ActionButton from './components/ActionButton';
import { sort } from './actions/listActions';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
function App({ lists, dispatch }) {
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <ListsContainer>
          {lists.map((list) => (
            <List listID={list.id} key={list.id} title={list.title} cards={list.cards} />
          ))}
          <ActionButton list />
        </ListsContainer>
      </div>
    </DragDropContext>
  );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
