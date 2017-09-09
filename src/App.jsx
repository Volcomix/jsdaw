import React from 'react'

import Beat from './core/Beat.component'
import Synth from './synth/Synth.component'
import BassDrumSynth from './synth/BassDrum'
import SnareDrumSynth from './synth/SnareDrum'
import { backgroundColor } from './shared/styles.js'
import { toName } from './synth/Synth.component'

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
        {synths.map((synth, index) =>
          <Synth
            name={toName(synth.constructor.name)}
            key={index}
            controls={controls[index]}
            onControlsChange={controls =>
              this.handleControlsChange(index, controls)
            }
            isSelected={selected === index}
            onSelect={() => this.handleSynthSelect(index)}
          />
        )}
      </div>
    )
  }

  handleControlsChange = (synthIndex, controls) => {
    synths[synthIndex].controls = controls
    this.setState({
      controls: this.state.controls.map((oldControls, controlsIndex) => {
        if (controlsIndex === synthIndex) {
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