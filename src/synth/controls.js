const controls = {
  gain: { step: 0.1, max: 10 },
  duration: { step: 0.01, max: 10 },
  frequency: { step: 10, max: 8000 },
  Q: { step: 0.1, max: 10 },
  modulator: { gain: { step: 10, max: 10000 } },
}

export const exponentialZero = 0.00001

export default controls