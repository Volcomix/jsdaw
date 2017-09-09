const controls = {
  gain: { step: 0.1, max: 10 },
  modulator: { gain: { step: 10, max: 10000 } },
  duration: { step: 0.1, max: 10 },
  frequency: { step: 10, max: 8000 },
  Q: { step: 0.1, max: 10 },
}

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
    bodyGain.gain.value = this.body.gain

    const pitchBendGain = this.context.createGain()
    pitchBendGain.gain.value = this.pitchBend.gain

    const vca = this.context.createGain()
    vca.gain.setValueAtTime(this.gain, when)
    vca.gain.linearRampToValueAtTime(0, when + this.duration)

    body.connect(bodyGain)
    pitchBend.connect(pitchBendGain)
    bodyGain.connect(vca)
    pitchBendGain.connect(vca)
    vca.connect(this.destination)
  }

  playBody(when) {
    const modulator = this.context.createOscillator()
    modulator.type = 'sine'
    modulator.frequency.value = this.body.modulator.frequency

    const modulatorGain = this.context.createGain()
    modulatorGain.gain.value = this.body.modulator.gain

    const carrier = this.context.createOscillator()
    carrier.type = 'sine'
    carrier.frequency.value = this.body.frequency

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.body.bandPassFilter.frequency
    hpf.Q.value = this.body.bandPassFilter.Q

    const click = this.playClick(when)

    modulator.connect(modulatorGain)
    modulatorGain.connect(carrier.frequency)
    carrier.connect(hpf)
    hpf.connect(click)

    modulator.start(when)
    carrier.start(when)

    modulator.stop(when + this.duration)
    carrier.stop(when + this.duration)

    return click
  }

  playClick(when) {
    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.setValueAtTime(this.click.frequency, when)
    lpf.frequency.linearRampToValueAtTime(
      this.body.bandPassFilter.frequency,
      when + this.click.duration
    )
    lpf.Q.value = this.body.bandPassFilter.Q

    return lpf
  }

  playPitchBend(when) {
    const vco = this.context.createOscillator()
    vco.type = 'sine'
    vco.frequency.setValueAtTime(this.pitchBend.startFrequency, when)
    vco.frequency.linearRampToValueAtTime(
      this.pitchBend.endFrequency,
      when + this.duration
    )

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = this.pitchBend.lowPassFilter.frequency
    lpf.Q.value = this.pitchBend.lowPassFilter.Q

    vco.connect(lpf)

    vco.start(when)
    vco.stop(when + this.duration)

    return lpf
  }
}

export default BassDrum