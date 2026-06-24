// Browser-side audio helpers. No npm deps. WAV-only output.
// Encodes any AudioBuffer to 16-bit PCM WAV blob.

export function encodeWav(buffer: AudioBuffer): Blob {
  const numCh = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const length = buffer.length
  const bytesPerSample = 2
  const blockAlign = numCh * bytesPerSample
  const dataSize = length * blockAlign
  const ab = new ArrayBuffer(44 + dataSize)
  const view = new DataView(ab)
  let p = 0
  const writeStr = (s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(p++, s.charCodeAt(i)) }
  const writeU32 = (v: number) => { view.setUint32(p, v, true); p += 4 }
  const writeU16 = (v: number) => { view.setUint16(p, v, true); p += 2 }
  writeStr('RIFF')
  writeU32(36 + dataSize)
  writeStr('WAVE')
  writeStr('fmt ')
  writeU32(16)
  writeU16(1) // PCM
  writeU16(numCh)
  writeU32(sampleRate)
  writeU32(sampleRate * blockAlign)
  writeU16(blockAlign)
  writeU16(16)
  writeStr('data')
  writeU32(dataSize)
  // interleave channels
  const channels: Float32Array[] = []
  for (let c = 0; c < numCh; c++) channels.push(buffer.getChannelData(c))
  for (let i = 0; i < length; i++) {
    for (let c = 0; c < numCh; c++) {
      let s = channels[c][i]
      s = Math.max(-1, Math.min(1, s))
      view.setInt16(p, s < 0 ? s * 0x8000 : s * 0x7fff, true)
      p += 2
    }
  }
  return new Blob([ab], { type: 'audio/wav' })
}

export async function decodeFile(file: File): Promise<AudioBuffer> {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const buf = await file.arrayBuffer()
  return ctx.decodeAudioData(buf.slice(0))
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export function fmtTime(sec: number): string {
  if (!isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function newBuffer(numCh: number, length: number, sampleRate: number): AudioBuffer {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
  return ctx.createBuffer(numCh, Math.max(1, length), sampleRate)
}
