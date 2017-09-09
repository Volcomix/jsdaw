import React from 'react'

import KnobSet from './KnobSet.component'
import Knob from '../shared/Knob.component'
import { borderColor } from '../shared/styles'

const SynthPart = ({ name, controls }) => (
  <div style={styles.container}>
    <span style={styles.title}>{name}</span>
    <div style={styles.content}>
      {Object.keys(controls).map(key => {
        const control = controls[key]
        if (control.value === undefined) {
          return <KnobSet key={key} name={key} controls={control} />
        } else {
          return (
            <Knob
              key={key}
              label={key}
              step={control.step}
              max={control.max}
              value={control.value}
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
  },
  title: {
    fontSize: 12,
    color: borderColor,
    marginLeft: 8,
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
}

export default SynthPart