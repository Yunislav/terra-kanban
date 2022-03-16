import { createStore } from 'redux';
import rootReducer from './BoardState';

const store = createStore(rootReducer);

export default store;
