import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import List from './components/List';
import ActionButton from './components/ActionButton';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
function App({ lists }) {
  return (
    <div className="app">
      <ListsContainer>
        {lists.map((list) => (
          <List listID={list.id} key={list.id} title={list.title} cards={list.cards} />
        ))}
        <ActionButton list />
      </ListsContainer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
