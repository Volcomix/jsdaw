import React from 'react'

import { keyColor, borderColor } from './styles'

const minAngle = 0.75 * Math.PI
const maxAngle = 0.25 * Math.PI
const selectableAngle = 2 * Math.PI - minAngle + maxAngle
const width = 24
const lineWidth = 1.5

class Knob extends React.Component {
  constructor(props) {
    super(props)
    this.control = props.control
    this.state = {
      value: this.control.value,
      isHovered: false,
      isDragging: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.control !== this.props.control) {
      this.control = nextProps.control
      this.setState({ value: this.control.value })
    }
  }

  componentDidMount() {
    this.drawBackground()
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    return (
      <span style={styles.container}>
        <div
          style={styles.knob}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
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
        <label style={styles.label}>{this.props.label}</label>
        {
          this.state.isHovered || this.state.isDragging
            ? <span style={styles.tooltip}>{this.state.value}</span>
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
    const { value } = this.state
    const { max } = this.control
    const min = this.control.min || 0
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
    this.centerY = event.clientY
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    this.setState({ isDragging: true })
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this.setState({ isDragging: false })
  }

  handleMouseMove = event => {
    event.preventDefault()
    const { step } = this.control
    const { value } = this.state
    const sensitivity = event.shiftKey ? 0.1 : 1
    let nextValue = value + (this.centerY - event.clientY) * step * sensitivity
    nextValue = this.clamp(nextValue)
    this.centerY = event.clientY
    this.control.value = nextValue
    this.props.onChange(nextValue)
    this.setState({ value: nextValue })
  }

  handleWheel = event => {
    event.preventDefault()
    const { step } = this.control
    const { value } = this.state
    const sensitivity = event.shiftKey ? 0.1 : 1
    const delta = Math.max(-1, Math.min(1, event.deltaY))
    let nextValue = value - delta * step * sensitivity
    nextValue = this.clamp(nextValue)
    this.control.value = nextValue
    this.props.onChange(nextValue)
    this.setState({ value: nextValue })
  }

  clamp = value => {
    const { max } = this.control
    const min = this.control.min || 0
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    } else {
      return +value.toFixed(5)
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 4,
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