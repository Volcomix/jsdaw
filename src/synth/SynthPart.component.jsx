import React from 'react'

import KnobSet from '../shared/KnobSet.component'
import Knob from '../shared/Knob.component'
import { borderColor } from '../shared/styles'
import { toName } from './Synth.component'

const SynthPart = ({ name, controls, onControlsChange }) => (
  <div style={styles.container}>
    <span style={styles.title}>{name}</span>
    <div style={styles.content}>
      {Object.keys(controls).map(key => {
        const control = controls[key]
        if (control.value === undefined) {
          return (
            <KnobSet
              key={key}
              name={toName(key)}
              controls={control}
              onControlsChange={control => onControlsChange({
                ...controls,
                [key]: control
              })}
            />
          )
        } else {
          return (
            <Knob
              key={key}
              label={toName(key)}
              step={control.step}
              max={control.max}
              value={control.value}
              onValueChange={value => onControlsChange({
                ...controls,
                [key]: { ...control, value }
              })}
            />
          )
        }
      })}
    </div>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch',
    borderLeft: `1px solid ${borderColor}`,
  },
  title: {
    fontSize: 12,
    color: borderColor,
    marginTop: 4,
    marginLeft: 8,
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
}

export default SynthPart