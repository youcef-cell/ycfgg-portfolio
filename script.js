const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
const carousel = document.querySelector('.project-carousel');
const track = carousel.querySelector('.carousel-track');
const slides = [...carousel.querySelectorAll('.project-slide')];
const previousButton = carousel.querySelector('.carousel-prev');
const nextButton = carousel.querySelector('.carousel-next');
const dotsContainer = carousel.querySelector('.carousel-dots');
const status = carousel.querySelector('.carousel-status');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
let currentSlide = 0;
let touchStartX = 0;

function createDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show project ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  carousel.querySelectorAll('.carousel-dot').forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
  carousel.setAttribute('aria-label', `Selected projects, project ${currentSlide + 1} of ${slides.length}`);
  status.textContent = `Project ${currentSlide + 1} of ${slides.length}`;
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

createDots();
showSlide(0);

previousButton.addEventListener('click', () => moveSlide(-1));
nextButton.addEventListener('click', () => moveSlide(1));
carousel.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveSlide(-1);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveSlide(1);
  }
});
carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
carousel.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 50) moveSlide(distance < 0 ? 1 : -1);
}, { passive: true });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.classList.toggle('is-open', !isOpen);
  navigation.classList.toggle('is-open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.classList.remove('is-open');
    navigation.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

document.querySelectorAll('.project-image[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector('img').alt;
    lightbox.showModal();
  });
});

function closeLightbox() {
  lightbox.close();
  lightboxImage.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.querySelector('#year').textContent = new Date().getFullYear();
