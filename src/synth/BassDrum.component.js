import React from 'react'

import BassDrum from './BassDrum'

class BassDrumComponent extends React.Component {

  constructor(props) {
    super(props)
    this.synth = props.synth
    this.state = {
      duration: this.synth.duration,
      gain: this.synth.gain,
      body: this.synth.body,
      click: this.synth.click,
      pitchBend: this.synth.pitchBend,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synth !== this.props.synth) {
      this.synth = nextProps.synth
    }
  }

  render() {
    const { duration, gain } = this.state
    return (
      <div>
        <input
          type='number'
          min={0}
          step={0.01}
          value={duration}
          onChange={this.handleDurationChange}
        />
        <input
          type='number'
          min={0}
          step={0.01}
          value={gain}
          onChange={this.handleGainChange}
        />
      </div>
    )
  }

  handleDurationChange = event => {
    this.synth.duration = event.target.valueAsNumber
    this.setState({ duration: this.synth.duration })
  }

  handleGainChange = event => {
    this.synth.gain = event.target.valueAsNumber
    this.setState({ gain: this.synth.gain })
  }
}

export default BassDrumComponent