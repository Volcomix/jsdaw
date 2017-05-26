class BassDrum {
  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  body(when, duration) {
    const modulator = this.context.createOscillator()
    modulator.type = 'sine'
    modulator.frequency.value = 70

    const modulatorGain = this.context.createGain()
    modulatorGain.gain.value = 250

    const carrier = this.context.createOscillator()
    carrier.type = 'sine'
    carrier.frequency.value = 110

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = 100
    hpf.Q.value = 0.2

    const click = this.click(when)

    modulator.connect(modulatorGain)
    modulatorGain.connect(carrier.frequency)
    carrier.connect(hpf)
    hpf.connect(click)

    modulator.start(when)
    carrier.start(when)

    modulator.stop(when + duration)
    carrier.stop(when + duration)

    return click
  }

  click(when) {
    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.setValueAtTime(3000, when)
    lpf.frequency.linearRampToValueAtTime(100, when + 0.01)
    lpf.Q.value = 0.2

    return lpf
  }

  pitchBend(when, duration) {
    const vco = this.context.createOscillator()
    vco.type = 'sine'
    vco.frequency.setValueAtTime(110, when)
    vco.frequency.linearRampToValueAtTime(10, when + duration)

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 80
    lpf.Q.value = 2

    vco.connect(lpf)

    vco.start(when)
    vco.stop(when + duration)

    return lpf
  }

  playSound(when) {
    const duration = 0.1

    const body = this.body(when, duration)
    const pitchBend = this.pitchBend(when, duration)

    const bodyGain = this.context.createGain()
    bodyGain.gain.value = 1

    const pitchBendGain = this.context.createGain()
    pitchBendGain.gain.value = 1

    const vca = this.context.createGain()
    vca.gain.setValueAtTime(10, when)
    vca.gain.linearRampToValueAtTime(0, when + duration)

    body.connect(bodyGain)
    pitchBend.connect(pitchBendGain)
    bodyGain.connect(vca)
    pitchBendGain.connect(vca)
    vca.connect(this.destination)
  }
}

export default BassDrum