class BassDrum {
  duration = 0.1
  gain = 1

  body = {
    frequency: 110,
    gain: 1,
    modulator: {
      frequency: 70,
      gain: 250,
    },
    highPassFilter: {
      frequency: 100,
      Q: 0.2,
    },
  }

  click = {
    duration: 0.01,
    startFrequency: 3000,
    endFrequency: 100,
    Q: 0.2,
  }

  pitchBend = {
    startFrequency: 110,
    endFrequency: 10,
    gain: 1,
    lowPassFilter: {
      frequency: 80,
      Q: 2,
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
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
    hpf.frequency.value = this.body.highPassFilter.frequency
    hpf.Q.value = this.body.highPassFilter.Q

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
    lpf.frequency.setValueAtTime(this.click.startFrequency, when)
    lpf.frequency.linearRampToValueAtTime(
      this.click.endFrequency,
      when + this.click.duration
    )
    lpf.Q.value = this.click.Q

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
}

export default BassDrum