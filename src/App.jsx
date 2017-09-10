import React from 'react'

import Pattern from './pattern/Pattern.component'
import Synth from './synth/Synth.component'

import BassDrumSynth from './synth/BassDrum'
import SnareDrumSynth from './synth/SnareDrum'

import { toName } from './synth/Synth.component'

const context = new AudioContext()
const synths = {
  bassDrum: new BassDrumSynth(context, context.destination),
  snareDrum: new SnareDrumSynth(context, context.destination),
}

class App extends React.Component {
  state = { selected: 'bassDrum' }

  render() {
    const { selected } = this.state
    return (
      <div style={styles.container}>
        <Pattern context={context} synths={synths} />
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