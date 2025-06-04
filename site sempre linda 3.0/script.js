document.addEventListener('DOMContentLoaded', function() {
    // --- LÓGICA DOS CARROSSÉIS ---
    // Seleciona os carrosséis da página inicial E da página de serviços
    const carousels = document.querySelectorAll('.hero-carousel, .servicos-carousel');

    carousels.forEach(carouselSection => {
        const carouselInner = carouselSection.querySelector('.carousel-inner');
        const prevButton = carouselSection.querySelector('.carousel-control.prev');
        const nextButton = carouselSection.querySelector('.carousel-control.next');

        // **NOVA LÓGICA: Verifica se os elementos do carrossel existem antes de inicializar**
        if (carouselInner && prevButton && nextButton) {
            const carouselItems = carouselInner.querySelectorAll('.carousel-item');
            let currentIndex = 0;
            const totalItems = carouselItems.length;
            let autoSlideInterval; // Variável para controlar o intervalo

            function updateCarousel() {
                const offset = -currentIndex * 100;
                carouselInner.style.transform = `translateX(${offset}%)`;

                carouselItems.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }

            function showNext() {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                updateCarousel();
            }

            function startAutoSlide() {
                // Limpa o intervalo existente antes de iniciar um novo
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                }
                autoSlideInterval = setInterval(showNext, 5000); // Muda a cada 5 segundos
            }

            prevButton.addEventListener('click', () => {
                showPrev();
                startAutoSlide(); // Reinicia o auto-slide após clique manual
            });
            nextButton.addEventListener('click', () => {
                showNext();
                startAutoSlide(); // Reinicia o auto-slide após clique manual
            });

            // Inicia o auto-slide quando a página carrega
            updateCarousel(); // Garante que o primeiro item esteja ativo ao carregar
            startAutoSlide();
        }
    });


    // --- LÓGICA DO MENU RESPONSIVO ---
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (mobileMenuToggle && navMenu) { // Adicionei verificação também para o menu
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Fecha o menu móvel se estiver aberto e for um link interno (não dropdown)
                if (navMenu.classList.contains('active') && !link.closest('.dropdown')) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Adiciona evento para fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }


    // --- LÓGICA DOS BOTÕES DE AGENDAMENTO/WHATSAPP ---
    const agendarBtns = document.querySelectorAll('.agendar-btn, .agendar-btn-desktop, .footer-btn-whatsapp');
    const whatsappNumber = '5511944419866'; // SEU NÚMERO DE WHATSAPP COM DDI E DDD, SEM SÍMBOLOS
    const whatsappMessage = 'Olá! Gostaria de agendar um horário no salão de beleza. Poderíamos conversar sobre os serviços?';

    agendarBtns.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(url, '_blank');
        });
    });

});