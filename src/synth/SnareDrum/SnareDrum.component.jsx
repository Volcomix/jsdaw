import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

class SnareDrum extends React.Component {
  constructor(props) {
    super(props)
    this.synth = props.synth
    this.state = {
      duration: this.synth.duration,
      gain: this.synth.gain,
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
      </div>
    )
  }

  handleKnobChange = (key, value) => {
    this.synth[key] = value
    this.setState({ [key]: value })
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