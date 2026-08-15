const fs = require('fs');
const path = require('path');
const minifyHTML = require('html-minifier-terser').minify;
const cssnano = require('cssnano');
const postcss = require('postcss');
const terser = require('terser');

const buildDir = '_site';

function minifyDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      minifyDirectory(filePath); 
    } else if (file.endsWith('.html')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      minifyHTML(content, {
        removeComments: true,
        removeRedundantAttributes: true,
        collapseWhitespace: true,
      }).then(minified => {
        fs.writeFileSync(filePath, minified);
      });
    } else if (file.endsWith('.css')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      postcss([cssnano]).process(content).then(result => {
        fs.writeFileSync(filePath, result.css);
      });
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      terser.minify(content).then(result => {
        fs.writeFileSync(filePath, result.code);
      });
    }
  });
}

minifyDirectory(buildDir);
