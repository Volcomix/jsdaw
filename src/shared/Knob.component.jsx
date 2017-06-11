import React from 'react'

class Knob extends React.Component {
  static defaultProps = { min: 0 }

  render() {
    const { label, min, max, step, value } = this.props
    return (
      <span>
        <label>{label}</label>
        <input
          type='number'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={this.handleInputChange}
        />
      </span>
    )
  }

  handleInputChange = event => {
    this.props.onValueChange(event.target.valueAsNumber)
  }
}

export default Knob