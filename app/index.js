import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import CreateView from './views/create/create'
import LobbyView from './views/lobby/lobby'
import HomeView from './views/home/home'

import './index.scss'

class Application extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="nav">
            <Link className="nav__logo" to="/">
              <img src="/assets/logo.png" alt="Twevia Logo"/>
            </Link>
            <Switch>
              <Route exact path="/" component={HomeHeader} />
              <Route path="/rooms/:name" component={LobbyHeader} />
              <Route path="/questions/create" component={CreateHeader} />
            </Switch>
          </div>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/rooms/:name" component={LobbyView} />
            <Route path="/questions/create" component={CreateView} />
          </Switch>
        </div>
      </Router>
    )
  }

}

const HomeHeader = () => (
  <div className="nav__text">Twevia</div>
)

const LobbyHeader = (props) => (
  <div className="nav__text">Room {props.match.params.name}</div>
)

const CreateHeader = () => (
  <div className="nav__text">Create a Question</div>
)

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
