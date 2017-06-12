import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const PitchBend = ({ value, onValueChange }) => (
  <Card title='Pitch bend'>
    <Knob
      label='Start frequency'
      step={1}
      value={value.startFrequency}
      onValueChange={startFrequency => onValueChange({ startFrequency })}
    />
    <Knob
      label='End frequency'
      step={1}
      value={value.endFrequency}
      onValueChange={endFrequency => onValueChange({ endFrequency })}
    />
    <Knob
      label='Gain'
      step={0.01}
      value={value.gain}
      onValueChange={gain => onValueChange({ gain })}
    />
    <fieldset>
      <legend>Low pass filter</legend>
      <Knob
        label='Frequency'
        step={1}
        value={value.lowPassFilter.frequency}
        onValueChange={frequency => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, frequency }
        })}
      />
      <Knob
        label='Q'
        step={0.01}
        value={value.lowPassFilter.Q}
        onValueChange={Q => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, Q }
        })}
      />
    </fieldset>
  </Card>
)

export default PitchBend