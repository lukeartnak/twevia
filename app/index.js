import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Home from './views/home'
import Lobby from './views/lobby'

class Application extends React.Component {

  constructor() {
    super()
    this.createRoom = this.createRoom.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.state = {rooms: [], selectedRoom: null}
  }

  componentDidMount() {
    axios.get('/api/rooms')
      .then(response => {
        let rooms = response.data
        this.setState({rooms})
      })
  }

  createRoom() {
    axios.post('/api/rooms')
      .then(response => {
        let room = response.data
        this.setState({rooms: [...this.state.rooms, room]})
      })
  }

  joinRoom(room) {
    axios.get(`/api/rooms/${room.name}`)
      .then(response => {
        this.setState({selectedRoom: response.data})
      })
  }

  render() {
    return (
      <div className="container">
        {this.state.selectedRoom ? (
          <Lobby room={this.state.selectedRoom} />
        ) : (
          <Home
            rooms={this.state.rooms}
            createRoom={this.createRoom}
            joinRoom={this.joinRoom}
          />
        )}
      </div>
    )
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
