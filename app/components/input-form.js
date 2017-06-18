import React from 'react'

class InputForm extends React.Component {

  constructor(props) {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {value: props.defaultValue}
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.value)
  }

  render() {
    return (
      <form className="input-form" onSubmit={this.handleSubmit}>
        <input type="text" defaultValue={this.state.value} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    )
  }

}

export default InputForm
