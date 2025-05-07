// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
  const menu = document.querySelector(".menu");
  const menuItems = document.querySelectorAll(".menu a");

  // Toggle menu when clicking the icon
  mobileMenuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
    
    // Change icon based on menu state
    if (menu.classList.contains("active")) {
      mobileMenuIcon.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close menu when clicking on menu items
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menu.classList.remove("active");
      mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && menu.classList.contains("active")) {
      menu.classList.remove("active");
      mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Timeline animation on scroll
  const timelineItems = document.querySelectorAll(".timeline-item");

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateOnScroll() {
    timelineItems.forEach((item) => {
      if (isInViewport(item)) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state for timeline items
  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Run on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Form validation
  const trabalheForm = document.getElementById("trabalhe-form");

  if (trabalheForm) {
    trabalheForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic validation
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const email = document.getElementById("email").value;
      const estado = document.getElementById("estado").value;
      const curriculo = document.getElementById("curriculo").value;

      if (!nome || !telefone || !email || !estado || !curriculo) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
      }

      // Phone validation
      const telefoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/;
      if (!telefoneRegex.test(telefone) && !telefone.match(/^\d{10,11}$/)) {
        alert("Por favor, insira um telefone válido com DDD.");
        return;
      }

      // If all validations pass
      alert("Formulário enviado com sucesso! Entraremos em contato em breve.");
      trabalheForm.reset();
    });

    // Format phone number as user types
    const telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
      telefoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 2 && value.length <= 6) {
          value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 6) {
          if (value.length === 11) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
          } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
          }
        }

        e.target.value = value;
      });
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if it's not an anchor link
      if (targetId === "#" || !targetId.startsWith("#")) return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (menu.classList.contains("active")) {
          menu.classList.remove("active");
          mobileMenuIcon.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Vagas filtro (trabalhe-conosco.html)
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const vagaCards = document.querySelectorAll(".vaga-card");

  if (filtroBtns.length > 0 && vagaCards.length > 0) {
    filtroBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filtroBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filtro = this.getAttribute("data-filtro");

        // Show/hide vaga cards based on filter
        vagaCards.forEach((card) => {
          if (filtro === "todas" || card.getAttribute("data-categoria") === filtro) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // FAQ accordion (trabalhe-conosco.html)
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", () => {
        // Toggle active class on clicked item
        item.classList.toggle("active");

        // Close other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
      });
    });
  }

  // Depoimentos slider (trabalhe-conosco.html)
  const depoimentoCards = document.querySelectorAll(".depoimento-card");
  const prevBtn = document.querySelector(".depoimento-prev");
  const nextBtn = document.querySelector(".depoimento-next");

  if (depoimentoCards.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;

    // Hide all cards except the first one
    depoimentoCards.forEach((card, index) => {
      if (index !== 0) {
        card.style.display = "none";
      }
    });

    // Previous button click
    prevBtn.addEventListener("click", () => {
      depoimentoCards[currentIndex].style.display = "none";
      currentIndex = (currentIndex - 1 + depoimentoCards.length) % depoimentoCards.length;
      depoimentoCards[currentIndex].style.display = "block";
    });

    // Next button click
    nextBtn.addEventListener("click", () => {
      depoimentoCards[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % depoimentoCards.length;
      depoimentoCards[currentIndex].style.display = "block";
    });
  }

  // Animações de scroll
  function checkScroll() {
    const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .zoom-in");
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  // Executar na carga inicial
  checkScroll();

  // Adicionar evento de scroll
  window.addEventListener("scroll", checkScroll);

  // Animação suave para a timeline
  const timelineItems2 = document.querySelectorAll(".timeline-item");
  timelineItems2.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
  });

  // Animação suave para os cards de valores
  const valorCards = document.querySelectorAll(".valor-card");
  valorCards.forEach((card, index) => {
    card.style.transitionDelay = `${(index % 4) * 0.1}s`;
  });

  // Animação suave para os cards de empresas
  const empresaCards = document.querySelectorAll(".empresa-card");
  empresaCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`;
  });

  // Efeito de hover aprimorado para os cards
  const allCards = document.querySelectorAll(".valor-card, .empresa-card, .timeline-content");
  allCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Efeito de parallax suave para o hero
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      if (window.innerWidth > 768) { // Aplicar apenas em telas maiores
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }
  
  // Ajuste de altura para elementos com conteúdo dinâmico
  function equalizeHeights(elements) {
    // Reset heights
    elements.forEach(el => {
      el.style.height = 'auto';
    });
    
    // Skip on mobile
    if (window.innerWidth < 768) return;
    
    // Find max height
    let maxHeight = 0;
    elements.forEach(el => {
      const height = el.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    
    // Apply max height to all
    elements.forEach(el => {
      el.style.height = `${maxHeight}px`;
    });
  }
  
  // Aplicar equalização de altura para cards
  const valorCardsGroups = [];
  for (let i = 0; i < valorCards.length; i += 4) {
    valorCardsGroups.push(Array.from(valorCards).slice(i, i + 4));
  }
  
  valorCardsGroups.forEach(group => {
    equalizeHeights(group);
  });
  
  // Reajustar alturas em resize
  window.addEventListener('resize', () => {
    valorCardsGroups.forEach(group => {
      equalizeHeights(group);
    });
    equalizeHeights(document.querySelectorAll('.empresa-card'));
  });
  
  // Inicializar equalização para cards de empresas
  equalizeHeights(document.querySelectorAll('.empresa-card'));
});

