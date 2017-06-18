import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import RoomList from './room-list'
import Lobby from './lobby'

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

  joinRoom(name) {
    axios.get(`/api/rooms/${name}`)
      .then(response => {
        this.setState({selectedRoom: response.data})
      })
  }

  render() {
    return (
      <div className="container">
        {this.state.selectedRoom ? (
          <div className="room-lobby">
            <Lobby room={this.state.selectedRoom} />
          </div>
        ) : (
          <div className="public-rooms">
            <h1>Public Rooms</h1>
            <button onClick={this.createRoom}>Create Room</button>
            <RoomList rooms={this.state.rooms} onClick={this.joinRoom} />
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
