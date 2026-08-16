const fs = require('fs');
const p = '../grupo-educacional-san-amaro/project/Inscripciones.dc.html';
const lines = fs.readFileSync(p, 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('<!-- Form -->'));
const accIdx = lines.findIndex(l => l.includes('<!-- Accordion -->'));
const endIdx = accIdx - 2; // the closing </div> of the form block

const newBlock = [
'    <!-- Form -->',
'    <div style="display:flex;flex-direction:column;gap:20px;background:#0D0D0D;border-radius:28px;padding:48px 40px;text-align:center;align-items:center;justify-content:center;">',
'      <div style="width:56px;height:56px;background:rgba(255,255,255,.08);border-radius:16px;display:flex;align-items:center;justify-content:center;">',
'        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
'      </div>',
'      <h2 style="font-family:\'Fraunces\',serif;font-size:28px;font-weight:600;color:#FAF9F5;">Formulario de inscripción</h2>',
'      <p style="font-size:15px;color:rgba(255,255,255,.55);font-weight:300;line-height:1.6;max-width:360px;">Completa o rellena tus datos y elige el programa al que deseas inscribirte.</p>',
'      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXVT9YbkJyJp5KWvJhLPAficqPbMH0e-U2iDUweuIOpPe67Q/viewform" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;background:#fff;color:#0D0D0D;font-size:15px;font-weight:600;padding:16px 32px;border-radius:100px;transition:opacity .2s;margin-top:8px;" style-hover="opacity:.85;">Completar formulario de inscripción →</a>',
'      <p style="font-size:12px;color:rgba(255,255,255,.3);font-weight:300;">Al enviar aceptas nuestras <a href="Politicas Comerciales.dc.html" style="text-decoration:underline;color:rgba(255,255,255,.5);">Políticas Comerciales</a>.</p>',
'    </div>'
];

lines.splice(startIdx, endIdx - startIdx + 1, ...newBlock);
fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('Replaced lines', startIdx+1, 'to', endIdx+1);
