/* ============================================================
   Aperture Photography — Application Javascript
   Features: Slide hero, Portfolio Filtering, Lightbox, Form Sim
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Hero Slideshow ──────────────────────────────────────
  let activeSlide = 0;
  const slides = document.querySelectorAll('.hero-slide');
  
  function nextSlide() {
    slides[activeSlide].classList.remove('active');
    activeSlide = (activeSlide + 1) % slides.length;
    slides[activeSlide].classList.add('active');
  }
  
  if (slides.length > 0) {
    setInterval(nextSlide, 6000);
  }

  // ── 2. Photos Database ─────────────────────────────────────
  const photos = [
    {
      id: 1,
      titulo: "Olhar Silencioso",
      categoria: "retrato",
      tamanho: "vertical",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      titulo: "Golden Gate Bridge",
      categoria: "arquitetura",
      tamanho: "horizontal",
      url: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      titulo: "Névoa Matinal",
      categoria: "paisagem",
      tamanho: "normal",
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      titulo: "Brinde de Casamento",
      categoria: "evento",
      tamanho: "normal",
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      titulo: "Minimalismo Urbano",
      categoria: "arquitetura",
      tamanho: "vertical",
      url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 6,
      titulo: "Montanhas Eternas",
      categoria: "paisagem",
      tamanho: "horizontal",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 7,
      titulo: "Expressão Natural",
      categoria: "retrato",
      tamanho: "normal",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 8,
      titulo: "Festa sob as Estrelas",
      categoria: "evento",
      tamanho: "horizontal",
      url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  // ── 3. Gallery Render & Filter ─────────────────────────────
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeLightboxIndex = 0;
  let currentFilteredPhotos = [...photos];

  function renderGallery(filter = 'todos') {
    if (!galleryGrid) return;
    
    currentFilteredPhotos = photos.filter(p => filter === 'todos' || p.categoria === filter);
    
    galleryGrid.innerHTML = currentFilteredPhotos.map((p, index) => `
      <div class="gallery-item ${p.tamanho} show" onclick="openLightbox(${index})">
        <img src="${p.url}" alt="${p.titulo}" loading="lazy">
        <div class="gallery-item-overlay">
          <div class="gallery-item-info">
            <h4>${p.titulo}</h4>
            <p>${p.categoria}</p>
          </div>
        </div>
      </div>`).join('');
  }

  // Filter Button Click Action
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderGallery(this.dataset.filter);
    });
  });

  // Init Gallery
  renderGallery();

  // ── 4. Lightbox logic ──────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  
  window.openLightbox = function(index) {
    activeLightboxIndex = index;
    const photo = currentFilteredPhotos[index];
    if (!photo) return;
    
    lightboxImg.src = photo.url;
    lightboxCaption.textContent = `${photo.titulo} — ${photo.categoria.toUpperCase()}`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  window.closeLightbox = function() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  window.prevLightbox = function(e) {
    if (e) e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex - 1 + currentFilteredPhotos.length) % currentFilteredPhotos.length;
    updateLightboxContent();
  };
  
  window.nextLightbox = function(e) {
    if (e) e.stopPropagation();
    activeLightboxIndex = (activeLightboxIndex + 1) % currentFilteredPhotos.length;
    updateLightboxContent();
  };
  
  function updateLightboxContent() {
    const photo = currentFilteredPhotos[activeLightboxIndex];
    if (!photo) return;
    lightboxImg.src = photo.url;
    lightboxCaption.textContent = `${photo.titulo} — ${photo.categoria.toUpperCase()}`;
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // ── 5. Booking Form Submission ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const successModal = document.getElementById('successModal');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Open success modal
      successModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Reset form
      contactForm.reset();
    });
  }
  
  window.closeSuccessModal = function() {
    successModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // ── 6. Sticky Navbar scroll effect ─────────────────────────
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Highlight active section on nav menu
    let scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sec.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 7. Mobile Navigation burger ────────────────────────────
  const burger = document.getElementById('navBurger');
  const navMobile = document.getElementById('navMobile');
  let mobileNavOpen = false;
  
  if (burger) {
    burger.addEventListener('click', () => {
      mobileNavOpen = !mobileNavOpen;
      burger.classList.toggle('open', mobileNavOpen);
      navMobile.classList.toggle('open', mobileNavOpen);
      document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    });
    
    // Close mobile nav when clicking a link
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavOpen = false;
        burger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
});
