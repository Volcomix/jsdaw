import React from 'react'

import RadialSlider from '../shared/RadialSlider.component'
import Beat from './Beat'
import { keyColor, borderColor } from '../shared/styles'

class BeatComponent extends React.Component {
  static defaultProps = { min: 43, max: 240 }

  constructor(props) {
    super(props)
    this.beat = new Beat(props.context, props.synth)
    this.state = {
      bpm: this.beat.bpm,
      isLooping: false,
      isButtonDown: false,
    }
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
    const { bpm, isLooping, isButtonDown } = this.state
    return (
      <div style={styles.container}>
        <RadialSlider
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
            ...isButtonDown ? styles.buttonDown : styles.buttonUp,
            ...isLooping ? styles.activatedIcon : styles.deactivatedIcon,
            ...styles.icon,
          }}
          onClick={this.handleButtonClick}
          onMouseDown={this.handleButtonDown}
          onMouseOut={this.handleButtonUp}
          onMouseUp={this.handleButtonUp}
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

  handleButtonDown = () => {
    this.setState({ isButtonDown: true })
  }

  handleButtonUp = () => {
    this.setState({ isButtonDown: false })
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
    cursor: 'default',
    userSelect: 'none',
    MozUserSelect: 'none',
    KhtmlUserSelect: 'none',
    WebkitUserSelect: 'none',
    OUserSelect: 'none',
    borderRadius: '50%',
    padding: 4,
    transition: 'box-shadow 150ms',
  },
  deactivatedIcon: {
    color: borderColor,
  },
  activatedIcon: {
    color: keyColor,
  },
  buttonDown: {
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.3), 0px -1px 1px white',
  },
  buttonUp: {
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.3), 0px -5px 5px white',
  },
}

export default BeatComponent