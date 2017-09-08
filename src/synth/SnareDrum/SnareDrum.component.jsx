import React from 'react'

import { keyColor, borderColor, backgroundColor } from '../../shared/styles'
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
    const { synth, selectedSynth } = this.props
    return (
      <div style={styles.container}>
        <div
          style={{
            ...styles.handle,
            ...selectedSynth === synth ? styles.selected : styles.deselected,
          }}
          onClick={this.handleSelect}
        >
        </div>
        <div style={styles.main}>
          <span
            style={{
              ...styles.title,
              ...selectedSynth === synth ? styles.selectedTitle : styles.deselectedTitle,
            }}
            onClick={this.handleSelect}
          >
            Snare drum
          </span>
          <div style={styles.mainContent}>
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
          </div>
        </div>
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

  handleSelect = () => {
    this.props.onSelect(this.synth)
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
  container: {
    display: 'flex',
    alignItems: 'stretch',
    marginLeft: 8,
    marginBottom: 4,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 4,
    paddingBottom: 4,
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
    cursor: 'pointer',
  },
  selectedTitle: {
    color: keyColor,
  },
  deselectedTitle: {
    color: borderColor,
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 32,
  },
  handle: {
    alignSelf: 'stretch',
    width: 4,
    borderLeft: `4px solid ${backgroundColor}`,
    borderRight: '4px solid white',
  },
  selected: {
    backgroundColor: keyColor,
  },
  deselected: {
    backgroundColor: borderColor,
  },
}

export default SnareDrum