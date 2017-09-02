import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'
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
      <div style={styles.main}>
        <Card title='Main'>
          <Knob
            label='Duration'
            step={0.1}
            max={10}
            value={duration}
            onValueChange={value => this.handleKnobChange('duration', value)}
          />
          <Knob
            label='Gain'
            step={0.1}
            max={10}
            value={gain}
            onValueChange={value => this.handleKnobChange('gain', value)}
          />
        </Card>
        <Body
          value={body}
          onValueChange={value => this.handlePartChange('body', value)}
        />
        <PitchBend
          value={pitchBend}
          onValueChange={value => this.handlePartChange('pitchBend', value)}
        />
        <Click
          value={click}
          onValueChange={value => this.handlePartChange('click', value)}
        />
      </div>
    )
  }

  handleKnobChange = (key, value) => {
    this.synth[key] = value
    this.setState({ [key]: value })
  }

  handlePartChange = (key, nextValue) => {
    const value = this.state[key]
    this.synth[key] = { ...value, ...nextValue }
    this.setState({ [key]: this.synth[key] })
  }
}

const styles = {
  main: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 12,
  },
}

export default BassDrum