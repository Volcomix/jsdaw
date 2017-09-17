import React from 'react'

import RadialSlider from '../shared/RadialSlider.component'
import List from '../shared/List.component'

import DrumPattern from './DrumPattern'
import bassDrum from './bassDrum'
import snareDrum from './snareDrum'
import hiHat from './hiHat'
import drum1 from './drum1'
import drum2 from './drum2'

import { keyColor, borderColor } from '../shared/styles'

import { toName } from '../synth/Synth.component'

const patterns = {
  bassDrum,
  snareDrum,
  hiHat,
  drum1,
  drum2,
}
const defaultPattern = 'drum2'

class PatternComponent extends React.Component {
  static defaultProps = { min: 43, max: 240 }

  constructor(props) {
    super(props)
    this.pattern = new DrumPattern(
      props.context,
      props.synths,
      patterns[defaultPattern]
    )
    this.state = {
      bpm: this.pattern.bpm,
      isLooping: this.pattern.isLooping,
      isButtonDown: false,
      selected: defaultPattern,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.context !== this.props.context) {
      this.pattern.context = nextProps.context
    }
    if (nextProps.synths !== this.props.synths) {
      this.pattern.synths = nextProps.synths
    }
  }

  render() {
    const { min, max } = this.props
    const { bpm, isLooping, isButtonDown, selected } = this.state
    return (
      <div style={styles.container}>
        <List
          items={Object.keys(patterns).reduce((items, name) => {
            items[name] = toName(name)
            return items
          }, {})}
          selected={selected}
          onSelect={this.handlePatternSelect}
        />
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
    this.pattern.bpm = bpm
    this.setState({ bpm })
  }

  handleButtonClick = () => {
    const { isLooping } = this.state
    if (isLooping) {
      this.pattern.stop()
    } else {
      this.pattern.start()
    }
    this.setState({ isLooping: !isLooping })
  }

  handleButtonDown = () => {
    this.setState({ isButtonDown: true })
  }

  handleButtonUp = () => {
    this.setState({ isButtonDown: false })
  }

  handlePatternSelect = selected => {
    this.pattern.pattern = patterns[selected]
    this.setState({ selected })
  }
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 8,
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
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  deactivatedIcon: {
    color: borderColor,
  },
  activatedIcon: {
    color: keyColor,
  },
  buttonDown: {
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.3)',
  },
  buttonUp: {
    boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.3)',
  },
}

export default PatternComponent