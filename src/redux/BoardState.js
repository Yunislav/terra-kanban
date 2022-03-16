import { combineReducers } from 'redux';

const CONSTANTS = {
  ADD_CARD: 'ADD_CARD',
  EDIT_CARD: 'EDIT_CARD',
  ADD_LIST: 'ADD_LIST',
  DELETE_CARD: 'DELETE_CARD',
  EDIT_COLUMN_NAME: 'EDIT_COLUMN_NAME',
  DELETE_EMPTY_LIST: 'DELETE_EMPTY_LIST',
  DRAG_HAPPEND: 'DRAG_HAPPEND',
};

let listIDcount = 3;
let cardIDcount = 4;

const initialState = [
  {
    title: 'Todo',
    id: `list-${1}`,
    cards: [
      {
        id: `card-${1}`,
        name: 'Luna',
        description: 'Luna will go to the moon',
      },
      {
        id: `card-${2}`,
        name: 'Twitter',
        description: 'Dude, its already on the moon',
      },
      {
        id: `card-${3}`,
        name: 'Whatever',
        description: 'Nah, its going higher',
      },
    ],
  },
  {
    title: 'Empty List',
    id: `list-${2}`,
    cards: [],
  },
];

// List Actions

// - [X] User can add column with name
export const addList = (title) => ({
  type: CONSTANTS.ADD_LIST,
  payload: title,
});

// [] User can modify column name
export const modifyColumnName = (listID, newTitle) => ({
  type: CONSTANTS.EDIT_COLUMN_NAME,
  payload: {
    listID,
    newTitle,
  },
});

// - [ ] User can delete empty column
export const deleteEmptyList = (listID) => ({
  type: CONSTANTS.DELETE_EMPTY_LIST,
  payload: {
    listID,
  },
});

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => ({
  type: CONSTANTS.DRAG_HAPPEND,
  payload: {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
  },
});

// Card Actions

// - [x] User can add card to column with name and description
export const addCard = (listID, description, title) => ({
  type: CONSTANTS.ADD_CARD,
  payload: { description, listID, title },
});

export const editCard = (id, listID, newText) => ({
  type: CONSTANTS.EDIT_CARD,
  payload: { id, listID, newText },
});

export const deleteCard = (id, listID) => ({
  type: CONSTANTS.DELETE_CARD,
  payload: { id, listID },
});

// reducer

// eslint-disable-next-line default-param-last
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.DELETE_EMPTY_LIST: {
      return state.filter((list) => list.id !== action.payload.listID);
    }
    case CONSTANTS.EDIT_COLUMN_NAME: {
      const item = state.find((list) => list.id === action.payload.listID);
      item.title = action.payload.newTitle;
      return state;
    }
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listIDcount}`,
      };
      listIDcount += 1;
      return [...state, newList];
    }
    case CONSTANTS.ADD_CARD: {
      const newCard = {
        description: action.payload.description,
        name: action.payload.title,
        id: `list-${cardIDcount}`,
      };
      cardIDcount += 1;
      console.log(newCard);
      const newState = state.map((list) => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      });
      return newState;
    }
    case CONSTANTS.EDIT_CARD: {
      const hi = 0;
      return hi;
    }
    case CONSTANTS.DRAG_HAPPEND: {
      const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type } =
        action.payload;
      const newState = [...state];

      // [X] User can move columns by drag & drop
      if (type === 'list') {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // [X] User can move cards by drag & drop
      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        // find the list where the drag happend
        const list = state.find((listItem) => droppableIdStart === listItem.id);

        // pull out the card from the list
        const card = list.cards.splice(droppableIndexStart, 1);

        // put card in the new list
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happend
        const listStart = state.find((listItem) => droppableIdStart === listItem.id);

        // pull out the card from the list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where drag ended
        const listEnd = state.find((listItem) => droppableIdEnd === listItem.id);

        // put card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  lists: Reducer,
});
