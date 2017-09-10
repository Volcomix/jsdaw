import React from 'react'

import SynthPart from './SynthPart.component'
import Knob from '../shared/Knob.component'
import { keyColor, borderColor } from '../shared/styles'

class Synth extends React.Component {
  state = { isSelecting: false }

  render() {
    const { name, controls, isSelected, onSelect } = this.props
    const { isSelecting } = this.state
    return (
      <div style={{
        ...styles.container,
        ...isSelecting ? styles.down : styles.up,
      }}>
        <div
          style={{
            ...styles.handle,
            ...isSelected ? styles.selectedHandle : styles.deselectedHandle,
          }}
          onClick={onSelect}
          onMouseDown={this.handleMouseDown}
          onMouseOut={this.handleMouseUp}
          onMouseUp={this.handleMouseUp}
        >
        </div>
        <span
          style={{
            ...styles.title,
            ...isSelected ? styles.selectedTitle : styles.deselectedTitle,
          }}
          onClick={onSelect}
          onMouseDown={this.handleMouseDown}
          onMouseOut={this.handleMouseUp}
          onMouseUp={this.handleMouseUp}
        >
          {name}
        </span>
        {Object.keys(controls).map(key => {
          const control = controls[key]
          if (control.value === undefined) {
            return (
              <SynthPart
                key={key}
                name={toName(key)}
                controls={control}
              />
            )
          } else {
            return (
              <Knob
                key={key}
                label={toName(key)}
                control={control}
              />
            )
          }
        })}
      </div>
    )
  }

  handleMouseDown = () => {
    this.setState({ isSelecting: true })
  }

  handleMouseUp = () => {
    this.setState({ isSelecting: false })
  }
}

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    transition: 'box-shadow 150ms',
    marginLeft: 8,
    marginBottom: 8,
  },
  up: {
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)',
  },
  down: {
    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.3)',
  },
  handle: {
    alignSelf: 'stretch',
    width: 4,
    marginRight: 32,
    borderRight: '8px solid white',
    cursor: 'pointer',
  },
  selectedHandle: {
    backgroundColor: keyColor,
  },
  deselectedHandle: {
    backgroundColor: borderColor,
  },
  title: {
    position: 'absolute',
    top: 4,
    left: 12,
    fontSize: 16,
    cursor: 'pointer',
  },
  selectedTitle: {
    color: keyColor,
  },
  deselectedTitle: {
    color: borderColor,
  },
}

export function toName(controlKey) {
  return controlKey.replace(/^[a-z]|[A-Z0-9]/g, (match, offset) =>
    offset === 0 ? match.toUpperCase() : " " + match.toLowerCase()
  )
}

export default Synth