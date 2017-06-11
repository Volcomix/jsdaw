import React from 'react'

import Card from '../../shared/Card.component'

const Click = ({ value, onValueChange }) => (
  <Card title='Click'>
    <label>Duration</label>
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.duration}
      onChange={event => onValueChange({
        duration: event.target.valueAsNumber
      })}
    />
    <label>Frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.frequency}
      onChange={event => onValueChange({
        frequency: event.target.valueAsNumber
      })}
    />
  </Card>
)

export default Click