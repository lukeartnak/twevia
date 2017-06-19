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
        <div className="container">
          <header>
            <img src="/assets/logo.png" alt="Twevia Logo"/>
            <Switch>
              <Route exact path="/" component={HomeHeader} />
              <Route path="/rooms/:name" component={LobbyHeader} />
              <Route path="/questions/create" component={CreateHeader} />
            </Switch>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/rooms/:name" component={Lobby} />
            <Route path="/questions/create" component={Create} />
          </Switch>
        </div>
      </Router>
    )
  }

}

const HomeHeader = () => (
  <h2>Twevia</h2>
)

const LobbyHeader = (props) => (
  <h2>Room {props.match.params.name}</h2>
)

const CreateHeader = () => (
  <h2>Create a Question</h2>
)

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
