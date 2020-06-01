import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* itemSaga() {
  yield takeEvery('FETCH_ITEMS', fetchItems);
  yield takeLatest('ADD_ITEM', addItem);


}

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems(action) {
    let id = action.payload.id
    let roomId = action.payload.roomId
    // console.log('----> boxs id:',id)
    // console.log('----> get this item from server id:', id)
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        const response = yield axios.get(`/api/item/${id}`, config);
        // console.log('--------in getItem', response.data);
        yield put({
            type: 'SET_ITEM', // set action type = SET_DETAIL
            payload: response.data// set payload equal dispatch that we got from `MovieItem.js`
        })
    } catch (err) {
        console.log('Error in get item', err);
    }
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

export default itemSaga;
