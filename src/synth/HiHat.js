import controls from './controls'

class HiHat {
  controls = {
    pitch: { step: 10, max: 100000, value: 22800 }
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
  }

  playSound(when) {
    const duration = 0.520
    const modulatorPitchGainValue = this.controls.pitch.value
    const modulatorFMGainValue = 0

    const modulator1 = this.context.createOscillator()
    modulator1.type = 'square'
    modulator1.frequency.value = 1047

    const modulator1PitchGain = this.context.createGain()
    modulator1PitchGain.gain.value = modulatorPitchGainValue

    const modulator1FMGain = this.context.createGain()
    modulator1FMGain.gain.value = modulatorFMGainValue

    const carrier1 = this.context.createOscillator()
    carrier1.type = 'square'
    carrier1.frequency.value = 1481

    const modulator2 = this.context.createOscillator()
    modulator2.type = 'square'
    modulator2.frequency.value = 1109

    const modulator2PitchGain = this.context.createGain()
    modulator2PitchGain.gain.value = modulatorPitchGainValue

    const modulator2FMGain = this.context.createGain()
    modulator2FMGain.gain.value = modulatorFMGainValue

    const carrier2 = this.context.createOscillator()
    carrier2.type = 'square'
    carrier2.frequency.value = 1049

    const modulator3 = this.context.createOscillator()
    modulator3.type = 'square'
    modulator3.frequency.value = 1109

    const modulator3PitchGain = this.context.createGain()
    modulator3PitchGain.gain.value = modulatorPitchGainValue

    const modulator3FMGain = this.context.createGain()
    modulator3FMGain.gain.value = modulatorFMGainValue

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

    modulator1.connect(modulator1PitchGain)
    modulator1.connect(modulator1FMGain)
    modulator1PitchGain.connect(carrier1.frequency)
    modulator1FMGain.connect(carrier1.detune)
    carrier1.connect(bpf)
    carrier1.connect(hpf)

    modulator2.connect(modulator2PitchGain)
    modulator2.connect(modulator2FMGain)
    modulator2PitchGain.connect(carrier2.frequency)
    modulator2FMGain.connect(carrier2.detune)
    carrier2.connect(bpf)
    carrier2.connect(hpf)

    modulator3.connect(modulator3PitchGain)
    modulator3.connect(modulator3FMGain)
    modulator3PitchGain.connect(carrier3.frequency)
    modulator3FMGain.connect(carrier3.detune)
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