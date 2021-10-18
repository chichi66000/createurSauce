import {combineReducers} from 'redux';
import UserReducer from './reducer_user';
import SaucesReducer from './reducer_sauces';
// combine all the reducer dans one big object; then import this one to the store
const allReducers = combineReducers({
  auth: UserReducer,
  sauces: SaucesReducer
})

export default allReducers;