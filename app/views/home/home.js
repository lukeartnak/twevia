import React from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import Button from '../../components/button/button'
import ListGroup from '../../components/list-group/list-group'

import './home.scss'

class HomeView extends React.Component {

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
        <Button theme="action" onClick={this.hostRoom} block>Host a Room</Button>
        <ListGroup
          title="Rooms"
          items={this.state.rooms}
          getKey={room => room.id}
          renderItem={room => <span>{room.name}</span>}
          onItemClick={this.joinRoom}
        />
        <Link to="/questions/create">
          <Button theme="primary" block>Create a Question</Button>
        </Link>
      </div>
    )
  }

}

export default HomeView
