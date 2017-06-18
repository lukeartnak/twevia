import React from 'react'
import io from 'socket.io-client'

class Lobby extends React.Component {

  constructor() {
    super()
    this.updateName = this.updateName.bind(this)
    this.submitName = this.submitName.bind(this)
    this.state = {name: '', hasName: false}
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('joined', data => {
      console.log(`${data.name} joined the game!`)
    })
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
    this.setState({hasName: true})
  }

  render() {
    let {room} = this.props
    return (
      <div className="lobby">
        <h1>Room {room.name}</h1>
        {this.state.hasName ? (
          <span>Welcome {this.state.name}</span>
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
