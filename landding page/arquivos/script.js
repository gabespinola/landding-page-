// header background on scroll
const header = document.getElementById('siteHeader');

window.addEventListener('scroll', () => {
if (window.scrollY > 40) {
header.style.background = 'rgba(244,241,236,.97)';
header.style.boxShadow = '0 1px 0 rgba(33,61,91,.08)';
} else {
header.style.background = 'rgba(244,241,236,.85)';
header.style.boxShadow = 'none';
}
});

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== FORMULÁRIO FORMSPREE =====
const form = document.getElementById('contactForm');

if (form) {
form.addEventListener('submit', async function (e) {
e.preventDefault();

const btn = form.querySelector('.submit-btn');
const originalText = btn.innerHTML;

btn.innerHTML = 'Enviando...';
btn.disabled = true;

try {
  const response = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    btn.innerHTML = '✓ Mensagem enviada com sucesso!';
    form.reset();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 4000);

  } else {
    btn.innerHTML = 'Erro ao enviar';
    btn.disabled = false;
  }

} catch (error) {
  btn.innerHTML = 'Erro ao enviar';
  btn.disabled = false;
}


});
}

