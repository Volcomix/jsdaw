import React from 'react'

import Beat from './core/Beat.component'
import Synth from './synth/Synth.component'
import BassDrum from './synth/BassDrum/BassDrum.component'
import BassDrumSynth from './synth/BassDrum/BassDrum'
import SnareDrum from './synth/SnareDrum/SnareDrum.component'
import SnareDrumSynth from './synth/SnareDrum/SnareDrum'
import { backgroundColor } from './shared/styles.js'

const context = new AudioContext()
const synths = [
  new BassDrumSynth(context, context.destination),
  new SnareDrumSynth(context, context.destination),
]

class App extends React.Component {
  state = {
    selected: 0,
    controls: synths.map(synth => synth.controls),
  }

  render() {
    const { selected, controls } = this.state
    return (
      <div style={styles.container}>
        <Beat context={context} synth={synths[selected]} />
        <Synth
          name='Bass drum'
          controls={controls[0]}
          onControlsChange={controls => this.handleControlsChange(0, controls)}
          isSelected={selected === 0}
          onSelect={() => this.handleSynthSelect(0)}
        />
        <Synth
          name='Snare drum'
          controls={controls[1]}
          onControlsChange={controls => this.handleControlsChange(1, controls)}
          isSelected={selected === 1}
          onSelect={() => this.handleSynthSelect(1)}
        />
      </div>
    )
  }

  handleControlsChange = (synth, controls) => {
    synths[synth].controls = controls
    this.setState({
      controls: this.state.controls.map((oldControls, index) => {
        if (index === synth) {
          return controls
        } else {
          return oldControls
        }
      })
    })
  }

  handleSynthSelect = selected => {
    this.setState({ selected })
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}

export default App