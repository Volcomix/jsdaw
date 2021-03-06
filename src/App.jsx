import React from 'react'

import Pattern from './pattern/Pattern.component'
import Synth from './synth/Synth.component'

import BassDrum from './synth/BassDrum'
import SnareDrum from './synth/SnareDrum'
import HiHat from './synth/HiHat'

const context = new AudioContext()
const synths = {
  bassDrum: new BassDrum(context, context.destination),
  snareDrum: new SnareDrum(context, context.destination),
  hiHat: new HiHat(context, context.destination),
}

class App extends React.Component {
  state = { selected: 'bassDrum' }

  render() {
    const { selected } = this.state
    return (
      <div style={styles.container}>
        <Pattern context={context} synths={synths} />
        {Object.entries(synths).map(([synthName, synth]) => {
          return (
            <Synth
              key={synthName}
              synth={synth}
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