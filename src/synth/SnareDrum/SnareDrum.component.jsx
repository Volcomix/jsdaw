import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'
import Drum from './Drum.component'
import Snare from './Snare.component'

class SnareDrum extends React.Component {
  constructor(props) {
    super(props)
    this.synth = props.synth
    this.state = {
      duration: this.synth.duration,
      gain: this.synth.gain,
      drum: this.synth.drum,
      snare: this.synth.snare,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synth !== this.props.synth) {
      this.synth = nextProps.synth
    }
  }

  render() {
    const { duration, gain, drum, snare } = this.state
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
        <Drum
          value={drum}
          onValueChange={value => this.handlePartChange('drum', value)}
        />
        <Snare
          value={snare}
          onValueChange={value => this.handlePartChange('snare', value)}
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
  },
}

export default SnareDrum