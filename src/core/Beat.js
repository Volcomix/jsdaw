class Beat {
  constructor(context, synth) {
    this.context = context
    this.synth = synth
    this.bpm = 120
    this.isLooping = false
  }

  start() {
    this.last = this.context.currentTime + 0.05 // Delay to ear the sound beginning
    this.synth.playSound(this.last)
    this.isLooping = true
    this.loop()
  }

  stop() {
    this.isLooping = false
  }

  loop = () => {
    if (!this.isLooping) {
      return
    }
    const secondsPerBeat = 60 / this.bpm
    for (
      let next = this.last + secondsPerBeat;
      next < this.context.currentTime + 0.1;
      next += secondsPerBeat
    ) {
      this.synth.playSound(next)
      this.last = next
    }
    setTimeout(this.loop, 25)
  }
}

export default Beat