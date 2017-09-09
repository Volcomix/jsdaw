import React from 'react'

import SynthPart from './SynthPart.component'
import Knob from '../shared/Knob.component'
import { borderColor } from '../shared/styles'

const Synth = ({ name, controls }) => (
  <div style={styles.container}>
    <div style={styles.handle}></div>
    <span style={styles.title}>{name}</span>
    {Object.keys(controls).map(key => {
      const control = controls[key]
      if (control.value === undefined) {
        return <SynthPart key={key} name={toName(key)} controls={control} />
      } else {
        return (
          <Knob
            key={key}
            label={toName(key)}
            step={control.step}
            max={control.max}
            value={control.value}
          />
        )
      }
    })}
  </div>
)

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
    marginLeft: 8,
    marginBottom: 8,
  },
  handle: {
    alignSelf: 'stretch',
    width: 4,
    backgroundColor: borderColor,
    marginRight: 32,
    borderRight: '8px solid white',
    cursor: 'pointer',
  },
  title: {
    position: 'absolute',
    top: 4,
    left: 12,
    fontSize: 16,
    color: borderColor,
    cursor: 'pointer',
  },
}

export function toName(controlKey) {
  return controlKey.replace(/^[a-z]|[A-Z]/g, (match, offset) =>
    offset === 0 ? match.toUpperCase() : " " + match.toLowerCase()
  )
}

export default Synth