import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer';
import groups from './groups_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  session,
  errors, 
  groups,
  ui
});

export default rootReducer;