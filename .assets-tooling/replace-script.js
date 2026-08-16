const fs = require('fs');
const p = '../grupo-educacional-san-amaro/project/Inscripciones.dc.html';
const lines = fs.readFileSync(p, 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('<script type="text/x-dc" data-dc-script>'));
const endIdx = lines.findIndex(l => l.trim() === '</script>');

const newBlock = [
'<script type="text/x-dc" data-dc-script>',
'class Component extends DCLogic {',
'  componentDidMount() {',
"    document.querySelectorAll('[data-acc]').forEach(btn => {",
"      btn.addEventListener('click', () => {",
'        const body = btn.nextElementSibling;',
"        const isOpen = btn.getAttribute('aria-expanded') === 'true';",
"        btn.setAttribute('aria-expanded', !isOpen);",
"        body.style.maxHeight = isOpen ? '0' : body.scrollHeight + 'px';",
'      });',
'    });',
'  }',
'}',
'</script>'
];

lines.splice(startIdx, endIdx - startIdx + 1, ...newBlock);
fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('Replaced script block, lines', startIdx+1, 'to', endIdx+1);
