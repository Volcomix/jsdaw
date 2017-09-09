import controls from './controls'
import whiteNoise from './whiteNoise'

class SnareDrum {
  controls = {
    gain: { ...controls.gain, value: 1 },
    duration: { ...controls.duration, value: 0.5 },
    drum: {
      oscillator1: {
        gain: { ...controls.gain, value: 1 },
        duration: { ...controls.duration, value: 0.033 },
        freq: { ...controls.frequency, value: 330 },
      },
      oscillator2: {
        gain: { ...controls.gain, value: 1 },
        duration: { ...controls.duration, value: 0.055 },
        freq: { ...controls.frequency, value: 180 },
      },
    },
    snare: {
      snappy: { ...controls.duration, value: 0.02 },
      lowPassFilter: {
        gain: { ...controls.gain, value: 0.5 },
        duration: { ...controls.duration, value: 0.1 },
        freq: { ...controls.frequency, value: 7040 },
      },
      highPassFilter: {
        gain: { ...controls.gain, value: 0.8 },
        duration: { ...controls.duration, value: 0.06 },
        freq: { ...controls.frequency, value: 523 },
      },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
    this.noiseBuffer = whiteNoise(context, 2)
  }

  playSound(when) {
    const amplifier = this.context.createGain()
    amplifier.gain.value = this.controls.gain.value

    this.playDrum(when, amplifier)
    this.playSnare(when, amplifier)

    amplifier.connect(this.destination)
  }

  playDrum(when, amplifier) {
    const oscillator1 = this.context.createOscillator()
    oscillator1.type = 'triangle'
    oscillator1.frequency.value = this.controls.drum.oscillator1.freq.value

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(this.controls.drum.oscillator1.gain.value, when)
    vca1.gain.linearRampToValueAtTime(
      0, when + this.controls.drum.oscillator1.duration.value
    )

    const oscillator2 = this.context.createOscillator()
    oscillator2.type = 'triangle'
    oscillator2.frequency.value = this.controls.drum.oscillator2.freq.value

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(this.controls.drum.oscillator2.gain.value, when)
    vca2.gain.linearRampToValueAtTime(
      0, when + this.controls.drum.oscillator2.duration.value
    )

    oscillator1.connect(vca1)
    vca1.connect(amplifier)
    oscillator2.connect(vca2)
    vca2.connect(amplifier)

    oscillator1.start(when)
    oscillator2.start(when)

    oscillator1.stop(when + this.controls.duration.value)
    oscillator2.stop(when + this.controls.duration.value)
  }

  playSnare(when, amplifier) {
    const noise = this.context.createBufferSource()
    noise.buffer = this.noiseBuffer

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = this.controls.snare.lowPassFilter.freq.value

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(this.controls.snare.lowPassFilter.gain.value, when)
    vca1.gain.linearRampToValueAtTime(
      0, when + this.controls.snare.lowPassFilter.duration.value
    )

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = this.controls.snare.highPassFilter.freq.value

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(this.controls.snare.highPassFilter.gain.value, when)
    vca2.gain.linearRampToValueAtTime(
      0, when + this.controls.snare.highPassFilter.duration.value
    )

    const snappy = this.context.createGain()
    snappy.gain.setValueAtTime(0, when)
    snappy.gain.linearRampToValueAtTime(1, when + this.controls.snare.snappy.value)

    noise.connect(lpf)
    lpf.connect(vca1)
    lpf.connect(hpf)
    hpf.connect(vca2)
    vca1.connect(snappy)
    vca2.connect(snappy)
    snappy.connect(amplifier)

    noise.start(when)
    noise.stop(when + this.controls.duration.value)
  }
}

export default SnareDrum