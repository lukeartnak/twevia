import React from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import Lobby from './lobby/lobby'

import './room.scss'

class RoomView extends React.Component {

  constructor() {
    super()

    this.handleNameSubmit = this.handleNameSubmit.bind(this)
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

  render() {

    if (!this.state.room) return <h1>Loading...</h1>

    return (
      <div className="room-view">
        {this.state.inProgress ? (
          null
        ) : (
          <Lobby player={this.state.player} players={this.state.players} onNameSubmit={this.handleNameSubmit} />
        )}
      </div>
    )
  }

}

export default RoomView
