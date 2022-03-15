// eslint-disable-next-line import/no-cycle
import { CONSTANTS } from './index';

export const addList = (title) => ({
  type: CONSTANTS.ADD_LIST,
  payload: title,
});

export const updateList = (title) => ({
  type: CONSTANTS.UPDATE_LIST,
  payload: title,
});
