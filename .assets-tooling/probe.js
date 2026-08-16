const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png)$/i.test(f));

(async () => {
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    try {
      const meta = await sharp(full).metadata();
      console.log(`${f}\t${meta.width}x${meta.height}\t${(stat.size/1024).toFixed(0)}KB\t${meta.format}\thasAlpha=${meta.hasAlpha}`);
    } catch (e) {
      console.log(`${f}\tERROR ${e.message}`);
    }
  }
})();
