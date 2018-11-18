import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import store from './store'
import Theme from './theme'
import { createBrowserHistory } from 'history';
import docsContainer from './containers/docsContainer';
import docContainer from './containers/docContainer';

const history = createBrowserHistory()

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path={'/'} component={docsContainer} />
          <Route exact={true} path={'/docs'} component={docsContainer} />
          <Route exact={true} path={'/docs/:uuid'} component={docContainer} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
