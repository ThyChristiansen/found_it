import axios from 'axios';

import { put, takeEvery, takeLatest } from 'redux-saga/effects';
const FormData = require('form-data');



function* itemSaga() {
  yield takeEvery('FETCH_ITEMS', fetchItems);
  yield takeLatest('ADD_ITEM', addItem);
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

// function* addItem(action) {
//   try {
//     let boxId = action.payload.itemData.id
//     let roomId = action.payload.itemData.roomId
//     let item = action.payload.itemData.item


//     console.log('----------->from addItem get this room id', roomId);
//     console.log('add this item', action.payload.itemData.item);
//     yield axios.post(`/api/item/${roomId}/${boxId}`, action.payload);
//     // console.log('send this item to server', action.payload.itemData.item);
//     yield put({
//       type: 'FETCH_ITEMS',
//       payload: {
//         id: boxId,
//         roomId: roomId
//       }
//     });


//   } catch (error) {
//     console.log('Error with add new item:', error);
//   }
// }

function* addItem(action) {
  try {
    let boxId = action.payload.itemData.id
    let roomId = action.payload.itemData.roomId
    let item = action.payload.itemData.item

    const data = new FormData();
    data.append('file', action.payload.file)

    for (const [key, value] of Object.entries(action.payload.itemData)) {
      data.append(key, value);
    }

    console.log('----------->formdata', action.payload.file.type);
    console.log('----------->item data', action.payload.itemData.item);


    console.log('----------->from addItem get this room id', roomId);
    console.log('add this item', action.payload);
    yield axios.post(`/api/item/${roomId}/${boxId}`, data, action.payload, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': action.payload.file.type,
      }
    });
    console.log('send this item to server', action.payload.itemData.item);
    yield put({
      type: 'FETCH_ITEMS',
      payload: {
        id: boxId,
        roomId: roomId
      }
    });


  } catch (error) {
    console.log('Error with add new item:', error);
  }
}

export default itemSaga;
