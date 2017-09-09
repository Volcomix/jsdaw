import controls from './controls'

class BassDrum {
  controls = {
    gain: { ...controls.gain, value: 1 },
    duration: { ...controls.duration, value: 0.1 },
    pitchBend: {
      gain: { ...controls.gain, value: 1 },
      startFreq: { ...controls.frequency, value: 110 },
      endFreq: { ...controls.frequency, value: 10 },
      lowPassFilter: {
        freq: { ...controls.frequency, value: 80 },
        Q: { ...controls.Q, value: 2 },
      },
    },
    body: {
      gain: { ...controls.gain, value: 1 },
      freq: { ...controls.frequency, value: 110 },
      modulator: {
        gain: { ...controls.modulator.gain, value: 250 },
        freq: { ...controls.frequency, value: 70 },
      },
      bandPassFilter: {
        freq: { ...controls.frequency, value: 100 },
        Q: { ...controls.Q, value: 0.2 },
      },
    },
    click: {
      duration: { ...controls.duration, value: 0.01 },
      freq: { ...controls.frequency, value: 3000 },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when) {
    const body = this.playBody(when)
    const pitchBend = this.playPitchBend(when)

    const bodyGain = this.context.createGain()
    bodyGain.gain.value = this.controls.body.gain.value

    const pitchBendGain = this.context.createGain()
    pitchBendGain.gain.value = this.controls.pitchBend.gain.value

    const vca = this.context.createGain()
    vca.gain.setValueAtTime(this.controls.gain.value, when)
    vca.gain.linearRampToValueAtTime(0, when + this.controls.duration.value)

    body.connect(bodyGain)
    pitchBend.connect(pitchBendGain)
    bodyGain.connect(vca)
    pitchBendGain.connect(vca)
    vca.connect(this.destination)
  }

  playBody(when) {
    const modulator = this.context.createOscillator()
    modulator.type = 'sine'
    modulator.frequency.value = this.controls.body.modulator.freq.value

    const modulatorGain = this.context.createGain()
    modulatorGain.gain.value = this.controls.body.modulator.gain.value

    const carrier = this.context.createOscillator()
    carrier.type = 'sine'
    carrier.frequency.value = this.controls.body.freq.value

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.controls.body.bandPassFilter.freq.value
    hpf.Q.value = this.controls.body.bandPassFilter.Q.value

    const click = this.playClick(when)

    modulator.connect(modulatorGain)
    modulatorGain.connect(carrier.frequency)
    carrier.connect(hpf)
    hpf.connect(click)

    modulator.start(when)
    carrier.start(when)

    modulator.stop(when + this.controls.duration.value)
    carrier.stop(when + this.controls.duration.value)

    return click
  }

  playClick(when) {
    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.setValueAtTime(this.controls.click.freq.value, when)
    lpf.frequency.linearRampToValueAtTime(
      this.controls.body.bandPassFilter.freq.value,
      when + this.controls.click.duration.value
    )
    lpf.Q.value = this.controls.body.bandPassFilter.Q.value

    return lpf
  }

  playPitchBend(when) {
    const vco = this.context.createOscillator()
    vco.type = 'sine'
    vco.frequency.setValueAtTime(this.controls.pitchBend.startFreq.value, when)
    vco.frequency.linearRampToValueAtTime(
      this.controls.pitchBend.endFreq.value,
      when + this.controls.duration.value
    )

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = this.controls.pitchBend.lowPassFilter.freq.value
    lpf.Q.value = this.controls.pitchBend.lowPassFilter.Q.value

    vco.connect(lpf)

    vco.start(when)
    vco.stop(when + this.controls.duration.value)

    return lpf
  }
}

export default BassDrum