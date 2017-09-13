import controls from './controls'

class HiHat {
  controls = {
    modulatorGain: { step: 10, max: 100000, value: 22800 }
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when) {
    const duration = 0.520

    const modulator1 = this.context.createOscillator()
    modulator1.type = 'square'
    modulator1.frequency.value = 1047

    const modulator1Gain = this.context.createGain()
    modulator1Gain.gain.value = this.controls.modulatorGain.value

    const carrier1 = this.context.createOscillator()
    carrier1.type = 'square'
    carrier1.frequency.value = 1481

    const modulator2 = this.context.createOscillator()
    modulator2.type = 'square'
    modulator2.frequency.value = 1109

    const modulator2Gain = this.context.createGain()
    modulator2Gain.gain.value = this.controls.modulatorGain.value

    const carrier2 = this.context.createOscillator()
    carrier2.type = 'square'
    carrier2.frequency.value = 1049

    const modulator3 = this.context.createOscillator()
    modulator3.type = 'square'
    modulator3.frequency.value = 1109

    const modulator3Gain = this.context.createGain()
    modulator3Gain.gain.value = this.controls.modulatorGain.value

    const carrier3 = this.context.createOscillator()
    carrier3.type = 'square'
    carrier3.frequency.value = 1049

    const bpf = this.context.createBiquadFilter()
    bpf.type = 'bandpass'
    bpf.frequency.value = 15800

    const hpf = this.context.createBiquadFilter()
    hpf.type = 'highpass'
    hpf.frequency.value = 1570
    hpf.Q.value = 66

    const vca1 = this.context.createGain()
    vca1.gain.setValueAtTime(100, when)
    vca1.gain.exponentialRampToValueAtTime(0.00001, when + 0.367)

    const vca2 = this.context.createGain()
    vca2.gain.setValueAtTime(0.01, when)
    vca2.gain.exponentialRampToValueAtTime(0.00001, when + duration)

    modulator1.connect(modulator1Gain)
    modulator1Gain.connect(carrier1.frequency)
    carrier1.connect(bpf)
    carrier1.connect(hpf)

    modulator2.connect(modulator2Gain)
    modulator2Gain.connect(carrier2.frequency)
    carrier2.connect(bpf)
    carrier2.connect(hpf)

    modulator3.connect(modulator3Gain)
    modulator3Gain.connect(carrier3.frequency)
    carrier3.connect(bpf)
    carrier3.connect(hpf)

    bpf.connect(vca1)
    vca1.connect(vca2)
    hpf.connect(vca2)

    vca2.connect(this.destination)

    modulator1.start(when)
    carrier1.start(when)
    modulator2.start(when)
    carrier2.start(when)
    modulator3.start(when)
    carrier3.start(when)

    modulator1.stop(when + duration)
    carrier1.stop(when + duration)
    modulator2.stop(when + duration)
    carrier2.stop(when + duration)
    modulator3.stop(when + duration)
    carrier3.stop(when + duration)
  }
}

export default HiHat