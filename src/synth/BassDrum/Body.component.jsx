import React from 'react'

const Body = ({ value, onChange }) => (
  <fieldset>
    <legend>Body</legend>
    <label>Frequency</label>
    <input
      type='number'
      min={0}
      step={1}
      value={value.frequency}
      onChange={event => onChange({ frequency: event.target.valueAsNumber })}
    />
    <label>Gain</label>
    <input
      type='number'
      min={0}
      step={0.01}
      value={value.gain}
      onChange={event => onChange({ gain: event.target.valueAsNumber })}
    />
    <fieldset>
      <legend>Modulator</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.modulator.frequency}
        onChange={event => onChange({
          modulator: {
            ...value.modulator,
            frequency: event.target.valueAsNumber,
          }
        })}
      />
      <label>Gain</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.modulator.gain}
        onChange={event => onChange({
          modulator: {
            ...value.modulator,
            gain: event.target.valueAsNumber,
          }
        })}
      />
    </fieldset>
    <fieldset>
      <legend>Band pass filter</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.bandPassFilter.frequency}
        onChange={event => onChange({
          bandPassFilter: {
            ...value.bandPassFilter,
            frequency: event.target.valueAsNumber,
          }
        })}
      />
      <label>Q</label>
      <input
        type='number'
        min={0}
        step={0.01}
        value={value.bandPassFilter.Q}
        onChange={event => onChange({
          bandPassFilter: {
            ...value.bandPassFilter,
            Q: event.target.valueAsNumber,
          }
        })}
      />
    </fieldset>
  </fieldset>
)

export default Body