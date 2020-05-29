import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* boxSaga() {
  yield takeLatest('FETCH_BOX', fetchBox);

}

// worker Saga: will be fired on "FETCH_BOXES" actions
function* fetchBox(action) {
  let room_id = action.payload.id
    console.log('----> room id:',room_id)
    console.log('----> get this box from server id:', room_id)
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    
    const response = yield axios.get(`/api/box/${room_id}`, config);
    console.log('----> Send this boxes to reducer', response.data)

    yield put({ type: 'SET_BOX', payload: response.data });
  } catch (error) {
    console.log('Box get request failed', error);
  }
}




export default boxSaga;
