export default function whiteNoise(context, duration) {
  const frameCount = context.sampleRate * duration
  const buffer = context.createBuffer(2, frameCount, context.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const nowBuffering = buffer.getChannelData(channel)
    for (let i = 0; i < frameCount; i++) {
      nowBuffering[i] = Math.random() * 2 - 1
    }
  }
  return buffer
}