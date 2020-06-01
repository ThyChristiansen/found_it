import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import boxSaga from './boxSaga';
import detail from './boxDetailSaga';
import addBoxSaga from './addBoxSaga';
import deleteBoxSaga from './deleteBoxSaga';
import addItemSaga from './addItemSaga';
import itemSaga from './itemSaga';
import deleteItemSaga from './deleteItemSaga';
import updateItemSaga from './updateItemSaga';
import roomSaga from './roomSaga';
import roomNameSaga from './roomNameSaga';
import seachSaga from './seachSaga';
import houseSaga from './houseSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    boxSaga(),
    detail(),
    addBoxSaga(),
    deleteBoxSaga(),
    addItemSaga(),
    itemSaga(),
    deleteItemSaga(),
    updateItemSaga(),
    roomSaga(),
    roomNameSaga(),
    seachSaga(),
    houseSaga(),
  ]);
}
