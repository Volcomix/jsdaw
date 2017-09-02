import whiteNoise from '../Noise/whiteNoise'

class SnareDrum {
  duration = 0.5
  gain = 0.5

  drum = {
    oscillator1: {
      frequency: 330,
      gain: 1,
      duration: 0.055,
    },
    oscillator2: {
      frequency: 180,
      gain: 1,
      duration: 0.075,
    },
  }

  snare = {
    snappy: 0.005,
    lowPassFilter: {
      frequency: 7040,
      gain: 0.8,
      duration: 0.35,
    },
    highPassFilter: {
      frequency: 523,
      gain: 0.8,
      duration: 0.11,
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
    this.noiseBuffer = whiteNoise(context, 2)
  }

  playSound(when) {
    const amplifier = this.context.createGain()
    amplifier.gain.value = this.gain

    this.playDrum(when, amplifier)
    this.playSnare(when, amplifier)

    amplifier.connect(this.destination)
  }

  playDrum(when, amplifier) {
    const oscillator1 = this.context.createOscillator()
    oscillator1.type = 'triangle'
    oscillator1.frequency.value = this.drum.oscillator1.frequency

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(this.drum.oscillator1.gain, when)
    vca1.gain.linearRampToValueAtTime(
      0, when + this.drum.oscillator1.duration
    )

    const oscillator2 = this.context.createOscillator()
    oscillator2.type = 'triangle'
    oscillator2.frequency.value = this.drum.oscillator2.frequency

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(this.drum.oscillator2.gain, when)
    vca2.gain.linearRampToValueAtTime(
      0, when + this.drum.oscillator2.duration
    )

    oscillator1.connect(vca1)
    vca1.connect(amplifier)
    oscillator2.connect(vca2)
    vca2.connect(amplifier)

    oscillator1.start(when)
    oscillator2.start(when)

    oscillator1.stop(when + this.duration)
    oscillator2.stop(when + this.duration)
  }

  playSnare(when, amplifier) {
    const noise = this.context.createBufferSource()
    noise.buffer = this.noiseBuffer

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = this.snare.lowPassFilter.frequency

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(this.snare.lowPassFilter.gain, when)
    vca1.gain.linearRampToValueAtTime(
      0, when + this.snare.lowPassFilter.duration
    )

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.snare.highPassFilter.frequency

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(this.snare.highPassFilter.gain, when)
    vca2.gain.linearRampToValueAtTime(
      0, when + this.snare.highPassFilter.duration
    )

    const snappy = this.context.createGain()
    snappy.gain.setValueAtTime(0, when)
    snappy.gain.linearRampToValueAtTime(1, when + this.snare.snappy)

    noise.connect(lpf)
    lpf.connect(vca1)
    lpf.connect(hpf)
    hpf.connect(vca2)
    vca1.connect(snappy)
    vca2.connect(snappy)
    snappy.connect(amplifier)

    noise.start(when)
    noise.stop(when + this.duration)
  }
}

export default SnareDrum