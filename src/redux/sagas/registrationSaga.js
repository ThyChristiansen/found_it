import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* registerUser(action) {
  console.log("-------> here");
  try {
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });
    //window.location.replace("http://localhost:3000/home");


    yield axios.post("/api/user/register", action.payload);
    console.log("-------> here2");


    yield put({ type: "LOGIN", payload: action.payload });
    console.log(action.payload);

    yield put({ type: "SET_TO_LOGIN_MODE" });
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
}

export default registrationSaga;
