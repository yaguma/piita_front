import * as React from 'react'
import { Route, Switch } from 'react-router'
import {DocsComponent} from '../components/docsComponent'

const routes = (
  <div>
    <Switch>
      <Route exact={true} path="/" component={DocsComponent} />
      {/* <Route path="/counter" component={Counter} />
      <Route component={NoMatch} /> */}
    </Switch>
  </div>
)

export default routes