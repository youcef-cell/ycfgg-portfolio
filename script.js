const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

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

document.querySelectorAll('.project-image').forEach((button) => {
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
