import React from 'react'

const RoomList = ({rooms}) => (
  <ul className="room-list">
    {rooms.map(room => <Room key={room.id} {...room} /> )}
  </ul>
)

const Room = ({id, name}) => (
  <li>{name}</li>
)

export default RoomList
