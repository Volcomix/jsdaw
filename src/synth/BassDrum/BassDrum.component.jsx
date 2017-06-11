import React from 'react'

import Body from './Body.component'
import Click from './Click.component'
import PitchBend from './PitchBend.component'

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
    const { duration, gain, body, click, pitchBend } = this.state
    return (
      <div>
        <label>Duration</label>
        <input
          type='number'
          min={0}
          step={0.01}
          value={duration}
          onChange={event => this.handleInputChange('duration', event)}
        />
        <label>Gain</label>
        <input
          type='number'
          min={0}
          step={0.01}
          value={gain}
          onChange={event => this.handleInputChange('gain', event)}
        />
        <Body
          value={body}
          onValueChange={value => this.handleValueChange('body', value)}
        />
        <Click
          value={click}
          onValueChange={value => this.handleValueChange('click', value)}
        />
        <PitchBend
          value={pitchBend}
          onValueChange={value => this.handleValueChange('pitchBend', value)}
        />
      </div>
    )
  }

  handleInputChange = (key, event) => {
    this.synth[key] = event.target.valueAsNumber
    this.setState({ [key]: this.synth[key] })
  }

  handleValueChange = (key, nextValue) => {
    const value = this.state[key]
    this.synth[key] = { ...value, ...nextValue }
    this.setState({ [key]: this.synth[key] })
  }
}

export default BassDrum