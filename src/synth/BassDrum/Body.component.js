import React from 'react'

const Body = ({ value, onChange }) => (
  <div>
    <input
      type='number'
      min={0}
      step={1}
      value={value.frequency}
      onChange={event => onChange({
        ...value,
        frequency: event.target.valueAsNumber
      })}
    />
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.gain}
      onChange={event => onChange({
        ...value,
        gain: event.target.valueAsNumber
      })}
    />
  </div>
)

export default Body