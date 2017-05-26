import React from 'react'

import BassDrum from './BassDrum'

const context = new AudioContext()

const master = context.createGain()
master.gain.value = 0.1
master.connect(context.destination)

const bassDrum = new BassDrum(context, master)

const bpm = 120

const secondsPerBeat = 60 / bpm
let next = context.currentTime
bassDrum.playSound(next)

function loop() {
  if (context.currentTime >= next) {
    next += secondsPerBeat
    bassDrum.playSound(next)
  }
  setTimeout(loop, 50)
}
loop()

const App = () => (
  <div></div>
)

export default App