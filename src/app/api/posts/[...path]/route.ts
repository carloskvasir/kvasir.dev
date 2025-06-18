import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: imagePath } = await params;
    
    // Reconstruir o caminho da imagem
    // URL: /api/posts/2024/12/ambiente-desenvolvimento-rails/image.png
    // Path: notes/2024/12/2.post/image.png
    
    const [year, month, slug, filename] = imagePath;
    
    if (!year || !month || !slug || !filename) {
      return new NextResponse('Invalid path', { status: 400 });
    }

    // Primeiro, tentar encontrar a pasta do post
    const notesDir = path.join(process.cwd(), 'notes');
    const yearPath = path.join(notesDir, year);
    const monthPath = path.join(yearPath, month);
    
    // Verificar diferentes estruturas de pasta
    const imagePaths = [
      path.join(monthPath, `${slug}.post`, filename), // Nova estrutura: 1.post/
      path.join(monthPath, slug, filename),           // Estrutura alternativa
      path.join(monthPath, filename)                  // Arquivo direto no mês
    ];

    // Procurar por pastas numeradas que contenham o slug
    if (fs.existsSync(monthPath)) {
      const folders = fs.readdirSync(monthPath).filter(folder => {
        const folderPath = path.join(monthPath, folder);
        if (!fs.statSync(folderPath).isDirectory()) return false;
        
        // Verificar se é uma pasta numerada (.post) que contém um arquivo com o slug
        if (folder.includes('.post')) {
          const mdxFiles = fs.readdirSync(folderPath)
            .filter(file => file.endsWith('.mdx'))
            .map(file => file.replace('.mdx', ''));
          return mdxFiles.includes(slug);
        }
        return false;
      });
      
      // Adicionar caminhos das pastas encontradas
      folders.forEach(folder => {
        imagePaths.unshift(path.join(monthPath, folder, filename));
      });
    }

    // Tentar encontrar a imagem
    let imagePath: string | null = null;
    for (const testPath of imagePaths) {
      if (fs.existsSync(testPath)) {
        imagePath = testPath;
        break;
      }
    }

    if (!imagePath || !fs.existsSync(imagePath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Ler o arquivo
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Determinar o tipo de conteúdo
    const ext = path.extname(filename).toLowerCase();
    const contentTypeMap: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
    };
    
    const contentType = contentTypeMap[ext] || 'image/png';

    // Retornar a imagem
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
