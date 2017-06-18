import React from 'react'
import io from 'socket.io-client'

import ListGroup from '../components/list-group'
import InputForm from '../components/input-form'

class Lobby extends React.Component {

  constructor() {
    super()
    this.submitName = this.submitName.bind(this)
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
  }

  componentWillUnmount() {
    this.socket.close()
  }

  submitName(name) {
    this.socket.emit('join', {
      room: this.props.room.id,
      name: name
    })
  }

  render() {
    let {name} = this.props.room
    return (
      <div className="lobby">
        <h1>Room {name}</h1>
        {this.state.player ? (
          <ListGroup
            items={this.state.players}
            getKey={player => player.id}
            renderItem={player => <span>{player.name}</span>}
          />
        ) : (
          <InputForm onSubmit={this.submitName} />
        )}
      </div>
    )
  }

}

export default Lobby
