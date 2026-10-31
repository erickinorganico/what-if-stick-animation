# v4 de la voz: cambia el "¡Ay, mamá!" del cantante genérico por el del clip que subió el usuario (frase 1, voz aislada)
import numpy as np, soundfile as sf, json
SR = 48000
voz, sr = sf.read('proyecto/assets/voz-v2.wav'); assert sr == SR
clip, sr2 = sf.read('revision/aymama/frases/ay-mama-1-voz.wav'); assert sr2 == SR
clip = clip.mean(1) if clip.ndim > 1 else clip
W = {w['text']: w for w in json.load(open('revision/voz-palabras-v2.json'))['words'] if w.get('canto')}
a_ay, e_mama, s_pura = W['¡Ay,']['start'], W['mamá!']['end'], W['Pura']['start']
rms = lambda x: np.sqrt(np.mean(x ** 2) + 1e-12)
ref = voz[int(a_ay * SR):int(e_mama * SR)]
gain = rms(ref) / rms(clip[int(.04 * SR):]) * .98  # mismo nivel que el "¡Ay, mamá!" de la v3
# silenciar el "¡Ay, mamá!" generado con rampas de 15 ms
z0, z1 = a_ay - .06, s_pura - .03
f = int(.015 * SR); env = np.ones(len(voz))
env[int(z0 * SR):int(z1 * SR)] = 0
env[int(z0 * SR) - f:int(z0 * SR)] = np.linspace(1, 0, f); env[int(z1 * SR):int(z1 * SR) + f] = np.linspace(0, 1, f)
out = voz * env
# el clip empieza 40 ms antes del ataque: lo alineamos para que "ay" caiga donde caía el original
t0 = a_ay - .04
seg = clip[:int((z1 + .015 - t0) * SR)] * gain
seg[-f:] *= np.linspace(1, 0, f)
out[int(t0 * SR):int(t0 * SR) + len(seg)] += seg
peak = np.abs(out).max(); out = out / peak * .98 if peak > .98 else out
sf.write('proyecto/assets/voz-v3.wav', out, SR, subtype='PCM_16')
print('ok', round(a_ay, 3), round(s_pura, 3), 'clip', round(len(clip) / SR, 2), 'usado', round(len(seg) / SR, 2), 'gain', round(gain, 2))
