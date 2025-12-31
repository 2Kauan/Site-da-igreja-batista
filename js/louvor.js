document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. MENU MOBILE (Lógica do Hambúrguer)
       ============================================================ */
    const botaoMenu = document.querySelector('.menu-mobile-btn');
    const navegacao = document.querySelector('.navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    // Verifica se os elementos existem antes de adicionar eventos
    if (botaoMenu && navegacao) {

        // 1. Ao clicar no botão hambúrguer
        botaoMenu.addEventListener('click', () => {
            // Adiciona/Remove a classe 'aberto' no menu (CSS: right: 0)
            navegacao.classList.toggle('aberto');
            // Adiciona/Remove a classe 'ativo' no botão (CSS: vira um X)
            botaoMenu.classList.toggle('ativo');
        });

        // 2. Ao clicar em qualquer link do menu, fecha o menu
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                navegacao.classList.remove('aberto');
                botaoMenu.classList.remove('ativo');
            });
        });
    } else {
        console.warn('Menu Mobile: Elementos .menu-mobile-btn ou .navegacao não encontrados.');
    }

    /* ============================================================
       FECHAR MENU AO CLICAR FORA (Click Outside)
       ============================================================ */
    
    // Adiciona um ouvinte de clique em todo o documento
    document.addEventListener('click', (evento) => {
        
        // Verifica se os elementos existem para evitar erros
        if (navegacao && botaoMenu) {
            
            const menuEstaAberto = navegacao.classList.contains('aberto');
            const alvoDoClique = evento.target;

            // Lógica: Só executamos se o menu estiver visível
            if (menuEstaAberto) {
                
                // Verifica se o clique NÃO foi dentro do menu
                const clicouForaDoMenu = !navegacao.contains(alvoDoClique);
                
                // Verifica se o clique NÃO foi no botão (para evitar conflito de abrir/fechar)
                const clicouForaDoBotao = !botaoMenu.contains(alvoDoClique);

                // Se clicou fora de ambos, fecha o menu
                if (clicouForaDoMenu && clicouForaDoBotao) {
                    navegacao.classList.remove('aberto');
                    botaoMenu.classList.remove('ativo');
                }
            }
        }
    });
    /* ============================================================
       2. EFEITO DE SCROLL NO CABEÇALHO
       ============================================================ */
    const cabecalho = document.querySelector('.cabecalho');

    if (cabecalho) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                cabecalho.classList.add('rolagem');
            } else {
                cabecalho.classList.remove('rolagem');
            }
        });
    }

    /* ============================================================
       3. ANIMAÇÃO DE ENTRADA (Intersection Observer)
       ============================================================ */
    const observadorOpcoes = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('ativo');
            observador.unobserve(entrada.target);
        });
    }, observadorOpcoes);

    const elementosRevelar = document.querySelectorAll('.revelar');
    elementosRevelar.forEach(el => observador.observe(el));

    /* ============================================================
       4. FUNCIONALIDADE DE COPIAR PIX
       ============================================================ */
    function configurarCopiaPix(idBotao, idInput, idFeedback) {
        const btn = document.getElementById(idBotao);
        const input = document.getElementById(idInput);
        const feedback = document.getElementById(idFeedback);

        if (btn && input && feedback) {
            btn.addEventListener('click', () => {
                // Seleciona texto para mobile e desktop
                input.select();
                input.setSelectionRange(0, 99999);

                navigator.clipboard.writeText(input.value)
                    .then(() => {
                        // Sucesso
                        feedback.classList.add('ativo');

                        // Feedback visual no botão
                        const textoOriginal = btn.innerText;
                        btn.innerText = "COPIADO!";
                        btn.style.backgroundColor = "var(--cor-destaque)"; // Usa a variável CSS

                        // Reseta após 3 segundos
                        setTimeout(() => {
                            feedback.classList.remove('ativo');
                            btn.innerText = textoOriginal;
                            btn.style.backgroundColor = "";
                        }, 3000);
                    })
                    .catch(err => {
                        console.error('Erro ao copiar PIX:', err);
                        alert('Erro ao copiar. Tente selecionar e copiar manualmente.');
                    });
            });
        }
    }

    // Inicializa nas páginas que possuem esses IDs
    configurarCopiaPix('btnCopiar', 'inputChavePix', 'feedbackCopia');
    configurarCopiaPix('btnCopiarSocial', 'chavePixInput', 'msgFeedback');
});



