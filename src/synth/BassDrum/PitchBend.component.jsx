import React from 'react'

const PitchBend = ({ value, onValueChange }) => (
  <fieldset>
    <legend>Pitch bend</legend>
    <label>Start frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.startFrequency}
      onChange={event => onValueChange({
        startFrequency: event.target.valueAsNumber
      })}
    />
    <label>End frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.endFrequency}
      onChange={event => onValueChange({
        endFrequency: event.target.valueAsNumber
      })}
    />
    <label>Gain</label>
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.gain}
      onChange={event => onValueChange({
        gain: event.target.valueAsNumber
      })}
    />
    <fieldset>
      <legend>Low pass filter</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.lowPassFilter.frequency}
        onChange={event => onValueChange({
          lowPassFilter: {
            ...value.lowPassFilter,
            frequency: event.target.valueAsNumber,
          }
        })}
      />
      <label>Q</label>
      <input
        type='number'
        min={0}
        step={0.01}
        value={value.lowPassFilter.Q}
        onChange={event => onValueChange({
          lowPassFilter: {
            ...value.lowPassFilter,
            Q: event.target.valueAsNumber,
          }
        })}
      />
    </fieldset>
  </fieldset>
)

export default PitchBend