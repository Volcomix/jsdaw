import React from 'react'

import SynthPart from './SynthPart.component'
import Knob from '../shared/Knob.component'
import { borderColor } from '../shared/styles'

const Synth = ({ name, controls }) => (
  <div style={styles.container}>
    <span style={styles.title}>{name}</span>
    {Object.keys(controls).map(key => {
      const control = controls[key]
      if (control.value === undefined) {
        return <SynthPart key={key} name={key} controls={control} />
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
)

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end',
  },
  title: {
    position: 'absolute',
    top: 0,
    fontSize: 16,
    cursor: 'pointer',
    color: borderColor,
  },
}

export default Synth