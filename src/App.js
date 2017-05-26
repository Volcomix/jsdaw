import React from 'react'

import Beat from './Beat.component'
import BassDrum from './BassDrum'

const context = new AudioContext()
const bassDrum = new BassDrum(context, context.destination)

const App = () => (
  <Beat min={43} max={240} context={context} synth={bassDrum} />
)

export default App