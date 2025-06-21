import { SEO } from "@/components/common/seo";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Calendar, Download, Key, Mail, Shield, User } from "lucide-react";

export const metadata = {
  title: "Chave Pública PGP | kvasir.dev",
  description: "Chave pública GPG/PGP para comunicações seguras e verificação de commits. Fingerprint: CE7A B89A B75B 0EE2 9B5E 5AA6 2912 73FD D1EF 2C4F",
  keywords: ["PGP", "GPG", "segurança", "criptografia", "chave pública", "fingerprint"],
  alternates: {
    canonical: "https://kvasir.dev/security/pgp",
  },
};

const fingerprintText = "CE7A B89A B75B 0EE2 9B5E  5AA6 2912 73FD D1EF 2C4F";
const wgetCommand = "wget -O - https://gpg.kvasir.dev | gpg --import -";

export default function PGPPage() {
  return (
    <MainLayout>
      <SEO
        title="Chave Pública PGP"
        description="Chave pública GPG/PGP para comunicações seguras e verificação de commits. Fingerprint: CE7A B89A B75B 0EE2 9B5E 5AA6 2912 73FD D1EF 2C4F"
        url="https://kvasir.dev/security/pgp"
        type="website"
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Minha Chave Pública GPG
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Esta chave é utilizada para assinar meus commits em projetos de código, 
              bem como para comunicações seguras e criptografadas.
            </p>
          </header>

          {/* Fingerprint Section */}
          <section className="bg-card p-6 rounded-lg border space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Key className="h-6 w-6" />
              Fingerprint da Chave
            </h2>
            
            <div className="bg-muted p-4 rounded font-mono text-lg tracking-wider break-all">
              {fingerprintText}
            </div>
            
            <div className="flex gap-2">
              <CopyButton 
                text={fingerprintText} 
                label="Copiar Fingerprint"
              />
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <p className="text-sm">
                <strong className="text-yellow-800 dark:text-yellow-200">Importante:</strong>{" "}
                Por favor, verifique este fingerprint cuidadosamente em meu perfil no{" "}
                <a 
                  href="https://github.com/settings/keys" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>{" "}
                ou em outras fontes confiáveis para confirmar a autenticidade da chave.
              </p>
            </div>
          </section>

          {/* Download Section */}
          <section className="bg-card p-6 rounded-lg border space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Download className="h-6 w-6" />
              Baixar Chave Pública
            </h2>
            
            <p className="text-muted-foreground">
              Você pode baixar minha chave pública diretamente:
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
              <p className="text-sm">
                <strong className="text-amber-800 dark:text-amber-200">📝 Nota:</strong>{" "}
                Temporariamente, a chave está disponível como arquivo <code>.txt</code>. 
                O conteúdo é idêntico ao formato <code>.asc</code> padrão do GPG.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">Download direto:</span>
                <Button asChild variant="outline">
                  <a 
                    href="/pgp-key.txt" 
                    download="kvasir-pgp-key.txt"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download (.txt)
                  </a>
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Comando para importar (no terminal):</p>
                <div className="bg-muted p-3 rounded font-mono text-sm overflow-x-auto">
                  <code>{wgetCommand}</code>
                </div>
                <CopyButton 
                  text={wgetCommand} 
                  label="Copiar Comando"
                />
              </div>
            </div>
          </section>

          {/* Additional Information */}
          <section className="bg-card p-6 rounded-lg border space-y-4">
            <h2 className="text-2xl font-semibold">Informações Adicionais</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Nome:</span>
                  <span className="ml-2 text-muted-foreground">Carlos Kvasir</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Email para contato seguro:</span>
                  <span className="ml-2 text-muted-foreground">gpg@kvasir.dev</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Criada em:</span>
                  <span className="ml-2 text-muted-foreground">2025-06-21</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <span className="font-medium">Expira em:</span>
                  <span className="ml-2 text-muted-foreground">2026-07-09 (renovada anualmente)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="bg-card p-6 rounded-lg border space-y-4">
            <h2 className="text-2xl font-semibold">Como Usar</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Para verificar commits assinados:</h3>
                <div className="bg-muted p-3 rounded font-mono text-sm">
                  <code>git log --show-signature</code>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Para enviar mensagens criptografadas:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Baixe e importe minha chave pública usando o comando acima</li>
                  <li>Verifique o fingerprint para garantir autenticidade</li>
                  <li>Use <code className="bg-muted px-1 rounded">gpg --encrypt --recipient gpg@kvasir.dev arquivo.txt</code></li>
                </ol>
              </div>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
