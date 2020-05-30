import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* searchSaga() {
    yield takeLatest('SEARCH_ITEM', searchItem);
    yield takeLatest('SEARCH_EMPTY', searchEmptyItem);


}

function* searchItem(action) {
    let searchValue = action.payload.searchItem;
    console.log('------->in searchItem:', searchValue);
    try {
        const response = yield axios.get(`/api/search/${searchValue}`);
        console.log('------->in searchItem:', searchValue);
        yield put({
            type: 'SET_ITEM_SORT', // set action type = SET_ITEM_SORT
            payload: response.data
        })
    } catch (err) {
        console.log('Error in ERROR in GET request for searchSaga', err);
    }
}

function* searchEmptyItem(action) {
    let searchValue = action.payload.searchItem;
    console.log('------->in searchItem:', searchValue);
    try {
        yield put({
            type: 'SET_ITEM_EMPTY',
        })
    } catch (err) {
        console.log('Error in ERROR in GET request for searchSaga', err);
    }
}


export default searchSaga;
