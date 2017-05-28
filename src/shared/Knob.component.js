import React from 'react'

import { keyColor, borderColor } from './styles'

const minAngle = Math.PI * 0.75
const maxAngle = Math.PI * 0.25
const selectableAngle = Math.PI * 2 - minAngle + maxAngle

class Knob extends React.Component {
  get width() {
    return this.props.width || this.props.height
  }

  componentDidMount() {
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { label, value, onChange } = this.props
    const width = this.width
    return (
      <span style={{ width, height: width, ...styles.container }}>
        <canvas
          width={width}
          height={width}
          ref={canvas => this.canvas = canvas}
          style={styles.canvas}
        >
        </canvas>
        <input
          id='input'
          type='text'
          value={value}
          onChange={onChange}
          style={styles.input}
        />
        <label htmlFor='input' style={styles.label}>{label}</label>
      </span>
    )
  }

  draw = () => {
    const { value, min, max, lineWidth } = this.props
    const width = this.width
    const center = width / 2
    const radius = center - lineWidth / 2

    let angle
    if (value >= max) {
      angle = maxAngle
    } else if (value < min) {
      angle = minAngle
    } else {
      angle = selectableAngle * (value - min) / (max - min) + minAngle
    }

    const ctx = this.canvas.getContext('2d')
    ctx.lineWidth = lineWidth
    ctx.clearRect(0, 0, width, width)

    this.drawBackground(ctx, center, radius, angle)
    this.drawValue(ctx, center, radius, angle)
  }

  drawBackground = (ctx, center, radius, angle) => {
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.arc(center, center, radius, angle, maxAngle, false)
    ctx.stroke()
  }

  drawValue = (ctx, center, radius, angle) => {
    ctx.strokeStyle = keyColor
    ctx.beginPath()
    ctx.arc(center, center, radius, minAngle, angle, false)
    ctx.stroke()
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  input: {
    width: 40,
    fontSize: 16,
    zIndex: 10,
    border: 'none',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: keyColor,
  },
  label: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 30,
    marginLeft: -15,
    textAlign: 'center',
    fontSize: 14,
    color: borderColor,
  },
}

export default Knob