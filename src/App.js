import React from 'react'

import Beat from './core/Beat.component'
import BassDrum from './synth/BassDrum'

const context = new AudioContext()
const bassDrum = new BassDrum(context, context.destination)

const App = () => (
  <Beat context={context} synth={bassDrum} />
)

export default App