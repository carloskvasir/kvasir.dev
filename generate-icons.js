const fs = require('fs');
const path = require('path');

// Gerar um favicon simples como SVG
const faviconSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" rx="2" fill="#000000"/>
  <text x="8" y="12" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="white" text-anchor="middle">Ck</text>
</svg>`;

// Salvar o favicon SVG
fs.writeFileSync(path.join(__dirname, 'public', 'favicon.svg'), faviconSvg);

console.log('✅ Favicon SVG criado com sucesso!');

// Criar diferentes tamanhos de ícone
const iconSizes = [16, 32, 180, 192, 512];

iconSizes.forEach(size => {
  const iconSvg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.125)}" fill="#000000"/>
    <text x="${size/2}" y="${size * 0.75}" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold" fill="white" text-anchor="middle">Ck</text>
  </svg>`;
  
  fs.writeFileSync(path.join(__dirname, 'public', `icon-${size}.svg`), iconSvg);
  console.log(`✅ Ícone ${size}x${size} criado!`);
});

console.log('✅ Todos os ícones foram criados com sucesso!');
