import React from 'react'

import Card from '../../shared/Card.component'
import KnobSet from '../../shared/KnobSet.component'
import Knob from '../../shared/Knob.component'

const PitchBend = ({ value, onValueChange }) => (
  <Card title='Pitch bend'>
    <Knob
      label='Start freq'
      step={10}
      max={8000}
      value={value.startFrequency}
      onValueChange={startFrequency => onValueChange({ startFrequency })}
    />
    <Knob
      label='End freq'
      step={10}
      max={8000}
      value={value.endFrequency}
      onValueChange={endFrequency => onValueChange({ endFrequency })}
    />
    <Knob
      label='Gain'
      step={0.1}
      max={10}
      value={value.gain}
      onValueChange={gain => onValueChange({ gain })}
    />
    <KnobSet title='Low pass filter'>
      <Knob
        label='Freq'
        step={10}
        max={8000}
        value={value.lowPassFilter.frequency}
        onValueChange={frequency => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, frequency }
        })}
      />
      <Knob
        label='Q'
        step={0.1}
        max={10}
        value={value.lowPassFilter.Q}
        onValueChange={Q => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, Q }
        })}
      />
    </KnobSet>
  </Card>
)

export default PitchBend