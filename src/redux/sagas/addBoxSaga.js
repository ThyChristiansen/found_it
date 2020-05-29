import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addBoxSaga() {
    yield takeLatest('ADD_BOX', addBox);
    yield takeLatest('ADD_FIRST_BOX', addFirstBox);

  }

function* addBox(action) {
  try {
    let roomId = action.payload.id
    console.log('--------> in add box',action.payload.id)
    yield axios.post(`/api/box/${roomId}`);
    console.log('---> send room id of this box to server:',roomId)
    // automatically log a user in after registration
    yield put({
      type: 'FETCH_BOX',
      payload: {id : roomId}
    });  } catch (error) {
      console.log('Error with add new box:', error);
  }
}

function* addFirstBox(action) {
  try {
    let roomId = action.payload.id
    console.log('--------> in add first box',roomId)
    yield axios.post(`/api/box/firstbox/${roomId}`);
    console.log('---> send room id of this box to server:',roomId)
    // automatically log a user in after registration
    yield put({
      type: 'FETCH_BOX',
      payload: {id : roomId}
    });
  } catch (error) {
      console.log('Error with add new box:', error);
  }
}



export default addBoxSaga;
