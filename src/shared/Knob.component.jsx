import React from 'react'

import { keyColor, borderColor } from './styles'

const minAngle = 0.75 * Math.PI
const maxAngle = 0.25 * Math.PI
const selectableAngle = 2 * Math.PI - minAngle + maxAngle
const width = 24
const lineWidth = 1.5
const pointerWidth = 0.035 * Math.PI

class Knob extends React.Component {
  static defaultProps = { min: 0 }

  componentDidMount() {
    this.drawBackground()
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { label, min, max, step, value, onValueChange } = this.props
    return (
      <div style={styles.container}>
        <canvas
          width={width}
          height={width}
          style={styles.background}
          ref={canvas => this.background = canvas}
        />
        <canvas
          width={width}
          height={width}
          style={styles.foreground}
          ref={canvas => this.foreground = canvas}
        />
      </div>
    )
  }

  drawBackground() {
    const center = width / 2
    const radius = center - lineWidth / 2

    const ctx = this.background.getContext('2d')
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = borderColor
    ctx.beginPath()
    ctx.arc(center, center, radius, minAngle, maxAngle)
    ctx.stroke()
  }

  draw() {
    const { value, min, max } = this.props
    const center = width / 2
    const radius = center - lineWidth / 2
    const pointerRadius = radius - width / 6

    let angle
    if (value >= max) {
      angle = maxAngle
    } else if (value < min) {
      angle = minAngle
    } else {
      angle = selectableAngle * (value - min) / (max - min) + minAngle
    }

    const ctx = this.foreground.getContext('2d')
    ctx.strokeStyle = keyColor

    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.arc(center, center, radius, minAngle, angle)
    ctx.stroke()

    ctx.lineWidth = width / 3
    ctx.beginPath()
    ctx.arc(
      center,
      center,
      pointerRadius,
      angle - pointerWidth,
      angle + pointerWidth
    )
    ctx.stroke()
  }
}

const styles = {
  container: {
    position: 'relative',
    width,
    height: width,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  foreground: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 20,
  },
}

export default Knob