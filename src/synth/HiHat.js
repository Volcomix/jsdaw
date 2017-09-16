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
    bandPassFilter: {
      gain: { ...controls.gain, step: 1, max: 1000, value: 100 },
      duration: { ...controls.duration, value: 0.367 },
      freq: { ...controls.frequency, max: 30000, value: 15800 },
    },
    highPassFilter: {
      freq: { ...controls.frequency, value: 1570 },
      Q: { ...controls.Q, max: 100, value: 66 },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when) {
    const oscillator1 = this.playOscillator(
      when,
      this.controls.oscillators.osc1Freq.modulator.value,
      this.controls.oscillators.osc1Freq.carrier.value
    )

    const oscillator2 = this.playOscillator(
      when,
      this.controls.oscillators.osc2Freq.modulator.value,
      this.controls.oscillators.osc2Freq.carrier.value
    )

    const oscillator3 = this.playOscillator(
      when,
      this.controls.oscillators.osc3Freq.modulator.value,
      this.controls.oscillators.osc3Freq.carrier.value
    )

    const bpf = this.context.createBiquadFilter()
    bpf.type = 'bandpass'
    bpf.frequency.value = this.controls.bandPassFilter.freq.value

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.controls.highPassFilter.freq.value
    hpf.Q.value = this.controls.highPassFilter.Q.value

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(
      this.controls.bandPassFilter.gain.value || exponentialZero,
      when
    )
    vca1.gain.exponentialRampToValueAtTime(
      exponentialZero,
      when + this.controls.bandPassFilter.duration.value
    )

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(
      this.controls.gain.value || exponentialZero,
      when
    )
    vca2.gain.exponentialRampToValueAtTime(
      exponentialZero,
      when + this.controls.duration.value
    )

    oscillator1.connect(bpf)
    oscillator1.connect(hpf)

    oscillator2.connect(bpf)
    oscillator2.connect(hpf)

    oscillator3.connect(bpf)
    oscillator3.connect(hpf)

    bpf.connect(vca1)
    vca1.connect(vca2)
    hpf.connect(vca2)

    vca2.connect(this.destination)
  }

  playOscillator(when, modulatorFrequency, carrierFrequency) {
    const modulator = this.context.createOscillator()
    modulator.type = 'square'
    modulator.frequency.value = modulatorFrequency

    const modulatorGain = this.context.createGain()
    modulatorGain.gain.value = this.controls.oscillators.modGain.value

    const carrier = this.context.createOscillator()
    carrier.type = 'square'
    carrier.frequency.value = carrierFrequency

    modulator.connect(modulatorGain)
    modulatorGain.connect(carrier.frequency)

    modulator.start(when)
    carrier.start(when)

    modulator.stop(when + this.controls.duration.value)
    carrier.stop(when + this.controls.duration.value)

    return carrier
  }
}

export default HiHat