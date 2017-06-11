import React from 'react'

const Click = ({ value, onChange }) => (
  <fieldset>
    <legend>Click</legend>
    <label>Duration</label>
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.duration}
      onChange={event => onChange({ duration: event.target.valueAsNumber })}
    />
    <label>Frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.frequency}
      onChange={event => onChange({ frequency: event.target.valueAsNumber })}
    />
  </fieldset>
)

export default Click