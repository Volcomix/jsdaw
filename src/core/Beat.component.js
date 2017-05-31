import React from 'react'

import Knob from '../shared/Knob.component'
import Beat from './Beat'
import { keyColor, borderColor } from '../shared/styles'

class BeatComponent extends React.Component {
  static defaultProps = { min: 43, max: 240 }

  constructor(props) {
    super(props)
    this.beat = new Beat(props.context, props.synth)
    this.state = { bpm: this.beat.bpm, isLooping: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.context !== this.props.context) {
      this.beat.context = nextProps.context
    }
    if (nextProps.synth !== this.props.synth) {
      this.beat.synth = nextProps.synth
    }
  }

  render() {
    const { min, max } = this.props
    const { bpm, isLooping } = this.state
    return (
      <div style={styles.container}>
        <Knob
          width={96}
          lineWidth={1.5}
          knobRadius={10}
          label='bpm'
          min={min}
          max={max}
          value={bpm}
          onValueChange={this.handleBpmChange}
        />
        <i
          className='material-icons'
          style={{ color: isLooping ? keyColor : borderColor, ...styles.icon }}
          onClick={this.handleButtonClick}
        >
          {isLooping ? 'pause_circle_filled' : 'play_circle_filled'}
        </i>
      </div>
    )
  }

  handleBpmChange = bpm => {
    this.beat.bpm = bpm
    this.setState({ bpm })
  }

  handleButtonClick = () => {
    const { isLooping } = this.state
    if (isLooping) {
      this.beat.stop()
    } else {
      this.beat.start()
    }
    this.setState({ isLooping: !isLooping })
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    cursor: 'default',
    userSelect: 'none',
    MozUserSelect: 'none',
    KhtmlUserSelect: 'none',
    WebkitUserSelect: 'none',
    OUserSelect: 'none',
  },
}

export default BeatComponent