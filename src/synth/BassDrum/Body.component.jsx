import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const Body = ({ value, onValueChange }) => (
  <Card title='Body'>
    <Knob
      label='Freq'
      step={1}
      max={8000}
      value={value.frequency}
      onValueChange={frequency => onValueChange({ frequency })}
    />
    <Knob
      label='Gain'
      step={0.01}
      max={10}
      value={value.gain}
      onValueChange={gain => onValueChange({ gain })}
    />
    <Card title='Modulator'>
      <Knob
        label='Freq'
        step={1}
        max={8000}
        value={value.modulator.frequency}
        onValueChange={frequency => onValueChange({
          modulator: { ...value.modulator, frequency }
        })}
      />
      <Knob
        label='Gain'
        step={1}
        max={10000}
        value={value.modulator.gain}
        onValueChange={gain => onValueChange({
          modulator: { ...value.modulator, gain }
        })}
      />
    </Card>
    <Card title='Band pass filter'>
      <Knob
        label='Freq'
        step={1}
        max={8000}
        value={value.bandPassFilter.frequency}
        onValueChange={frequency => onValueChange({
          bandPassFilter: { ...value.bandPassFilter, frequency }
        })}
      />
      <Knob
        label='Q'
        step={0.01}
        max={10}
        value={value.bandPassFilter.Q}
        onValueChange={Q => onValueChange({
          bandPassFilter: { ...value.bandPassFilter, Q }
        })}
      />
    </Card>
  </Card>
)

export default Body