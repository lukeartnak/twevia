import React from 'react'

const ListGroup = ({items, renderHeader, renderItem, getKey, onItemClick}) => (
  <ul className="list-group">
    {renderHeader ? (
      <li className="list-group__item list-group--header">
        {renderHeader()}
      </li>
    ) : null}
    {items.map((item, i) => (
      <li className="list-group__item"
        key={getKey ? getKey(item) : i}
        onClick={onItemClick ? onItemClick.bind(this, item) : null}
      >
        {renderItem(item)}
      </li>
    ))}
  </ul>
)

export default ListGroup
