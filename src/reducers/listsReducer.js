import { CONSTANTS } from '../actions';

let listID = 3;
let cardID = 3;

const initialState = [
  {
    title: 'Todo',
    id: 0,
    cards: [
      {
        id: 0,
        name: 'Task 1',
        description: 'Luna will go to the moon',
      },
      {
        id: 1,
        name: 'Task 2',
        description: 'Dude, its already on the moon',
      },
      {
        id: 2,
        name: 'Task 3',
        description: 'Nah, its going',
      },
    ],
  },
  {
    title: 'Doing',
    id: 1,
    cards: [
      {
        id: 0,
        name: 'Task 1',
        description: 'Nah, its going',
      },
      {
        id: 1,
        name: 'Task 2',
        description: 'Nah, its going',
      },
      {
        id: 2,
        name: 'Task 3',
        description: 'Nah, its going',
      },
      {
        id: 3,
        name: 'Task 4',
        description: 'Nah, its going',
      },
    ],
  },
];

// eslint-disable-next-line default-param-last
const ListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      // eslint-disable-next-line no-case-declarations
      const newList = {
        title: action.payload,
        cards: [],
        id: listID,
      };
      listID += 1;
      return [...state, newList];
    case CONSTANTS.UPDATE_LIST:
      // eslint-disable-next-line no-case-declarations
      const updatedList = {
        title: action.payload,
        cards: [],
        id: listID,
      };
      listID += 1;
      return [...state, updatedList];

    // case CONSTANTS.DELETE_EMPTY_LIST:
    case CONSTANTS.ADD_CARD:
      // eslint-disable-next-line no-case-declarations
      const newCard = {
        description: action.payload.description,
        id: cardID,
      };
      cardID += 1;
      // eslint-disable-next-line no-case-declarations
      const newState = state.map((list) => {
        console.log('action', action);
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      });
      return newState;

    default:
      return state;
  }
};

export default ListsReducer;
