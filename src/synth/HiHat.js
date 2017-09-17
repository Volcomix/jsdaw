import controls, { exponentialZero } from './controls'

const Type = {
  closed: 1,
  open: 2,
}

class HiHat {
  controls = {
    gain: { ...controls.gain, value: 1 },
    duration: { ...controls.duration, value: 5 },
    envelope: {
      attack: { ...controls.duration, step: 0.001, value: 0.0005 },
      hold: { ...controls.duration, step: 0.001, value: 0.0005 },
      decay: {
        closed: { ...controls.duration, value: 0.2 },
        open: { ...controls.duration, value: 0.520 }
      },
    },
    oscillators: {
      modGain: { ...controls.modulator.gain, max: 40000, value: 2000 },
      osc1Freq: {
        modulator: { ...controls.frequency, value: 1047 },
        carrier: { ...controls.frequency, value: 1481 },
      },
      osc2Freq: {
        modulator: { ...controls.frequency, value: 1109 },
        carrier: { ...controls.frequency, value: 1049 },
      },
      osc3Freq: {
        modulator: { ...controls.frequency, value: 1175 },
        carrier: { ...controls.frequency, value: 1480 },
      },
    },
    impact: {
      bandPassFilter: {
        gain: { ...controls.gain, value: 1 },
        freq: { ...controls.frequency, max: 30000, value: 15800 },
      },
      envelope: {
        attack: { ...controls.duration, step: 0.001, value: 0.0005 },
        decay: { ...controls.duration, value: 0.367 },
      },
    },
    body: {
      highPassFilter: {
        gain: { ...controls.gain, step: 0.01, value: 0.01 },
        freq: { ...controls.frequency, value: 1570 },
        Q: { ...controls.Q, max: 100, value: 6.6 },
      },
      envelope: {
        attack: { ...controls.duration, step: 0.001, value: 0.0026 },
        hold: { ...controls.duration, step: 0.001, value: 0.0005 },
        decay: { ...controls.duration, value: 3.7 },
      },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when, type) {
    const oscillators = ['osc1Freq', 'osc2Freq', 'osc3Freq'].map(key =>
      this.playOscillator(when, this.controls.oscillators[key])
    )

    const impact = this.playImpact(when, oscillators)
    const body = this.playBody(when, oscillators)

    const attack = when + this.controls.envelope.attack.value
    const hold = attack + this.controls.envelope.hold.value
    let decay = hold
    switch (type) {
      case Type.closed:
        decay += this.controls.envelope.decay.closed.value
        break
      case Type.open:
        decay += this.controls.envelope.decay.open.value
        break
    }
    const vca = this.context.createGain()
    vca.gain.setValueAtTime(0, when)
    vca.gain.linearRampToValueAtTime(this.controls.gain.value, attack)
    vca.gain.linearRampToValueAtTime(
      this.controls.gain.value || exponentialZero,
      hold
    )
    vca.gain.exponentialRampToValueAtTime(exponentialZero, decay)
    vca.gain.setValueAtTime(0, decay)

    impact.connect(vca)
    body.connect(vca)

    vca.connect(this.destination)
  }

  playOscillator(when, frequency) {
    const modulator = this.context.createOscillator()
    modulator.type = 'square'
    modulator.frequency.value = frequency.modulator.value

    const modulatorGain = this.context.createGain()
    modulatorGain.gain.value = this.controls.oscillators.modGain.value

    const carrier = this.context.createOscillator()
    carrier.type = 'square'
    carrier.frequency.value = frequency.carrier.value

    modulator.connect(modulatorGain)
    modulatorGain.connect(carrier.frequency)

    modulator.start(when)
    carrier.start(when)

    modulator.stop(when + this.controls.duration.value)
    carrier.stop(when + this.controls.duration.value)

    return carrier
  }

  playImpact(when, oscillators) {
    const bpf = this.context.createBiquadFilter()
    bpf.type = 'bandpass'
    bpf.frequency.value = this.controls.impact.bandPassFilter.freq.value

    const attack = when + this.controls.impact.envelope.attack.value
    const decay = attack + this.controls.impact.envelope.decay.value
    const vca = this.context.createGain()
    vca.gain.setValueAtTime(0, when)
    vca.gain.linearRampToValueAtTime(
      this.controls.impact.bandPassFilter.gain.value || exponentialZero,
      attack
    )
    vca.gain.exponentialRampToValueAtTime(exponentialZero, decay)
    vca.gain.setValueAtTime(0, decay)

    oscillators.forEach(oscillator => {
      oscillator.connect(bpf)
    })
    bpf.connect(vca)

    return vca
  }

  playBody(when, oscillators) {
    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.Q.value = this.controls.body.highPassFilter.Q.value

    const attack = when + this.controls.body.envelope.attack.value
    const hold = attack + this.controls.body.envelope.hold.value
    const decay = hold + this.controls.body.envelope.decay.value
    hpf.frequency.setValueAtTime(0, when)
    hpf.frequency.linearRampToValueAtTime(
      this.controls.body.highPassFilter.freq.value,
      attack
    )
    hpf.frequency.linearRampToValueAtTime(
      this.controls.body.highPassFilter.freq.value || exponentialZero,
      hold
    )
    hpf.frequency.exponentialRampToValueAtTime(exponentialZero, decay)
    hpf.frequency.setValueAtTime(0, decay)

    const gain = this.context.createGain()
    gain.gain.value = this.controls.body.highPassFilter.gain.value

    oscillators.forEach(oscillator => {
      oscillator.connect(hpf)
    })
    hpf.connect(gain)

    return gain
  }
}

export default HiHat