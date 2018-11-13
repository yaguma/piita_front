import axios from 'axios';
import actionCreatorFactory,{ActionCreator, AsyncActionCreators} from 'typescript-fsa';
import { put, call, takeEvery } from "redux-saga/effects";
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// 記事情報
export interface IDoc {
  uuid: string;
  title: string;
  author: string;
  user_id: string;
  posted_at: Date;
}

export interface IDocAction {
  fetchDocs: AsyncActionCreators<{}, IDoc[], {}>;
  selectDoc: ActionCreator<{}>;
}

const actionCreator = actionCreatorFactory();

const fetchDocsAction =
  actionCreator.async<{}, IDoc[], {}>('ACTIONS_FETCH_DOCS')

export const actions: IDocAction = {
  fetchDocs: fetchDocsAction,
  selectDoc: actionCreator<string>('ACTION_SELECT_DOC')
};

const fetchDocs = () => {
  return axios.get('dummyDocs.json')
  .then((res:any)=>{
    const result = res.data.docs;
    return {result}
  })
  .catch((error:any)=>{
    return {error};
  });
}

export function* callFetchDocs() {
  const {result, error} = yield call(fetchDocs);
  if (result) {
    yield put(actions.fetchDocs.done(result));
  } else {
    yield put(actions.fetchDocs.failed(error));
  }
}

export function* rootSaga() {
  yield takeEvery(fetchDocsAction.started.type, callFetchDocs);
}

export interface IDocsState {
  isFetching: boolean;
  error: any;
  docs: IDoc[];
}

const initialState:IDocsState = {
  isFetching: false,
  error: null,
  docs: []
};

export const DocsReducer = reducerWithInitialState(initialState)
    .case(actions.fetchDocs.started, (state) => {
      return Object.assign({}, state, {
        isFetching:true
      })
    })
    .case(actions.fetchDocs.done , (state, action) => {
      return Object.assign({}, state, {
        docs: action,
        isFetching:false
      })
    })
    .case(actions.fetchDocs.failed, (state, action) => {
      return Object.assign({}, state, {
        error: action.error,
        isFetching:false
      })
    });
