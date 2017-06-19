import React from 'react'

import { keyColor, borderColor } from './styles'

const minAngle = 0.75 * Math.PI
const maxAngle = 0.25 * Math.PI
const selectableAngle = 2 * Math.PI - minAngle + maxAngle
const width = 24
const lineWidth = 1.5

class Knob extends React.Component {
  static defaultProps = { min: 0 }

  state = {
    isHovered: false,
    isDragging: false,
  }

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
      <span
        style={styles.container}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div
          style={styles.knob}
          onMouseDown={this.handleMouseDown}
        >
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
        <label style={styles.label}>{label}</label>
        {
          this.state.isHovered || this.state.isDragging
            ? <span style={styles.tooltip}>{value}</span>
            : undefined
        }
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
    const { value, min, max } = this.props
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

    const ctx = this.foreground.getContext('2d')
    ctx.strokeStyle = keyColor
    ctx.lineWidth = lineWidth
    ctx.clearRect(0, 0, width, width)
    ctx.beginPath()
    ctx.arc(center, center, radius, minAngle, angle)
    ctx.lineTo(center, center)
    ctx.stroke()
  }

  handleMouseOver = () => {
    this.setState({ isHovered: true })
  }

  handleMouseOut = () => {
    this.setState({ isHovered: false })
  }

  handleMouseDown = event => {
    this.value = this.props.value
    this.centerY = event.clientY
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    this.setState({ isDragging: true })
  }

  handleMouseMove = event => {
    event.preventDefault()
    const { min, max, step, onValueChange } = this.props
    let value = this.value + (this.centerY - event.clientY) * step
    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }
    onValueChange(value)
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.setState({ isDragging: false })
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  knob: {
    position: 'relative',
    width: width,
    height: width,
    marginLeft: 10,
    marginRight: 10,
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
  label: {
    fontSize: 10,
    color: borderColor,
  },
  tooltip: {
    position: 'absolute',
    top: width + 14,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 6,
    zIndex: 30,
    backgroundColor: 'rgba(97, 97, 97, 0.9)',
    color: 'white',
    fontSize: 10,
  },
}

export default Knob