import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* itemSaga() {
  yield takeEvery('FETCH_ITEMS', fetchItems);

}

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems(action) {
    let id = action.payload.id
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


export default itemSaga;
