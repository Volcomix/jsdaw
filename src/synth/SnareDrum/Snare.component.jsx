import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const Snare = ({ value, onValueChange }) => (
  <Card title='Snare'>
    <Knob
      label='Snappy'
      step={0.01}
      max={10}
      value={value.snappy}
      onValueChange={snappy => onValueChange({ snappy })}
    />
    <Card title='Low pass filter'>
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
        label='Gain'
        step={0.1}
        max={10}
        value={value.lowPassFilter.gain}
        onValueChange={gain => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, gain }
        })}
      />
      <Knob
        label='Duration'
        step={0.01}
        max={10}
        value={value.lowPassFilter.duration}
        onValueChange={duration => onValueChange({
          lowPassFilter: { ...value.lowPassFilter, duration }
        })}
      />
    </Card>
    <Card title='High pass filter'>
      <Knob
        label='Freq'
        step={10}
        max={8000}
        value={value.highPassFilter.frequency}
        onValueChange={frequency => onValueChange({
          highPassFilter: { ...value.highPassFilter, frequency }
        })}
      />
      <Knob
        label='Gain'
        step={0.1}
        max={10}
        value={value.highPassFilter.gain}
        onValueChange={gain => onValueChange({
          highPassFilter: { ...value.highPassFilter, gain }
        })}
      />
      <Knob
        label='Duration'
        step={0.01}
        max={10}
        value={value.highPassFilter.duration}
        onValueChange={duration => onValueChange({
          highPassFilter: { ...value.highPassFilter, duration }
        })}
      />
    </Card>
  </Card>
)

export default Snare