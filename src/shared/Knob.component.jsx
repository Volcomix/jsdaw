import React from 'react'

import { keyColor, borderColor } from './styles'

const minAngle = 0.75 * Math.PI
const maxAngle = 0.25 * Math.PI
const selectableAngle = 2 * Math.PI - minAngle + maxAngle
const width = 24
const lineWidth = 1.5

class Knob extends React.Component {
  static defaultProps = { min: 0 }

  componentDidMount() {
    this.drawBackground()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { label, min, max, step, value, onValueChange } = this.props
    return (
      <span>
        <canvas
          width={width}
          height={width}
          ref={canvas => this.background = canvas}
        />
      </span>
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
  }
}

export default Knob