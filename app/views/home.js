import React from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import ListGroup from '../components/list-group'

class Home extends React.Component {

  constructor() {
    super()
    this.joinRoom = this.joinRoom.bind(this)
    this.hostRoom = this.hostRoom.bind(this)
    this.goToRoom = this.goToRoom.bind(this)
    this.state = {rooms: []}
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
        let room = response.data
        this.goToRoom(room)
      })
  }

  hostRoom() {
    axios.post('/api/rooms')
      .then(response => {
        let room = response.data
        this.goToRoom(room)
      })
  }

  goToRoom(room) {
    this.props.history.push(`/rooms/${room.name}`)
  }

  render() {
    return (
      <div className="home-view">
        <h1>Twevia</h1>
        <button onClick={this.hostRoom}>Host a Room</button>
        <Link to="/questions/create">
          <button>Create a Question</button>
        </Link>
        <ListGroup
          items={this.state.rooms}
          getKey={room => room.id}
          renderHeader={() => <h2>Rooms</h2>}
          renderItem={room => <span>{room.name}</span>}
          onItemClick={this.joinRoom}
        />
      </div>
    )
  }

}

export default Home
