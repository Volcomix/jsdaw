import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const Drum = ({ value, onValueChange }) => (
  <Card title='Drum'>
    <Card title='Oscillator 1'>
      <Knob
        label='Freq'
        step={10}
        max={8000}
        value={value.oscillator1.frequency}
        onValueChange={frequency => onValueChange({
          oscillator1: { ...value.oscillator1, frequency }
        })}
      />
      <Knob
        label='Gain'
        step={0.1}
        max={10}
        value={value.oscillator1.gain}
        onValueChange={gain => onValueChange({
          oscillator1: { ...value.oscillator1, gain }
        })}
      />
      <Knob
        label='Duration'
        step={0.01}
        max={10}
        value={value.oscillator1.duration}
        onValueChange={duration => onValueChange({
          oscillator1: { ...value.oscillator1, duration }
        })}
      />
    </Card>
    <Card title='Oscillator 2'>
      <Knob
        label='Freq'
        step={10}
        max={8000}
        value={value.oscillator2.frequency}
        onValueChange={frequency => onValueChange({
          oscillator2: { ...value.oscillator2, frequency }
        })}
      />
      <Knob
        label='Gain'
        step={0.1}
        max={10}
        value={value.oscillator2.gain}
        onValueChange={gain => onValueChange({
          oscillator2: { ...value.oscillator2, gain }
        })}
      />
      <Knob
        label='Duration'
        step={0.01}
        max={10}
        value={value.oscillator2.duration}
        onValueChange={duration => onValueChange({
          oscillator2: { ...value.oscillator2, duration }
        })}
      />
    </Card>
  </Card>
)

export default Drum