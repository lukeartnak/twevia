import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import Lobby from './lobby/lobby'
import Game from './game/game'

import './room.scss'

class RoomView extends React.Component {

  constructor() {
    super()

    this.handleNameSubmit = this.handleNameSubmit.bind(this)
    this.handleGuessSubmit = this.handleGuessSubmit.bind(this)
    this.handleQuestionSelect = this.handleQuestionSelect.bind(this)
    this.handleGameStart = this.handleGameStart.bind(this)
    this.state = {
      player: null,
      players: []
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
  }

  componentWillUnmount() {
    this.socket.close()
  }

  handleNameSubmit(name) {
    this.socket.emit('join', {
      room: this.state.room.id,
      name: name
    })
  }

  handleGuessSubmit(guess) {
    this.socket.emit('guess', {
      room: this.state.room.id,
      player: this.state.player.id,
      guess: guess
    })
  }

  handleQuestionSelect(id) {
    axios.get(`/api/questions/${id}`)
      .then(response => {
        this.setState({question: response.data})
      })
  }

  handleGameStart() {
    this.setState({inProgress: true})
  }

  render() {

    if (!this.state.room) return <h1>Loading...</h1>

    return (
      <div className="room-view">
        {this.state.inProgress ? (
          <Game
            answers={this.state.question.answers}
            onGuessSubmit={this.handleGuessSubmit}
          />
        ) : (
          <Lobby
            player={this.state.player}
            players={this.state.players}
            onNameSubmit={this.handleNameSubmit}
            onQuestionSelect={this.handleQuestionSelect}
            onGameStart={this.handleGameStart}
          />
        )}
      </div>
    )
  }

}

export default RoomView
