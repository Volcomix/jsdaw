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
      onChange={event => onChange({
        ...value,
        frequency: event.target.valueAsNumber,
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
      <legend>Modulator</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.modulator.frequency}
        onChange={event => onChange({
          ...value,
          modulator: {
            ...value.modulator,
            frequency: event.target.valueAsNumber,
          },
        })}
      />
      <label>Gain</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.modulator.gain}
        onChange={event => onChange({
          ...value,
          modulator: {
            ...value.modulator,
            gain: event.target.valueAsNumber,
          },
        })}
      />
    </fieldset>
    <fieldset>
      <legend>High pass filter</legend>
      <label>Frequency</label>
      <input
        type='number'
        min={0}
        step={1}
        value={value.highPassFilter.frequency}
        onChange={event => onChange({
          ...value,
          highPassFilter: {
            ...value.highPassFilter,
            frequency: event.target.valueAsNumber,
          },
        })}
      />
      <label>Q</label>
      <input
        type='number'
        min={0}
        step={0.01}
        value={value.highPassFilter.Q}
        onChange={event => onChange({
          ...value,
          highPassFilter: {
            ...value.highPassFilter,
            Q: event.target.valueAsNumber,
          },
        })}
      />
    </fieldset>
  </fieldset>
)

export default Body