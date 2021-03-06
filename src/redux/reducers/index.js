import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import boxes from './boxReducer';
import detail from './boxDetailReducer';
import qrCode from './qrCodeReducer';
import item from './itemReducer';
import rooms from './roomReducer';
import roomName from './roomNameReducer';
import searchItem from './searchItemReducer';
import houseName from './houseNameReducer';
import allBox from './allBoxReducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  boxes,
  detail,
  qrCode,
  item,
  rooms,
  roomName,
  searchItem,
  houseName,
  allBox,
});

export default rootReducer;
