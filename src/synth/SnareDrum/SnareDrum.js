import whiteNoise from '../Noise/whiteNoise'

class SnareDrum {
  constructor(context, destination) {
    this.context = context
    this.destination = destination
    this.noiseBuffer = whiteNoise(context, 2)
  }

  playSound(when) {
    const oscillator1 = this.context.createOscillator()
    oscillator1.type = 'triangle'
    oscillator1.frequency.value = 330

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(1, when)
    vca1.gain.linearRampToValueAtTime(0, when + 0.055)

    const oscillator2 = this.context.createOscillator()
    oscillator2.type = 'triangle'
    oscillator2.frequency.value = 180

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(1, when)
    vca2.gain.linearRampToValueAtTime(0, when + 0.075)

    const noise = this.context.createBufferSource()
    noise.buffer = this.noiseBuffer

    const lpf = this.context.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 7040

    const vca3 = this.context.createGain()
    vca3.gain.setValueAtTime(0.15, when)
    vca3.gain.linearRampToValueAtTime(0, when + 0.4)

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = 523

    const vca4 = this.context.createGain()
    vca4.gain.setValueAtTime(0.15, when)
    vca4.gain.linearRampToValueAtTime(0, when + 0.283)

    const vca5 = this.context.createGain()
    vca5.gain.setValueAtTime(0, when)
    vca5.gain.linearRampToValueAtTime(1, when + 0.02)

    oscillator1.connect(vca1)
    vca1.connect(this.destination)
    oscillator2.connect(vca2)
    vca2.connect(this.destination)
    noise.connect(lpf)
    lpf.connect(vca3)
    lpf.connect(hpf)
    hpf.connect(vca4)
    vca3.connect(vca5)
    vca4.connect(vca5)
    vca5.connect(this.destination)

    oscillator1.start(when)
    oscillator2.start(when)
    noise.start(when)

    oscillator1.stop(when + 0.5)
    oscillator2.stop(when + 0.5)
    noise.stop(when + 0.5)
  }
}

export default SnareDrum