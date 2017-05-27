import React from 'react'

import Beat from './Beat'

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
      <div>
        <input
          type='range'
          min={min}
          max={max}
          step={1}
          value={bpm}
          onChange={this.handleBpmChange}
        />
        <input
          type='number'
          min={min}
          max={max}
          step={1}
          value={bpm}
          onChange={this.handleBpmChange}
        />
        <button onClick={this.handleButtonClick}>
          {isLooping ? 'Stop' : 'Play'}
        </button>
      </div>
    )
  }

  handleBpmChange = (event) => {
    this.beat.bpm = event.target.value
    this.setState({ bpm: this.beat.bpm })
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

export default BeatComponent