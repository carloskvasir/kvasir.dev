#!/usr/bin/env node

/**
 * Validador MDX para prevenir padrões problemáticos
 * 
 * Verifica problemas comuns em arquivos MDX que podem causar bugs:
 * - Múltiplos delimitadores --- no conteúdo (confunde o parser frontmatter)
 * - H1 duplicados (título já é renderizado pelo layout)
 * - Frontmatter mal formado
 * - Campos obrigatórios ausentes
 * 
 * Uso:
 * - node scripts/validate-mdx.js
 * - npm run validate:mdx
 */

import fs from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';

const CONTENT_DIR = 'src/content/notes/**/*.mdx';

// Campos obrigatórios no frontmatter
const REQUIRED_FIELDS = ['title', 'slug', 'date', 'description', 'tags'];

async function validateMDXFiles() {
  console.log('🔍 Validando arquivos MDX...\n');
  
  const files = await glob(CONTENT_DIR);
  let hasErrors = false;
  let totalIssues = 0;
  
  for (const file of files) {
    console.log(`📄 Verificando: ${file}`);
    const content = fs.readFileSync(file, 'utf-8');
    const fileIssues = [];
    
    try {
      // 1. Verificar múltiplos delimitadores ---
      const delimiterMatches = content.match(/^---$/gm);
      if (delimiterMatches && delimiterMatches.length > 2) {
        fileIssues.push({
          type: 'frontmatter_delimiters',
          message: `Encontrados ${delimiterMatches.length} delimitadores "---". Devem ser apenas 2 (início e fim do frontmatter).`,
          fix: 'Substitua "---" extras no conteúdo por "***" (linha horizontal markdown)'
        });
      }
      
      // 2. Tentar fazer parse do frontmatter
      let parsedMatter;
      try {
        parsedMatter = matter(content);
      } catch (error) {
        fileIssues.push({
          type: 'frontmatter_parse_error',
          message: `Erro ao fazer parse do frontmatter: ${error.message}`,
          fix: 'Verifique a sintaxe YAML do frontmatter'
        });
        continue; // Pula outras verificações se não conseguir fazer parse
      }
      
      // 3. Verificar campos obrigatórios
      const missingFields = REQUIRED_FIELDS.filter(field => !parsedMatter.data[field]);
      if (missingFields.length > 0) {
        fileIssues.push({
          type: 'missing_required_fields',
          message: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`,
          fix: 'Adicione os campos obrigatórios no frontmatter'
        });
      }
      
      // 4. Verificar H1 duplicados no conteúdo
      const contentLines = parsedMatter.content.split('\n');
      const h1Lines = [];
      let inCodeBlock = false;
      
      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        
        // Detecta blocos de código
        if (line.startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          continue;
        }
        
        // Ignora linhas dentro de blocos de código
        if (inCodeBlock) {
          continue;
        }
        
        // Detecta H1 no conteúdo markdown
        if (line.match(/^# [A-Za-z]/)) {
          h1Lines.push({
            line: i + 1,
            content: line
          });
        }
      }
      
      if (h1Lines.length > 0) {
        fileIssues.push({
          type: 'duplicate_h1',
          message: `H1 encontrado no conteúdo (linhas: ${h1Lines.map(h => h.line).join(', ')})`,
          fix: 'Remova H1s do conteúdo - o título já é renderizado pelo layout'
        });
      }
      
      // 5. Verificar se slug corresponde ao nome do arquivo/pasta
      const expectedSlug = file.includes('.post/') 
        ? file.split('/').slice(-2, -1)[0].replace(/^\d+\.post$/, file.split('/').slice(-1)[0].replace('.mdx', ''))
        : file.split('/').slice(-1)[0].replace('.mdx', '');
      
      if (parsedMatter.data.slug && parsedMatter.data.slug !== expectedSlug) {
        // Esta é só um aviso, não um erro crítico
        fileIssues.push({
          type: 'slug_mismatch',
          message: `Slug "${parsedMatter.data.slug}" não corresponde ao arquivo/pasta "${expectedSlug}"`,
          fix: 'Verifique se o slug está correto ou renomeie o arquivo',
          severity: 'warning'
        });
      }
      
      // 6. Verificar se data está em formato válido
      if (parsedMatter.data.date) {
        const dateObj = new Date(parsedMatter.data.date);
        if (isNaN(dateObj.getTime())) {
          fileIssues.push({
            type: 'invalid_date',
            message: `Data inválida: "${parsedMatter.data.date}"`,
            fix: 'Use formato YYYY-MM-DD ou ISO 8601'
          });
        }
      }
      
    } catch (error) {
      fileIssues.push({
        type: 'general_error',
        message: `Erro geral: ${error.message}`,
        fix: 'Verifique a estrutura do arquivo'
      });
    }
    
    // Reportar issues encontrados
    if (fileIssues.length > 0) {
      hasErrors = true;
      totalIssues += fileIssues.length;
      
      fileIssues.forEach(issue => {
        const icon = issue.severity === 'warning' ? '⚠️ ' : '❌';
        console.log(`   ${icon} ${issue.type.toUpperCase()}: ${issue.message}`);
        console.log(`      💡 Fix: ${issue.fix}`);
      });
      console.log('');
    } else {
      console.log(`   ✅ OK\n`);
    }
  }
  
  // Resumo final
  console.log(`\n📊 Resumo da validação:`);
  console.log(`   Arquivos verificados: ${files.length}`);
  console.log(`   Issues encontrados: ${totalIssues}`);
  
  if (hasErrors) {
    console.log('\n❌ Validação falhou! Corrija os problemas antes de fazer deploy.');
    process.exit(1);
  } else {
    console.log('\n✅ Todos os arquivos MDX estão válidos!');
  }
}

// Executa apenas se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  validateMDXFiles().catch(console.error);
}

export { validateMDXFiles };
