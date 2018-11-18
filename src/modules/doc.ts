import axios from 'axios';
import actionCreatorFactory,{AsyncActionCreators, Action} from 'typescript-fsa';
import { put, call, takeEvery } from "redux-saga/effects";
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// 記事情報
export interface IDoc {
  uuid: string;
  title: string;
  body?: string;
  author: string;
  user_id: string;
  posted_at: Date;
}

export interface IDocDispatchProps {
  fetchDoc: (uuid:string) => Action<string>;
}
export interface IDocAction {
  fetchDoc: AsyncActionCreators<string, IDoc[], {}>;
}

const actionCreator = actionCreatorFactory();

const fetchDocAction = actionCreator.async<string, IDoc[], {}>('ACTIONS_FETCH_DOC')

export const actions: IDocAction = {
  fetchDoc: fetchDocAction,
};

const fetchDoc = (uuid: string) => {
  return axios.get('/dummyDoc.json?uuid=' + uuid)
  .then((res:any)=>{
    const result = res.data.docs;
    return {result}
  })
  .catch((error:any)=>{
    return {error};
  });
}

function* callFetchDoc(action: any) {
  const {result, error} = yield call(fetchDoc, action.payload);
  if (result) {
    yield put(actions.fetchDoc.done(result));
  } else {
    yield put(actions.fetchDoc.failed(error));
  }
}

export function* watchFetchDoc() {
  yield takeEvery(fetchDocAction.started.type, callFetchDoc);
}

export interface IDocState {
  uuid:string;
  isFetching: boolean;
  error: any;
  doc?: IDoc;
}

const initialState:IDocState = {
  uuid: '',
  isFetching: false,
  error: null,
  doc: undefined
};

export const DocReducer = reducerWithInitialState(initialState)
    .case(actions.fetchDoc.started, (state) => {
      return Object.assign({}, state, {
        isFetching:true
      })
    })
    .case(actions.fetchDoc.done , (state, action) => {
      return Object.assign({}, state, {
        doc: action,
        isFetching:false
      })
    })
    .case(actions.fetchDoc.failed, (state, action) => {
      return Object.assign({}, state, {
        error: action.error,
        isFetching:false
      })
    });
