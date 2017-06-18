import React from 'react'

import ListGroup from '../components/list-group'

class Home extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="home-view">
        <h1>Public Rooms</h1>
        <button onClick={this.props.createRoom}>Create Room</button>
        <ListGroup
          items={this.props.rooms}
          getKey={room => room.id}
          renderItem={room => <span>{room.name}</span>}
          onItemClick={this.props.joinRoom}
        />
      </div>
    )
  }

}

export default Home
