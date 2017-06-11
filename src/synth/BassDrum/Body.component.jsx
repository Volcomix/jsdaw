import React from 'react'

const Body = ({ value, onValueChange }) => (
  <fieldset>
    <legend>Body</legend>
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
      <legend>Modulator</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.modulator.frequency}
        onChange={event => onValueChange({
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
        onChange={event => onValueChange({
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
        onChange={event => onValueChange({
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
        onChange={event => onValueChange({
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