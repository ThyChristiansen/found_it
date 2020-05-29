import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addItemSaga() {
  yield takeLatest('ADD_ITEM', addItem);
}


function* addItem(action) {
  try {
    let boxId = action.payload.id
    let roomId = action.payload.roomId
    console.log('----------->from addItem get this room id', roomId);
    console.log('add this item', action.payload);
    yield axios.post(`/api/item/${roomId}/${boxId}`, action.payload);
    console.log('send this item to server', action.payload);
    yield put({
      type: 'FETCH_ITEMS',
      payload: {
        id : boxId,
        roomId :roomId
      }
    });

  } catch (error) {
    console.log('Error with add new item:', error);
  }
}

export default addItemSaga;
