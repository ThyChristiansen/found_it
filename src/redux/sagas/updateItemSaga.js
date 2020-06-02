import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateItemSaga() {
    yield takeLatest('UPDATE_ITEM', updateItem);
  }

function* updateItem(action) {
  try {
    // console.log('---> id for this item:', action.payload.itemId)
        console.log('---> send this item:', action.payload.item)

    let boxId = action.payload.boxId
    // console.log('---> id for this box:',boxId)
    yield axios.put(`/api/box/${action.payload.boxId}`,action.payload );
    console.log('---> send this item to server:', action.payload.item)

    // console.log('---> id for this item:', action.payload.itemId)
    yield put({
      type: 'FETCH_BOX',
      payload: {id : boxId}
    });
  } catch (error) {
      console.log('Error with update item:', error);
  }
}

export default updateItemSaga;
