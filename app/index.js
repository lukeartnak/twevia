import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import RoomList from './room-list'

class Application extends React.Component {

  constructor() {
    super()
    this.createRoom = this.createRoom.bind(this)
    this.state = {rooms: []}
  }

  componentDidMount() {
    axios.get('/api/rooms')
      .then(response => {
        this.setState({rooms: response.data})
      })
  }

  createRoom() {

    axios.post('/api/rooms')
      .then(response => {
        let room = response.data
        this.setState({rooms: [...this.state.rooms, room]})
      })

  }

  render() {
    return (
      <div className="container">
        <RoomList rooms={this.state.rooms} />
        <button onClick={this.createRoom}>Create Room</button>
      </div>
    )
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('app')
)
