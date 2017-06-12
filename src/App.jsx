import React from 'react'

import { backgroundColor } from './shared/styles.js'
import Beat from './core/Beat.component'
import BassDrum from './synth/BassDrum/BassDrum.component'
import BassDrumSynth from './synth/BassDrum/BassDrum'

const context = new AudioContext()
const bassDrumSynth = new BassDrumSynth(context, context.destination)

const App = () => (
  <div style={styles.container}>
    <Beat context={context} synth={bassDrumSynth} />
    <BassDrum synth={bassDrumSynth} />
  </div>
)

const styles = {
  container: {
    backgroundColor,
  },
}

export default App