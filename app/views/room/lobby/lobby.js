import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import InputForm from '../../../components/input-form/input-form'
import ListGroup from '../../../components/list-group/list-group'

import './lobby.scss'

class Lobby extends React.Component {

  constructor() {
    super()

    this.submitName = this.submitName.bind(this)
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    axios.get('/api/questions')
      .then(response => {
        this.setState({questions: response.data})
      })
  }

  submitName(name) {
    this.props.onNameSubmit(name)
  }

  render() {
    return (
      <div className="lobby">
        {this.props.player ? (
          <div>
            <ListGroup
              title="Players"
              items={this.props.players}
              getKey={player => player.id}
              renderItem={player => <span>{player.name}</span>}
            />
            <ListGroup
              title="Questions"
              items={this.state.questions}
              getKey={question => question.id}
              renderItem={question => <span>{question.title}</span>}
            />
          </div>
        ) : (
          <InputForm onSubmit={this.submitName} />
        )}
      </div>
    )
  }

}

export default Lobby
