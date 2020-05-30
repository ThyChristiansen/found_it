import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItemSaga() {
    yield takeLatest('DELETE_ITEM', deleteItem);
  }

function* deleteItem(action) {
  try {
    // console.log('---> id for this item:', action.payload.itemId)
    let boxId = action.payload.boxId
    let roomId = action.payload.roomId

    console.log('-----------> id for this room:',roomId)
    yield axios.delete(`/api/item/${action.payload.itemId}`);
    // console.log('---> id for this item:', action.payload.itemId)
    yield put({
      type: 'FETCH_ITEMS',
      payload: {
        id : boxId,
        roomId: roomId,
      }
    });
  } catch (error) {
      console.log('Error with delete item:', error);
  }
}

export default deleteItemSaga;
