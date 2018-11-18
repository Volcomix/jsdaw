class DrumPattern {
  bpm = 210
  isLooping = false
  i = 0

  constructor(context, synths, pattern) {
    this.context = context
    this.pattern = pattern
    this.synths = synths
    if (this.isLooping) {
      this.start()
    }
  }

  start() {
    Object.values(this.synths).forEach(synth => {
      synth.start && synth.start()
    })
    // Delay to ear the sound begin
    this.playTick(this.context.currentTime + 0.05)
    this.isLooping = true
    this.loop()
  }

  stop() {
    Object.values(this.synths).forEach(synth => {
      synth.stop && synth.stop()
    })
    this.isLooping = false
    this.i = 0
  }

  loop = () => {
    if (!this.isLooping) {
      return
    }
    const secondsPerBeat = 60 / this.bpm
    const secondsPerTick = secondsPerBeat / 2
    for (
      let next = this.last + secondsPerTick;
      next < this.context.currentTime + 0.1;
      next += secondsPerTick
    ) {
      this.playTick(next)
    }
    setTimeout(this.loop, 25)
  }

  playTick(next) {
    Object.keys(this.pattern).forEach(synthName => {
      const sound = this.pattern[synthName][this.i]
      if (sound) {
        this.synths[synthName].playSound(next, sound)
      }
    })
    this.last = next
    this.i++
    if (this.i === 16) {
      this.i = 0
    }
  }
}

export default DrumPattern