import controls, { exponentialZero } from './controls'

class HiHat {
  controls = {
    gain: { ...controls.gain, step: 0.01, value: 0.01 },
    duration: { ...controls.duration, value: 0.520 },
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
      gain: { ...controls.gain, step: 1, max: 1000, value: 100 },
      duration: { ...controls.duration, value: 0.367 },
      freq: { ...controls.frequency, max: 30000, value: 15800 },
    },
    body: {
      freq: { ...controls.frequency, value: 1570 },
      Q: { ...controls.Q, max: 100, value: 6.6 },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when) {
    const oscillators = ['osc1Freq', 'osc2Freq', 'osc3Freq'].map(key =>
      this.playOscillator(when, this.controls.oscillators[key])
    )

    const impact = this.playImpact(when, oscillators)
    const body = this.playBody(when, oscillators, impact)

    body.connect(this.destination)
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
    bpf.frequency.value = this.controls.impact.freq.value

    const vca = this.context.createGain()
    vca.gain.setValueAtTime(
      this.controls.impact.gain.value || exponentialZero,
      when
    )
    vca.gain.exponentialRampToValueAtTime(
      exponentialZero,
      when + this.controls.impact.duration.value
    )

    oscillators.forEach(oscillator => {
      oscillator.connect(bpf)
    })
    bpf.connect(vca)

    return vca
  }

  playBody(when, oscillators, impact) {
    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.controls.body.freq.value
    hpf.Q.value = this.controls.body.Q.value

    const vca = this.context.createGain()
    vca.gain.setValueAtTime(
      this.controls.gain.value || exponentialZero,
      when
    )
    vca.gain.exponentialRampToValueAtTime(
      exponentialZero,
      when + this.controls.duration.value
    )

    oscillators.forEach(oscillator => {
      oscillator.connect(hpf)
    })
    impact.connect(vca)
    hpf.connect(vca)

    return vca
  }
}

export default HiHat