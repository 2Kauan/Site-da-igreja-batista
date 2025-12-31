document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. MENU MOBILE (Funcionamento do Hambúrguer)
       ============================================================ */
    const botaoMenu = document.querySelector('.menu-mobile-btn');
    const navegacao = document.querySelector('.navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    if (botaoMenu && navegacao) {
        // Abrir/Fechar ao clicar no botão
        botaoMenu.addEventListener('click', () => {
            navegacao.classList.toggle('aberto');

            // Animação simples no ícone do botão (opcional)
            botaoMenu.classList.toggle('ativo');
        });

        // Fechar menu automaticamente ao clicar em um link
        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                navegacao.classList.remove('aberto');
                botaoMenu.classList.remove('ativo');
            });
        });
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
       2. EFEITO DE SCROLL NO CABEÇALHO (Glassmorphism)
       ============================================================ */
    const cabecalho = document.querySelector('.cabecalho');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalho.classList.add('rolagem');
        } else {
            cabecalho.classList.remove('rolagem');
        }
    });

    /* ============================================================
       3. ANIMAÇÃO DE ENTRADA (Intersection Observer)
       Faz os elementos aparecerem suavemente ao rolar a página
       ============================================================ */
    const observadorOpcoes = {
        threshold: 0.15, // Aciona quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Margem de segurança
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;

            entrada.target.classList.add('ativo');
            observador.unobserve(entrada.target); // Para de observar após animar
        });
    }, observadorOpcoes);

    const elementosRevelar = document.querySelectorAll('.revelar');

    elementosRevelar.forEach(el => {
        observador.observe(el);
    });



    // Função Genérica de Cópia
    function configurarCopiaPix(idBotao, idInput, idFeedback) {
        const btn = document.getElementById(idBotao);
        const input = document.getElementById(idInput);
        const feedback = document.getElementById(idFeedback);

        // Só executa se os elementos existirem na página atual
        if (btn && input && feedback) {

            btn.addEventListener('click', () => {
                // Seleciona o texto (útil para UX mobile)
                input.select();
                input.setSelectionRange(0, 99999); // Para mobile

                // API Moderna de Área de Transferência
                navigator.clipboard.writeText(input.value)
                    .then(() => {
                        // Sucesso: Mostra feedback visual
                        feedback.classList.add('ativo');

                        // Muda texto do botão temporariamente
                        const textoOriginal = btn.innerText;
                        btn.innerText = "COPIADO!";
                        btn.style.backgroundColor = "var(--cor-destaque)";

                        // Reseta após 3 segundos
                        setTimeout(() => {
                            feedback.classList.remove('ativo');
                            btn.innerText = textoOriginal;
                            btn.style.backgroundColor = "";
                        }, 3000);
                    })
                    .catch(err => {
                        console.error('Erro ao copiar: ', err);
                        alert('Não foi possível copiar automaticamente. Por favor, copie manualmente.');
                    });
            });
        }
    }

    // Inicializa para a página de Ação Social (IDs usados no HTML mais recente)
    configurarCopiaPix('btnCopiar', 'inputChavePix', 'feedbackCopia');

    // Inicializa para a Home (Caso use IDs diferentes na seção social da home)
    configurarCopiaPix('btnCopiarSocial', 'chavePixInput', 'msgFeedback');
});