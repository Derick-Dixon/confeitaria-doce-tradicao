// FASE 2 — JavaScript: tema claro/escuro, abas + busca, carrossel, formulário
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const root = document.documentElement;

// 1. Modo claro/escuro (lembra a escolha no navegador)
function setTheme(t){
  root.dataset.theme = t;                       // o CSS troca as cores por [data-theme=dark]
  localStorage.setItem('tema', t);
  const b = $('#tema'); if (b) b.textContent = t === 'dark' ? '☀️ Claro' : '🌙 Escuro';
}
setTheme(localStorage.getItem('tema') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
$('#tema')?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

// 2. Abas de categoria + busca (escondem/mostram os cartões)
let aba = 'todos';
function filtrar(){
  const q = $('#busca').value.toLowerCase();
  $$('#produtos .card').forEach(c => {
    const ok = (aba === 'todos' || c.dataset.cat === aba) && c.textContent.toLowerCase().includes(q);
    c.classList.toggle('hidden', !ok);
  });
}
$$('.tabs button').forEach(b => b.addEventListener('click', () => {
  aba = b.dataset.cat;
  $$('.tabs button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  filtrar();
}));
$('#busca')?.addEventListener('input', filtrar);

// 3. Carrossel (anterior/próximo)
const slides = $$('.slide'); let i = 0;
function ir(n){
  if (!slides.length) return;
  i = (n + slides.length) % slides.length;     // volta ao início/fim
  slides.forEach((s, k) => s.classList.toggle('active', k === i));
}
$('.prev')?.addEventListener('click', () => ir(i - 1));
$('.next')?.addEventListener('click', () => ir(i + 1));

// 4. Formulário de contato (simulado, sem servidor)
$('#contato-form')?.addEventListener('submit', e => {
  e.preventDefault();
  $('#msg').textContent = 'Obrigado! Responderemos em até 24 horas.';
  e.target.reset();
});
