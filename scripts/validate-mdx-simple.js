#!/usr/bin/env node

/**
 * Validador MDX simples para prevenir padrões problemáticos
 */

import fs from 'fs';
import { glob } from 'glob';

const CONTENT_DIR = 'src/content/notes/**/*.mdx';

async function validateMDXFiles() {
  console.log('🔍 Validando arquivos MDX...\n');
  
  try {
    const files = await glob(CONTENT_DIR);
    let hasErrors = false;
    let totalIssues = 0;
    
    for (const file of files) {
      console.log(`📄 Verificando: ${file}`);
      const content = fs.readFileSync(file, 'utf-8');
      const fileIssues = [];
      
      // 1. Verificar múltiplos delimitadores ---
      const delimiterMatches = content.match(/^---$/gm);
      if (delimiterMatches && delimiterMatches.length > 2) {
        fileIssues.push({
          type: 'frontmatter_delimiters',
          message: `Encontrados ${delimiterMatches.length} delimitadores "---". Devem ser apenas 2 (início e fim do frontmatter).`,
        });
      }
      
      // 2. Verificar H1 duplicados básico
      const h1Matches = content.match(/^# [A-Za-z]/gm);
      if (h1Matches && h1Matches.length > 0) {
        // Verificar se está no conteúdo (após frontmatter)
        const frontmatterEnd = content.indexOf('---', content.indexOf('---') + 1);
        if (frontmatterEnd > -1) {
          const contentPart = content.substring(frontmatterEnd + 3);
          const h1InContent = contentPart.match(/^# [A-Za-z]/gm);
          if (h1InContent && h1InContent.length > 0) {
            fileIssues.push({
              type: 'duplicate_h1',
              message: `H1 encontrado no conteúdo. O título já é renderizado pelo layout.`,
            });
          }
        }
      }
      
      // Reportar issues
      if (fileIssues.length > 0) {
        hasErrors = true;
        totalIssues += fileIssues.length;
        
        fileIssues.forEach(issue => {
          console.log(`   ❌ ${issue.type.toUpperCase()}: ${issue.message}`);
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
    
  } catch (error) {
    console.error('❌ Erro durante validação:', error.message);
    process.exit(1);
  }
}

// Executa se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  validateMDXFiles();
}

export { validateMDXFiles };
