import React from 'react'

import { keyColor, borderColor, backgroundColor } from './styles'

const minAngle = 0.75 * Math.PI
const maxAngle = 0.25 * Math.PI
const selectableAngle = 2 * Math.PI - minAngle + maxAngle

class RadialSlider extends React.Component {
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
    const { label, value, knobRadius } = this.props
    const width = this.width
    return (
      <span style={{ width, height: width, ...styles.container }}>
        <canvas
          width={width}
          height={width}
          ref={canvas => this.canvas = canvas}
          style={styles.canvas}
          onMouseDown={this.handleMouseDown}
        >
        </canvas>
        <input
          id='input'
          type='text'
          value={value}
          onChange={this.handleInputChange}
          style={{
            width: width - 4 * (knobRadius + styles.knob.shadowBlur),
            ...styles.input,
          }}
        />
        <label
          htmlFor='input'
          style={{
            bottom: knobRadius + styles.knob.shadowBlur,
            ...styles.label,
          }}
        >
          {label}
        </label>
      </span>
    )
  }

  draw = () => {
    const { value, min, max, lineWidth, knobRadius } = this.props
    const width = this.width
    const center = width / 2
    const { shadowBlur } = styles.knob
    const radius = center - lineWidth / 2 - knobRadius - shadowBlur

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
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 0
    ctx.clearRect(0, 0, width, width)

    this.drawBackground(ctx, center, radius, angle)
    this.drawValue(ctx, center, radius, angle)
    this.drawKnob(ctx, center, radius, angle, knobRadius)
  }

  drawBackground = (ctx, center, radius, angle) => {
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.arc(center, center, radius, angle, maxAngle)
    ctx.stroke()
  }

  drawValue = (ctx, center, radius, angle) => {
    ctx.strokeStyle = keyColor
    ctx.beginPath()
    ctx.arc(center, center, radius, minAngle, angle)
    ctx.stroke()
  }

  drawKnob = (ctx, center, radius, angle, knobRadius) => {
    const x = center + Math.cos(angle) * radius
    const y = center + Math.sin(angle) * radius
    ctx.fillStyle = styles.knob.fillStyle
    ctx.shadowColor = styles.knob.shadowColor
    ctx.shadowOffsetY = styles.knob.shadowOffsetY
    ctx.shadowBlur = styles.knob.shadowBlur
    ctx.beginPath()
    ctx.arc(x, y, knobRadius, 0, 2 * Math.PI)
    ctx.fill()
  }

  handleInputChange = event => {
    this.props.onValueChange(event.target.value)
  }

  handleMouseDown = event => {
    this.handleMouseMove(event)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = event => {
    const { min, max, onValueChange } = this.props
    const center = this.width / 2
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left - center
    const y = event.clientY - rect.top - center

    let angle = Math.atan2(y, x)
    if (angle < minAngle) {
      angle += 2 * Math.PI
    }

    const value = (angle - minAngle) * (max - min) / selectableAngle + min
    if (value >= min && value <= max) {
      onValueChange(Math.round(value))
    }

    event.preventDefault()
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
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
    fontSize: 16,
    zIndex: 10,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: keyColor,
  },
  label: {
    position: 'absolute',
    fontSize: 14,
    color: borderColor,
  },
  knob: {
    fillStyle: backgroundColor,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffsetY: 3,
    shadowBlur: 5,
  },
}

export default RadialSlider