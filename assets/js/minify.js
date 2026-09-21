const fs = require('fs');
const path = require('path');
const { minify: minifyHtml } = require('html-minifier-terser');
const { minify: minifyJs } = require('terser');
const CleanCSS = require('clean-css');

const siteDir = './_site';

function walkDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      walkDir(fullPath);
    } else if (file.isFile()) {
      processFile(fullPath);
    }
  });
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  try {
    if (ext === '.html') {
      const content = fs.readFileSync(filePath, 'utf8');
      const minified = await minifyHtml(content, {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      });
      fs.writeFileSync(filePath, minified);
      console.log(`${filePath}`);
    } else if (ext === '.css') {
      const content = fs.readFileSync(filePath, 'utf8');
      const minified = new CleanCSS().minify(content).styles;
      fs.writeFileSync(filePath, minified);
      console.log(`${filePath}`);
    } else if (ext === '.js') {
      const content = fs.readFileSync(filePath, 'utf8');
      const result = await minifyJs(content);
      fs.writeFileSync(filePath, result.code);
      console.log(`${filePath}`);
    }
  } catch (err) {
    console.error(`Error minifying ${filePath}:`, err.message);
  }
}

walkDir(siteDir);
