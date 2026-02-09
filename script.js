document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
       // Form submission - Envio direto para WhatsApp
document.getElementById('agendamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    const servico = document.getElementById('servico').value;
    const observacoes = document.getElementById('observacoes').value;
    
    // Formatar a data para formato brasileiro
    const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    
    // Formatar a mensagem
    let mensagem = `*NOVO AGENDAMENTO*\n\n`;
    mensagem += `👤 *Nome:* ${nome}\n`;
    mensagem += `📱 *Telefone:* ${telefone}\n`;
    if (email) mensagem += `📧 *Email:* ${email}\n`;
    mensagem += `📅 *Data:* ${dataFormatada}\n`;
    mensagem += `🕐 *Horário:* ${horario === 'manha' ? 'Manhã (8h-12h)' : 'Tarde (13h-18h)'}\n`;
    mensagem += `💼 *Serviço:* ${servico}\n`;
    if (observacoes) mensagem += `📝 *Observações:* ${observacoes}\n`;
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Seu número do WhatsApp (substitua aqui)
    const numeroWhatsApp = '5532988723699'; // FORMATO: 55 + DDD + NÚMERO
    
    // Criar o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir o WhatsApp
    window.open(linkWhatsApp, '_blank');
    
    // Opcional: Limpar o formulário após envio
    this.reset();

    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
    this.reset();
});

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .blog-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Set minimum date for scheduling
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('data').setAttribute('min', today);