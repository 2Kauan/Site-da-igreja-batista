document.addEventListener('DOMContentLoaded', () => {

    // 1. MENU MOBILE
    const botaoMenu = document.querySelector('.menu-mobile-btn');
    const navegacao = document.querySelector('.navegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    if (botaoMenu && navegacao) {
        botaoMenu.addEventListener('click', () => {
            navegacao.classList.toggle('aberto');
            botaoMenu.classList.toggle('ativo');
        });

        linksMenu.forEach(link => {
            link.addEventListener('click', () => {
                navegacao.classList.remove('aberto');
                botaoMenu.classList.remove('ativo');
            });
        });
    }
    // Adiciona um ouvinte de clique em todo o documento
    document.addEventListener('click', (evento) => {
        
        if (navegacao && botaoMenu) {
            
            const menuEstaAberto = navegacao.classList.contains('aberto');
            const alvoDoClique = evento.target;

            if (menuEstaAberto) {
        
                const clicouForaDoMenu = !navegacao.contains(alvoDoClique);
            
                const clicouForaDoBotao = !botaoMenu.contains(alvoDoClique);
                if (clicouForaDoMenu && clicouForaDoBotao) {
                    navegacao.classList.remove('aberto');
                    botaoMenu.classList.remove('ativo');
                }
            }
        }
    });

    // 2. EFEITO DE SCROLL NO CABEÇALHO
    const cabecalho = document.querySelector('.cabecalho');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            cabecalho.classList.add('rolagem');
        } else {
            cabecalho.classList.remove('rolagem');
        }
    });

    // 3. ANIMAÇÃO DE ENTRADA (Intersection Observer)
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

    elementosRevelar.forEach(el => {
        observador.observe(el);
    });})