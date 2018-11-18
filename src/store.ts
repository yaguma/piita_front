import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import { watchFetchDocs, IDocsState, DocsReducer} from "./modules/docs"
import { DocReducer, IDocState, watchFetchDoc } from './modules/doc';
import { all, call } from "redux-saga/effects";

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export interface IAppState {
  router:any,
  docs: IDocsState
  doc: IDocState
};

const logger = createLogger();

const reducer = combineReducers<IAppState>({
  router: connectRouter(history),
  docs: DocsReducer,
  doc: DocReducer
});

const initialState = {
}

export default createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger,
    )
  )
);

function* rootSaga() {
  yield all([
    call(watchFetchDocs),
    call(watchFetchDoc),
  ])
}

sagaMiddleware.run(rootSaga)
