import React, {Component} from 'react'

import './list-group.scss'

class ListGroup extends Component {

  constructor() {
    super()

    this.renderHeader = this.renderHeader.bind(this)
    this.renderItems = this.renderItems.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  render() {
    return (
      <ul className="list-group">
        {this.renderHeader()}
        {this.renderItems()}
        {this.renderFooter()}
      </ul>
    )
  }

  renderHeader() {
    if (!this.props.title) return null

    return (
      <li className="list-group__item list-group--header">
        {this.props.title}
      </li>
    )
  }

  renderItems() {
    return this.props.items.map((item, i) => {
      let key = this.props.getKey ? this.props.getKey(item) : i
      let onClick = () => this.props.onItemClick(item)
      return (
        <li key={key} onClick={onClick} className="list-group__item">
          {this.props.renderItem(item)}
        </li>
      )
    })
  }

  renderFooter() {
    if (!this.props.renderFooter) return null
    return (
      <li className="list-group__item list-group--footer">
        {this.props.renderFooter()}
      </li>
    )
  }

}

export default ListGroup
