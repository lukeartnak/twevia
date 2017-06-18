import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Home from './views/home'
import Lobby from './views/lobby'
import Create from './views/create'

class Application extends React.Component {

  constructor() {
    super()
    this.joinRoom = this.joinRoom.bind(this)
    this.hostRoom = this.hostRoom.bind(this)
    this.state = {rooms: [], selectedRoom: null}
  }

  componentDidMount() {
    axios.get('/api/rooms')
      .then(response => {
        let rooms = response.data
        this.setState({rooms})
      })
  }

  joinRoom(room) {
    axios.get(`/api/rooms/${room.name}`)
      .then(response => {
        this.setState({selectedRoom: response.data})
      })
  }

  hostRoom() {
    axios.post('/api/rooms')
      .then(response => {
        let room = response.data
        this.setState({
          rooms: [...this.state.rooms, room],
          selectedRoom: room
        })
      })
  }

  render() {
    return (
      <div className="container">
        {this.state.selectedRoom ? (
          <Lobby room={this.state.selectedRoom} />
        ) : (
          <div>
            <Home
              rooms={this.state.rooms}
              joinRoom={this.joinRoom}
              hostRoom={this.hostRoom}
            />
            <Create />
          </div>

        )}
      </div>
    )
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
