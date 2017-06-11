import React from 'react'

import Body from './Body.component'
import Click from './Click.component'

class BassDrum extends React.Component {

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
    const { duration, gain, body, click } = this.state
    return (
      <div>
        <label>Duration</label>
        <input
          type='number'
          min={0}
          step={0.01}
          value={duration}
          onChange={this.handleDurationChange}
        />
        <label>Gain</label>
        <input
          type='number'
          min={0}
          step={0.01}
          value={gain}
          onChange={this.handleGainChange}
        />
        <Body value={body} onChange={this.handleBodyChange} />
        <Click value={click} onChange={this.handleClickChange} />
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

  handleBodyChange = body => {
    this.synth.body = body
    this.setState({ body })
  }

  handleClickChange = click => {
    this.synth.click = click
    this.setState({ click })
  }
}

export default BassDrum