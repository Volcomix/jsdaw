import React from 'react'

import Knob from '../shared/Knob.component'
import Beat from './Beat'
import { keyColor, borderColor, backgroundColor } from '../shared/styles'

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
          style={{
            ...isLooping ? styles.activatedIcon : styles.deactivatedIcon,
            ...styles.icon
          }}
          onClick={this.handleButtonClick}
        >
          {isLooping ? 'pause' : 'play_arrow'}
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
    borderRadius: '50%',
    padding: 4,
  },
  deactivatedIcon: {
    color: `${borderColor}88`,
    textShadow: `0px 2px 2px ${backgroundColor}, 0px 0px 0px rgba(0, 0, 0, 0.5)`,
    boxShadow: `
      inset 0px 3px 1px white,
      inset 0px -3px 1px rgba(0, 0, 0, 0.2),
      0px 3px 5px white,
      0px -3px 5px rgba(0, 0, 0, 0.2)
    `,
  },
  activatedIcon: {
    color: `${keyColor}cc`,
    textShadow: '0px 3px 3px white, 0px 0px 0px black',
    boxShadow: `
      inset 0px 3px 1px white,
      inset 0px -3px 1px rgba(0, 0, 0, 0.2),
      0px 0px 4px ${keyColor},
      0px 3px 5px white,
      0px -3px 5px rgba(0, 0, 0, 0.2)
    `,
  },
}

export default BeatComponent