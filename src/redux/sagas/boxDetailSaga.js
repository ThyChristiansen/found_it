import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* boxDetailSaga() {
  yield takeLatest('FETCH_DETAIL', fetchDetail);
}

// worker Saga: will be fired on "FETCH_DETAIL" actions
function* fetchDetail(action) {
    let id = action.payload.id
    let roomId = action.payload.roomId

    console.log('-----------> room id:', roomId)
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        const response = yield axios.get(`/api/box/${roomId}/${id}`, config);
        console.log('--------in getDetail', response.data);
        console.log('-----------> room id:', roomId)

        yield put({
            type: 'SET_DETAIL', // set action type = SET_DETAIL
            payload: response.data// set payload equal dispatch that we got from `MovieItem.js`
        })
    } catch (err) {
        console.log('Error in get detail', err);
    }
}




export default boxDetailSaga;
