// eslint-disable-next-line import/no-cycle
import { CONSTANTS } from './index';

export const addCard = (listID, description) => ({
  type: CONSTANTS.ADD_CARD,
  payload: { description, listID },
});
