export default function ContactForm() {
  return (
    <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-6">
      <form
        action="https://send.pageclip.co/BfWkS3CCsPVGucyRUATR29Xv3njDckZv/contact_page"
        className="pageclip-form space-y-4"
        method="post"
      >
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="seu@email.com"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
        
        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
            Assunto
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            required
            placeholder="Assunto da mensagem"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
        
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
            Mensagem
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            placeholder="Escreva sua mensagem aqui..."
            rows={5}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
          />
        </div>
        
        <button
          type="submit"
          className="pageclip-form__submit w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium"
        >
          <span>Enviar Mensagem</span>
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Ou entre em contato diretamente: 
          <a href="mailto:carlos@kvasir.dev" className="text-primary hover:underline ml-1">
            carlos@kvasir.dev
          </a>
        </p>
      </div>
    </div>
  )
}
