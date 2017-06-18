import React from 'react'

const RoomList = ({rooms, onClick}) => (
  <ul className="room-list">
    {rooms.map(room => <Room key={room.id} onClick={onClick} {...room} /> )}
  </ul>
)

const Room = ({name, onClick}) => (
  <li onClick={onClick.bind(this, name)}>{name}</li>
)

export default RoomList
