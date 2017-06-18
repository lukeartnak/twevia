import React from 'react'

class Lobby extends React.Component {

  constructor() {
    super()
  }

  render() {
    let {room} = this.props
    return (
      <div className="lobby">
        <h1>Room {room.name}</h1>
      </div>
    )
  }

}

export default Lobby
