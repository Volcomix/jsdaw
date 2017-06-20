import React from 'react'

import Card from '../../shared/Card.component'
import Knob from '../../shared/Knob.component'

const Click = ({ value, onValueChange }) => (
  <Card title='Click'>
    <Knob
      label='Duration'
      step={0.1}
      max={10}
      value={value.duration}
      onValueChange={duration => onValueChange({ duration })}
    />
    <Knob
      label='Freq'
      step={10}
      max={8000}
      value={value.frequency}
      onValueChange={frequency => onValueChange({ frequency })}
    />
  </Card>
)

export default Click