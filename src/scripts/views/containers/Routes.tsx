import * as React from 'react'
import { Route, Switch } from 'react-router'
import ItemsIndex from 'scripts/views/containers/items/ItemsIndex'
import App from 'scripts/views/containers/App'
import Home from 'scripts/views/containers/Home'
import ItemsShow from 'scripts/views/containers/items/ItemsShow'

const Routes: React.SFC<any> = () => {
  return (
    <Switch>
      <Route exact={true} path={'/'} component={Home} />
      <Route exact={true} path={'/app'} component={App} />
      <Route exact={true} path={'/items'} component={ItemsIndex} />
      <Route exact={true} path={'/items/:id'} component={ItemsShow} />
    </Switch>
  )
}

export default Routes
