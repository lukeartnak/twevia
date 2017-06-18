import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import ListGroup from '../components/list-group'
import InputForm from '../components/input-form'

class Lobby extends React.Component {

  constructor(props) {
    super()
    this.submitName = this.submitName.bind(this)
    this.state = {
      player: null,
      players: [],
      questions: []
    }
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('player', ({player}) => {
      this.setState({player})
    })
    this.socket.on('players', ({players}) => {
      this.setState({players})
    })
    this.socket.on('joined', ({player}) => {
      console.log(`${player.name} joined the game!`)
    })
    this.socket.on('left', ({player}) => {
      console.log(`${player.name} left the game!`)
    })
    axios.get(`/api/rooms/${this.props.match.params.name}`)
      .then(response => {
        this.setState({room: response.data})
      })
    axios.get('/api/questions')
      .then(response => {
        this.setState({questions: response.data})
      })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  submitName(name) {
    this.socket.emit('join', {
      room: this.state.room.id,
      name: name
    })
  }

  render() {

    if (!this.state.room) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <div className="lobby">
        <h1>Room {this.state.room.name}</h1>
        {this.state.player ? (
          <div>
            <ListGroup
              items={this.state.players}
              getKey={player => player.id}
              renderHeader={() => <h2>Players</h2>}
              renderItem={player => <span>{player.name}</span>}
            />
            {this.state.questions.length ? (
              <ListGroup
                items={this.state.questions}
                getKey={question => question.id}
                renderHeader={() => <h2>Questions</h2>}
                renderItem={question => <span>{question.title}</span>}
              />
            ) : (
              <span>No Questions</span>
            )}

          </div>
        ) : (
          <InputForm onSubmit={this.submitName} />
        )}
      </div>
    )
  }

}

export default Lobby
