// Parche acotado por plano (v1.1, CommonJS: el repo es "type": "module", por eso .cjs).
// Reemplaza sólo los bloques `sh(N, …);` indicados y conserva todo lo demás (ayudantes, transiciones, comentarios).
// uso: node parche_planos.cjs <tomas_base.js> <nuevos.js> <salida.js>
//   nuevos.js: bloques que empiezan en columna 0 con «sh(N,». Texto antes del primer bloque = ayudantes nuevos:
//   se insertan justo antes del primer plano reemplazado.
// Falla SIN ESCRIBIR (código 1) si: la salida ya existe o es la base; un plano está repetido en nuevos.js o en la base;
// un plano de nuevos.js no existe en la base; un bloque no cierra; o el resultado no compila (vm.Script).
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const [base, nuevos, salida] = process.argv.slice(2);
const fallar = m => { console.error('ERROR: ' + m + ' · no se escribió nada'); process.exit(1); };
if (!base || !nuevos || !salida) { console.error('uso: node parche_planos.cjs <base.js> <nuevos.js> <salida.js>'); process.exit(2); }
if (path.resolve(salida) === path.resolve(base)) fallar('la salida no puede ser la base');
if (fs.existsSync(salida)) fallar(`la salida ya existe: ${salida}`);

// fin del bloque que empieza en i ("sh(") : paréntesis balanceados, ignorando cadenas, plantillas y comentarios; incluye «;»
function finBloque(s, i) {
  let d = 0, k = i + 2; const n = s.length;
  for (; k < n; k++) {
    const c = s[k], c2 = s[k + 1];
    if (c === '/' && c2 === '/') { k = s.indexOf('\n', k); if (k < 0) return -1; continue; }
    if (c === '/' && c2 === '*') { k = s.indexOf('*/', k + 2); if (k < 0) return -1; k++; continue; }
    if (c === '"' || c === "'" || c === '`') { const q = c; for (k++; k < n && s[k] !== q; k++) if (s[k] === '\\') k++; continue; }
    if (c === '(') d++; else if (c === ')') { d--; if (d === 0) { k++; while (s[k] === ' ') k++; if (s[k] === ';') k++; return k; } }
  }
  return -1;
}
function bloques(s, nombre) {
  const out = [], re = /^sh\((\d+),/gm; let m;
  while ((m = re.exec(s))) { const a = m.index, b = finBloque(s, a); if (b < 0) fallar(`${nombre}: el plano ${m[1]} no cierra`); out.push({ n: m[1], a, b }); re.lastIndex = b; }
  return out;
}
const B = fs.readFileSync(base, 'utf8'), Nw = fs.readFileSync(nuevos, 'utf8');
const bb = bloques(B, 'base'), nb = bloques(Nw, 'nuevos');
const rep = (l, nom) => { const v = {}; l.forEach(x => { if (v[x.n]) fallar(`${nom}: plano ${x.n} repetido`); v[x.n] = 1; }); };
rep(bb, 'base'); rep(nb, 'nuevos');
const faltan = nb.filter(x => !bb.some(y => y.n === x.n)).map(x => x.n); if (faltan.length) fallar(`no están en la base: ${faltan.join(', ')}`);
const ayud = nb.length ? Nw.slice(0, nb[0].a).trim() : Nw.trim();
const nuevo = Object.fromEntries(nb.map(x => [x.n, Nw.slice(x.a, x.b)]));
let out = '', pos = 0, puesto = !ayud;
for (const x of bb) { out += B.slice(pos, x.a); if (nuevo[x.n]) { if (!puesto) { out += ayud + '\n'; puesto = true; } out += nuevo[x.n]; } else out += B.slice(x.a, x.b); pos = x.b; }
out += B.slice(pos);
try { new vm.Script(out, { filename: salida }); } catch (e) { fallar('el resultado no compila: ' + e.message); }
fs.writeFileSync(salida, out, { flag: 'wx' });
console.log(`OK · reemplazados: ${nb.map(x => x.n).join(', ') || '—'} · conservados: ${bb.length - nb.length} · ayudantes nuevos: ${ayud ? 'sí' : 'no'} · ${salida}`);
