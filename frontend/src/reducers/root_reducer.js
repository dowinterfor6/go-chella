import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import groups from './groups_reducer';
import acts from './acts_reducer';
import ui from './ui_reducer';
import users from './user_reducer';

const rootReducer = combineReducers({
  session,
  users,
  errors, 
  groups,
  acts,
  ui
});

export default rootReducer;