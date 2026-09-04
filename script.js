function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark');
  body.classList.toggle('light');
  // Salvar preferência no localStorage
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
}

// Carregar tema salvo ao iniciar
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(savedTheme);
  startTypingEffect();
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Detectar tema do sistema se não houver preferência salva
if (!localStorage.getItem('theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
}

const typingPhrases = [
  'Desenvolvedor Back-end',
  'Soluções em nuvem',
  'Desenvolvedor Java'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 120;
let pauseDelay = 1800;

function startTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  typePhrase(typingElement);
}

function typePhrase(element) {
  const current = typingIndex % typingPhrases.length;
  const fullText = typingPhrases[current];

  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  element.textContent = fullText.substring(0, charIndex);

  let delay = isDeleting ? typingDelay / 2 : typingDelay;

  if (!isDeleting && charIndex === fullText.length) {
    delay = pauseDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex += 1;
    delay = typingDelay;
  }

  setTimeout(() => typePhrase(element), delay);
}

// Funcionalidade do Menu Hamburger
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
  });
});

// Fechar menu ao redimensionar para área de desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
  }
});

// Funcionalidade para abrir certificados em uma nova guia
function openCertificate(certificatePath, certificateTitle) {
  window.open(certificatePath, certificateTitle, 'width=800,height=600');
}
