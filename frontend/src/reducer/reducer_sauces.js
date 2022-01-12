import * as actions from './actionType'
// initialiser state sauces
const initialState = {
  sauces : [],
  sauce: {}
};

export default function reducer_sauces ( state = initialState, action = {} ) {
  switch (action.type) {
    case actions.GETALLSAUCE :
      return {
        ...state,
        sauces: action.sauces
      };
    case actions.GETONESAUCE :
      return {
        ...state,
        sauce: action.sauce
      }
    default: return state
  }
    
}