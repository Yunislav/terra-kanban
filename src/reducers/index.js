import { combineReducers } from 'redux';
import ListsReducer from './listsReducer';

export default combineReducers({
  lists: ListsReducer,
});
