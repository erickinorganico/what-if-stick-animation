// Prepara una copia de trabajo del motor oficial dentro de un expediente BUILD, sin tocar los archivos compartidos (v1.1).
// NO es una vía para saltar permisos: sólo se usa cuando el encargo humano autoriza por escrito LEER el repo del canal y
// ESCRIBIR en el expediente. Si la sesión no tiene esos permisos, se detiene y se pide la autorización; no se busca otro camino.
// uso: node preparar_expediente.mjs --autorizacion <encargo.md dentro del expediente> --repo <el-hubiera> --expediente <BUILD/...>
//        --episodio <carpeta del episodio> [--node_modules <instalación existente con playwright>] [--destino r2/motor]
// Reglas: el destino debe NO existir (nunca sobrescribe una copia previa); la autorización debe existir dentro del expediente y
// mencionar lectura y escritura; al final escribe <destino>/PROCEDENCIA.json con origen, fecha y hashes de lo copiado.
import fs from 'fs'; import path from 'path'; import crypto from 'crypto'; import { execFileSync } from 'child_process';
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const auto = arg('autorizacion'), repo = arg('repo'), exp = arg('expediente'), epSrc = arg('episodio'), nm = arg('node_modules');
const fallar = m => { console.error('DETENIDO: ' + m + ' · no se copió nada'); process.exit(1); };
if (!auto || !repo || !exp || !epSrc) fallar('faltan argumentos (--autorizacion --repo --expediente --episodio)');
const E = path.resolve(exp), A = path.resolve(auto), W = path.resolve(E, arg('destino') || path.join('r2', 'motor'));
if (!fs.existsSync(A) || !A.startsWith(E + path.sep)) fallar('la autorización debe ser un archivo existente dentro del expediente');
const txt = fs.readFileSync(A, 'utf8').toLowerCase(); if (!/lectura|leer/.test(txt) || !/escritura|edici[oó]n|escribir/.test(txt)) fallar('la autorización no menciona lectura y escritura');
if (!W.startsWith(E + path.sep)) fallar('el destino debe quedar dentro del expediente');
if (fs.existsSync(W)) fallar(`el destino ya existe (${W}); usa uno nuevo, p. ej. --destino r2b/motor`);
for (const p of [repo, epSrc]) if (!fs.existsSync(p)) fallar('no existe ' + p);
const hashes = {}; const cp = (s, d) => { fs.cpSync(s, d, { recursive: true, errorOnExist: true, force: false, filter: x => !x.includes('__pycache__') }); };
fs.mkdirSync(W, { recursive: true });
for (const d of ['herramientas', 'docs', 'marca/fuentes', 'marca/generador', 'package.json', 'package-lock.json']) { const s = path.join(repo, d); if (fs.existsSync(s)) cp(s, path.join(W, d)); }
cp(epSrc, path.join(W, 'episodios', path.basename(epSrc)));
if (nm) for (const n of ['playwright', 'playwright-core']) cp(path.join(nm, n), path.join(W, 'node_modules', n));
for (const f of ['herramientas/producir.py', 'herramientas/render.mjs', 'herramientas/codificar.py', 'herramientas/qa_render.py']) { const p = path.join(W, f); if (fs.existsSync(p)) hashes[f] = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); }
const rep = {}; const prueba = (k, cmd, a) => { try { rep[k] = execFileSync(cmd, a, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).split('\n')[0].trim() || 'ok'; } catch (e) { rep[k] = 'FALTA'; } };
prueba('ffmpeg', 'ffmpeg', ['-version']); prueba('ffprobe', 'ffprobe', ['-version']);
prueba('python_numpy_pil', 'python', ['-c', 'import numpy, PIL; print("ok")']); prueba('python_scipy', 'python', ['-c', 'import scipy; print("ok")']);
rep.playwright = fs.existsSync(path.join(W, 'node_modules', 'playwright', 'package.json')) ? 'ok' : 'FALTA';
fs.writeFileSync(path.join(W, 'PROCEDENCIA.json'), JSON.stringify({ autorizacion: A, repo: path.resolve(repo), episodio: path.resolve(epSrc), node_modules: nm, fecha: new Date().toISOString(), hashes, entorno: rep }, null, 1));
console.log(JSON.stringify({ destino: W, entorno: rep }, null, 1));
if (rep.python_scipy === 'FALTA') console.log('Aviso: el audio_*.py usa scipy. NO lo sustituyas solo: pide instalar scipy o la aprobación humana del filtro alterno (ver guía), con comparación auditiva.');
