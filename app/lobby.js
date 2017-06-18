import React from 'react'
import io from 'socket.io-client'

class Lobby extends React.Component {

  constructor() {
    super()
    this.updateName = this.updateName.bind(this)
    this.submitName = this.submitName.bind(this)
    this.state = {
      name: '',
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

  updateName(e) {
    this.setState({name: e.target.value})
  }

  submitName(e) {
    e.preventDefault();
    this.socket.emit('join', {
      room: this.props.room.id,
      name: this.state.name
    })
  }

  render() {
    let {room} = this.props
    return (
      <div className="lobby">
        <h1>Room {room.name}</h1>
        {this.state.player ? (
          <ul className="player-list">
            {this.state.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        ) : (
          <form onSubmit={this.submitName}>
            <label>Enter name</label>
            <input type="text" onChange={this.updateName} />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    )
  }

}

export default Lobby
