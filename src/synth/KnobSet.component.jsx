import React from 'react'

import Knob from '../shared/Knob.component'
import { borderColor } from '../shared/styles'
import { toName } from './Synth.component'

const KnobSet = ({ name, controls }) => (
  <div style={styles.container}>
    <span style={styles.title}>{name}</span>
    <div style={styles.content}>
      {Object.keys(controls).map(key => {
        const control = controls[key]
        return (
          <Knob
            key={key}
            label={toName(key)}
            step={control.step}
            max={control.max}
            value={control.value}
          />
        )
      })}
    </div>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 12,
    color: borderColor,
    marginBottom: 4,
  },
  content: {
    display: 'flex',
  },
}

export default KnobSet