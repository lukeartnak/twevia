import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './views/home'
import Lobby from './views/lobby'
import Create from './views/create'

import './index.scss'

class Application extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/:name" component={Lobby} />
          <Route path="/questions/create" component={Create} />
        </Switch>
      </Router>
    )
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
