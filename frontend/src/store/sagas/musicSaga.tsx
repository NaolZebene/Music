import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  fetchMusicFailure,
  fetchMusicRequest,
  fetchMusicSuccess,
  addMusicRequest,
  updateMusicRequest,
  updateMusicFailure,
  updateMusicSuccess,
  deleteMusicRequest,
  deleteMusicFailure,
  deleteMusicSuccess,
  addMusicSuccess,
  addMusicFailure,
  fetchDataFailure,
  fetchDataRequest, 
  fetchDataSuccess, 
  fetchAllFailure, 
  fetchAllRequest,
  fetchAllSuccess
} from "../musicSlice";

function* fetchMusicSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() => axios.get("http://localhost:5000/music"));
    yield put(fetchMusicSuccess(response.data.payload));
  } catch (error: any) {
    yield put(fetchMusicFailure(error.message));
  }
}

function* addMusicSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      axios.post("http://localhost:5000/music", action.payload)
    );
    console.log("res", response);
    yield put(addMusicSuccess(response.data.payload));
  } catch (error: any) {
    yield put(addMusicFailure(error.message));
  }
}

function* updateMusicSaga(action:any): Generator<any, void, any> {
  try {
    const response = yield call(() => axios.put(`http://localhost:5000/music/${action.payload._id}`, action.payload));
    console.log(action.payload, "response")
    yield put(updateMusicSuccess(action.payload));
  } catch (error: any) {
    yield put(updateMusicFailure(error.message));
  }
}

function* deleteMusicSaga(action:any): Generator<any, void, any> {
  try {
    const response = yield call(() =>
      axios.delete(`http://localhost:5000/music/${action.payload}`)
    );
    yield put(deleteMusicSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteMusicFailure(error.message));
  }
}

function* fetchDataSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() => axios.get("http://localhost:5000/music/total"));
    yield put(fetchDataSuccess(response.data.payload));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

function* fetchAllSaga(): Generator<any, void, any> {
  try {
    const response = yield call(() => axios.get("http://localhost:5000/music/totalinfo"));
    yield put(fetchAllSuccess(response.data.payload));
  } catch (error: any) {
    yield put(fetchAllFailure(error.message));
  }
}


export function* musicSaga() {
  yield takeLatest(fetchMusicRequest.type, fetchMusicSaga);
  yield takeLatest(addMusicRequest.type, addMusicSaga);
  yield takeLatest(updateMusicRequest.type, updateMusicSaga);
  yield takeLatest(deleteMusicRequest.type, deleteMusicSaga);
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
  yield takeLatest(fetchDataRequest.type, fetchAllSaga);
}
