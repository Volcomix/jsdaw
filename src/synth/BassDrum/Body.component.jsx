import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const Body = ({ value, onValueChange }) => (
  <Card title='Body'>
    <Knob
      label='Frequency'
      step={1}
      value={value.frequency}
      onValueChange={frequency => onValueChange({ frequency })}
    />
    <Knob
      label='Gain'
      step={0.01}
      value={value.gain}
      onValueChange={gain => onValueChange({ gain })}
    />
    <fieldset>
      <legend>Modulator</legend>
      <Knob
        label='Frequency'
        step={1}
        value={value.modulator.frequency}
        onValueChange={frequency => onValueChange({
          modulator: { ...value.modulator, frequency }
        })}
      />
      <Knob
        label='Gain'
        step={1}
        value={value.modulator.gain}
        onValueChange={gain => onValueChange({
          modulator: { ...value.modulator, gain }
        })}
      />
    </fieldset>
    <fieldset>
      <legend>Band pass filter</legend>
      <Knob
        label='Frequency'
        step={1}
        value={value.bandPassFilter.frequency}
        onValueChange={frequency => onValueChange({
          bandPassFilter: { ...value.bandPassFilter, frequency }
        })}
      />
      <Knob
        label='Q'
        step={0.01}
        value={value.bandPassFilter.Q}
        onValueChange={Q => onValueChange({
          bandPassFilter: { ...value.bandPassFilter, Q }
        })}
      />
    </fieldset>
  </Card>
)

export default Body