import React from 'react'

import { keyColor, borderColor } from '../../shared/styles'
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
            Bass drum
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
    borderLeft: '4px solid white',
    borderRight: '4px solid white',
  },
  selected: {
    backgroundColor: keyColor,
  },
  deselected: {
    backgroundColor: borderColor,
  },
}

export default BassDrum