import * as actions from './actionType';
import isEmpty from 'lodash/isEmpty';

// initialiser state user
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function reducer_user (state = initialState, action = {}) {
  // si action est add_current_user
  switch(action.type) {
    case actions.ADD_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
      case actions.LOGOUT:
        return {
          isAuthenticated: false,
          user: {}
        }
      // si non reourne le state
    default: return state;
  }
  

}