import React from 'react'

const Click = ({ value, onValueChange }) => (
  <fieldset>
    <legend>Click</legend>
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
  </fieldset>
)

export default Click