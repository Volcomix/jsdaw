import React from 'react'

import Beat from './core/Beat.component'
import Synth from './synth/Synth.component'
import BassDrumSynth from './synth/BassDrum'
import SnareDrumSynth from './synth/SnareDrum'
import { toName } from './synth/Synth.component'
import Pattern from './pattern/Pattern'
import pattern from './pattern/drum1'

const context = new AudioContext()
const synths = {
  bassDrum: new BassDrumSynth(context, context.destination),
  snareDrum: new SnareDrumSynth(context, context.destination),
}
const beat = new Pattern(context, synths, pattern)

class App extends React.Component {
  state = { selected: 'bassDrum' }

  render() {
    const { selected } = this.state
    return (
      <div style={styles.container}>
        <Beat context={context} pattern={beat} />
        {Object.keys(synths).map(synthName => {
          const synth = synths[synthName]
          return (
            <Synth
              name={toName(synth.constructor.name)}
              key={synthName}
              controls={synth.controls}
              isSelected={selected === synthName}
              onSelect={() => this.handleSynthSelect(synthName)}
            />
          )
        })}
      </div>
    )
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