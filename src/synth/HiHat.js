import controls from './controls'

const Type = {
  closed: 1,
  open: 2,
}

class HiHat {
  controls = {
    gain: { ...controls.gain, value: 0.6 },
    envelope: {
      attack: { ...controls.duration, step: 0.001, value: 0.0005 },
      hold: { ...controls.duration, step: 0.001, value: 0.0005 },
      decay: {
        closed: { ...controls.duration, value: 0.03 },
        open: { ...controls.duration, value: 0.18 }
      },
    },
    oscillators: {
      modFm: { ...controls.modulator.gain, max: 40000, value: 5000 },
      modPitch: { ...controls.modulator.gain, max: 40000, value: 5000 },

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
        freq1: { ...controls.frequency, max: 30000, value: 8650 },
        freq2: { ...controls.frequency, max: 30000, value: 12820 },
      },
      envelope: {
        attack: { ...controls.duration, step: 0.001, value: 0.0005 },
        decay: { ...controls.duration, value: 0.15 },
      },
    },
    body: {
      highPassFilter: {
        gain: { ...controls.gain, step: 0.01, value: 0.4 },
        freq1: { ...controls.frequency, value: 1880 },
        freq2: { ...controls.frequency, value: 3070 },
        Q: { ...controls.Q, max: 100, value: 1 },
      },
      envelope: {
        attack: { ...controls.duration, step: 0.001, value: 0.0026 },
        hold: { ...controls.duration, step: 0.001, value: 0.0005 },
        decay: { ...controls.duration, value: 0.3 },
      },
    },
  }

  constructor(context, destination) {
    this.context = context
    this.destination = destination
    this.createSound()
    this.update()
  }

  createSound() {
    this.oscillators = Array.from({ length: 3 }, () => this.createOscillator())
    this.createImpact()
    this.createBody()

    this.vca = this.context.createGain()
    this.vca.gain.value = 0

    this.impact.connect(this.vca)
    this.body.connect(this.vca)
    this.vca.connect(this.destination)
  }

  createOscillator() {
    const modulator = this.context.createOscillator()
    modulator.type = 'square'

    const fm = this.context.createGain()
    const pitch = this.context.createGain()

    const carrier = this.context.createOscillator()
    carrier.type = 'square'

    modulator.connect(fm)
    modulator.connect(pitch)
    fm.connect(carrier.frequency)
    pitch.connect(carrier.detune)

    modulator.start()
    carrier.start()

    return { modulator, fm, pitch, carrier }
  }

  createImpact() {
    this.bpf = this.context.createBiquadFilter()
    this.bpf.type = 'bandpass'

    this.impact = this.context.createGain()
    this.impact.gain.value = 0

    this.oscillators.forEach(({ carrier }) => carrier.connect(this.bpf))
    this.bpf.connect(this.impact)
  }

  createBody() {
    this.hpf = this.context.createBiquadFilter()
    this.hpf.type = 'highpass'

    this.body = this.context.createGain()

    this.oscillators.forEach(({ carrier }) => carrier.connect(this.hpf))
    this.hpf.connect(this.body)
  }

  update() {
    this.oscillators.forEach(({ modulator, fm, pitch, carrier }, i) => {
      const frequency = this.controls.oscillators[`osc${i + 1}Freq`]
      modulator.frequency.value = frequency.modulator.value
      fm.gain.value = this.controls.oscillators.modFm.value
      pitch.gain.value = this.controls.oscillators.modPitch.value
      carrier.frequency.value = frequency.carrier.value
    })
    this.bpf.frequency.value = this.controls.impact.bandPassFilter.freq1.value
    this.hpf.frequency.value = this.controls.body.highPassFilter.freq1.value
    this.hpf.Q.value = this.controls.body.highPassFilter.Q.value
    this.body.gain.value = this.controls.body.highPassFilter.gain.value
  }

  playSound(when, type) {
    this.playImpact(when)
    this.playBody(when)

    const attack = when + this.controls.envelope.attack.value
    const hold = attack + this.controls.envelope.hold.value
    let decay
    switch (type) {
      case Type.closed:
        decay = this.controls.envelope.decay.closed.value
        break
      case Type.open:
        decay = this.controls.envelope.decay.open.value
        break
    }

    this.vca.gain.cancelScheduledValues(when)
    this.vca.gain.setValueAtTime(0, when)
    this.vca.gain.linearRampToValueAtTime(this.controls.gain.value, attack)
    this.vca.gain.setTargetAtTime(0, hold, decay)
  }

  playImpact(when) {
    const attack = when + this.controls.impact.envelope.attack.value

    this.bpf.frequency.cancelScheduledValues(when)
    this.bpf.frequency.setValueAtTime(
      this.controls.impact.bandPassFilter.freq1.value,
      when)
    this.bpf.frequency.linearRampToValueAtTime(
      this.controls.impact.bandPassFilter.freq2.value,
      attack
    )
    this.bpf.frequency.setTargetAtTime(
      this.controls.impact.bandPassFilter.freq1.value,
      attack,
      this.controls.impact.envelope.decay.value
    )

    this.impact.gain.cancelScheduledValues(when)
    this.impact.gain.setValueAtTime(0, when)
    this.impact.gain.linearRampToValueAtTime(
      this.controls.impact.bandPassFilter.gain.value,
      attack
    )
    this.impact.gain.setTargetAtTime(
      0,
      attack,
      this.controls.impact.envelope.decay.value
    )
  }

  playBody(when) {
    const attack = when + this.controls.body.envelope.attack.value
    const hold = attack + this.controls.body.envelope.hold.value

    this.hpf.frequency.cancelScheduledValues(when)
    this.hpf.frequency.setValueAtTime(
      this.controls.body.highPassFilter.freq1.value,
      when
    )
    this.hpf.frequency.linearRampToValueAtTime(
      this.controls.body.highPassFilter.freq2.value,
      attack
    )
    this.hpf.frequency.setTargetAtTime(
      this.controls.body.highPassFilter.freq1.value,
      hold,
      this.controls.body.envelope.decay.value
    )
  }
}

export default HiHat