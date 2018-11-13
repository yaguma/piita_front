import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import {rootSaga, IDocsState, DocsReducer} from "./modules/docs"

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export interface IAppState {
  router:any,
  docs: IDocsState
};

const logger = createLogger();

const reducer = combineReducers<IAppState>({
  router: connectRouter(history),
  docs: DocsReducer
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

sagaMiddleware.run(rootSaga)
