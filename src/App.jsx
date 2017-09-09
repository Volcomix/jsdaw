import React from 'react'

import Beat from './core/Beat.component'
import Synth from './synth/Synth.component'
import BassDrumSynth from './synth/BassDrum'
import SnareDrumSynth from './synth/SnareDrum'
import { toName } from './synth/Synth.component'

const context = new AudioContext()
const synths = [
  new BassDrumSynth(context, context.destination),
  new SnareDrumSynth(context, context.destination),
]

class App extends React.Component {
  state = { selected: 0 }

  render() {
    const { selected } = this.state
    return (
      <div style={styles.container}>
        <Beat context={context} synth={synths[selected]} />
        {synths.map((synth, index) =>
          <Synth
            name={toName(synth.constructor.name)}
            key={index}
            controls={synth.controls}
            isSelected={selected === index}
            onSelect={() => this.handleSynthSelect(index)}
          />
        )}
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