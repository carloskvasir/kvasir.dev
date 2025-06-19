#!/usr/bin/env node

/**
 * Script para validar se o RSS feed está funcionando corretamente
 */

const fs = require('fs')
const path = require('path')

function validateRSSFeed() {
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml')
  
  try {
    console.log('🔍 Validando RSS feed...')
    
    // Verificar se o arquivo existe
    if (!fs.existsSync(rssPath)) {
      console.error('❌ Arquivo RSS não encontrado em public/rss.xml')
      console.log('💡 Execute: npm run generate:rss')
      process.exit(1)
    }
    
    // Ler o conteúdo
    const rssContent = fs.readFileSync(rssPath, 'utf8')
    
    // Validações básicas
    const checks = [
      {
        name: 'XML válido',
        test: () => rssContent.includes('<?xml version="1.0"'),
        error: 'XML header não encontrado'
      },
      {
        name: 'RSS channel',
        test: () => rssContent.includes('<channel>'),
        error: 'RSS channel não encontrado'
      },
      {
        name: 'Título do site',
        test: () => rssContent.includes('Kvasir.dev'),
        error: 'Título do site não encontrado'
      },
      {
        name: 'Posts incluídos',
        test: () => rssContent.includes('<item>'),
        error: 'Nenhum post encontrado no feed'
      },
      {
        name: 'Content encoded',
        test: () => rssContent.includes('content:encoded'),
        error: 'Content encoded não encontrado'
      },
      {
        name: 'Dublin Core',
        test: () => rssContent.includes('dc:creator'),
        error: 'Dublin Core metadata não encontrado'
      },
      {
        name: 'Namespaces',
        test: () => rssContent.includes('xmlns:dc='),
        error: 'Namespaces XML não encontrados'
      }
    ]
    
    let allPassed = true
    
    checks.forEach(check => {
      if (check.test()) {
        console.log(`✅ ${check.name}`)
      } else {
        console.error(`❌ ${check.name}: ${check.error}`)
        allPassed = false
      }
    })
    
    // Contar posts
    const itemCount = (rssContent.match(/<item>/g) || []).length
    console.log(`📝 ${itemCount} posts encontrados no feed`)
    
    // Verificar tamanho
    const fileSize = fs.statSync(rssPath).size
    console.log(`📊 Tamanho do arquivo: ${fileSize} bytes`)
    
    if (allPassed) {
      console.log('✅ RSS feed válido e funcionando!')
      console.log(`🔗 Disponível em: http://localhost:3000/rss.xml`)
      console.log(`🌐 Produção: https://kvasir.dev/rss.xml`)
    } else {
      console.error('❌ RSS feed tem problemas!')
      process.exit(1)
    }
    
  } catch (error) {
    console.error('❌ Erro ao validar RSS:', error.message)
    process.exit(1)
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  validateRSSFeed()
}

module.exports = { validateRSSFeed }
