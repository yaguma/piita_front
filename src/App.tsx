import * as React from 'react';
import './App.css';
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route } from 'react-router';
import {DocsComponent} from './components/docsComponent'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path="/" component={DocsComponent} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;




