import React from 'react'

import Beat from './core/Beat.component'
import BassDrum from './synth/BassDrum/BassDrum.component'
import BassDrumSynth from './synth/BassDrum/BassDrum'

const context = new AudioContext()
const bassDrumSynth = new BassDrumSynth(context, context.destination)

const App = () => (
  <div>
    <Beat context={context} synth={bassDrumSynth} />
    <BassDrum synth={bassDrumSynth} />
  </div>
)

export default App