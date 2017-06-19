import React from 'react'

import './list-group.scss'

const ListGroup = ({title, items, renderItem, renderFooter, getKey, onItemClick}) => (
  <ul className="list-group">
    {title ? (
      <li className="list-group__item list-group--header">{title}</li>
    ) : null}
    {items.map((item, i) => (
      <li className="list-group__item"
        key={getKey ? getKey(item) : i}
        onClick={onItemClick ? onItemClick.bind(this, item) : null}
      >
        {renderItem(item)}
      </li>
    ))}
    {renderFooter ? (
      <li className="list-group__item">{renderFooter()}</li>
    ) : null}
  </ul>
)

export default ListGroup
