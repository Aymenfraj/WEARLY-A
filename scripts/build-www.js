// Assemble src/legacy/*.js (ordre alphabetique) en www/js/legacy/app.js
const fs = require('fs'), p = require('path'), dir = p.join(__dirname, '..', 'src', 'legacy');
const out = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().map(f => fs.readFileSync(p.join(dir, f), 'utf8')).join('');
fs.writeFileSync(p.join(__dirname, '..', 'www', 'js', 'legacy', 'app.js'), out);
console.log('legacy assemble :', out.length, 'octets');
