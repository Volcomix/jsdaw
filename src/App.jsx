import React from 'react'

import { backgroundColor } from './shared/styles.js'
import Beat from './core/Beat.component'
import BassDrum from './synth/BassDrum/BassDrum.component'
import BassDrumSynth from './synth/BassDrum/BassDrum'
import SnareDrum from './synth/SnareDrum/SnareDrum.component'
import SnareDrumSynth from './synth/SnareDrum/SnareDrum'

const context = new AudioContext()
const bassDrumSynth = new BassDrumSynth(context, context.destination)
const snareDrumSynth = new SnareDrumSynth(context, context.destination)

class App extends React.Component {
  state = { selectedSynth: snareDrumSynth }

  render() {
    const { selectedSynth } = this.state
    return (
      <div style={styles.container}>
        <Beat context={context} synth={selectedSynth} />
        <BassDrum
          synth={bassDrumSynth}
          selectedSynth={selectedSynth}
          onSelect={this.handleSynthSelect}
        />
        <SnareDrum
          synth={snareDrumSynth}
          selectedSynth={selectedSynth}
          onSelect={this.handleSynthSelect}
        />
      </div>
    )
  }

  handleSynthSelect = selectedSynth => {
    this.setState({ selectedSynth })
  }
}

const styles = {
  container: {
    backgroundColor,
  },
}

export default App