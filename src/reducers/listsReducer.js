import { CONSTANTS } from '../actions';

let listID = 3;
let cardID = 7;

const initialState = [
  {
    title: 'Todo',
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        name: 'Luna',
        description: 'Luna will go to the moon',
      },
      {
        id: `card-${1}`,
        name: 'Twitter',
        description: 'Dude, its already on the moon',
      },
      {
        id: `card-${2}`,
        name: 'Whatever',
        description: 'Nah, its going',
      },
    ],
  },
  {
    title: 'Doing',
    id: `list-${1}`,
    cards: [
      {
        id: `card-${3}`,
        name: 'Random',
        description: 'Nah, its going',
      },
      {
        id: `card-${4}`,
        name: 'Code',
        description: 'Nah, its going',
      },
      {
        id: `card-${5}`,
        name: 'Title',
        description: 'Nah, its going',
      },
      {
        id: `card-${6}`,
        name: 'Another Title',
        description: 'Nah, its going',
      },
    ],
  },
];

// eslint-disable-next-line default-param-last
const ListsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      };
      listID += 1;
      return [...state, newList];
    }
    case CONSTANTS.ADD_CARD: {
      const newCard = {
        description: action.payload.description,
        id: `list-${cardID}`,
      };
      cardID += 1;
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
    case CONSTANTS.DRAG_HAPPEND: {
      console.log('happend');
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      } = action.payload;
      const newState = [...state];
      // in the same list
      console.log(droppableIdStart);
      console.log(droppableIdEnd);
      if (droppableIdStart === droppableIdEnd) {
        console.log('it is');
        const list = state.find((listItem) => droppableIdStart === listItem.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        // insert it
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    }
    default:
      return state;
  }
};

export default ListsReducer;
