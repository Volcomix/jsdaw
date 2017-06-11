import React from 'react'

const PitchBend = ({ value, onChange }) => (
  <fieldset>
    <legend>Pitch bend</legend>
    <label>Start frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.startFrequency}
      onChange={event => onChange({
        ...value,
        startFrequency: event.target.valueAsNumber,
      })}
    />
    <label>End frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.endFrequency}
      onChange={event => onChange({
        ...value,
        endFrequency: event.target.valueAsNumber,
      })}
    />
    <label>Gain</label>
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.gain}
      onChange={event => onChange({
        ...value,
        gain: event.target.valueAsNumber,
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
        onChange={event => onChange({
          ...value,
          lowPassFilter: {
            ...value.lowPassFilter,
            frequency: event.target.valueAsNumber,
          },
        })}
      />
      <label>Q</label>
      <input
        type='number'
        min={0}
        step={0.01}
        value={value.lowPassFilter.Q}
        onChange={event => onChange({
          ...value,
          lowPassFilter: {
            ...value.lowPassFilter,
            Q: event.target.valueAsNumber,
          },
        })}
      />
    </fieldset>
  </fieldset>
)

export default PitchBend