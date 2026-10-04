const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
  });

/* Tabs on desktop, accordion on mobile (Approach page) */
const mobile = window.matchMedia('(max-width: 820px)');
document.querySelectorAll('.tabs').forEach(group => {
  const tabs = [...group.querySelectorAll('.tab')];
  const select = (tab, open) => {
    tabs.forEach(t => {
      const on = t === tab && open;
      t.setAttribute('aria-selected', on);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      const isOpen = tab.getAttribute('aria-selected') === 'true';
      select(tab, mobile.matches ? !isOpen : true);
    });
    tab.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (d && !mobile.matches) { e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); select(n, true); }
    });
  });
});

/* Contact page: independent accordions + form submit */
document.querySelectorAll('.acc-btn').forEach(b => b.addEventListener('click', () => {
  const open = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', !open);
  document.getElementById(b.getAttribute('aria-controls')).hidden = open;
}));
document.querySelectorAll('.acc-body form').forEach(form => form.addEventListener('submit', async e => {
  e.preventDefault();
  const status = form.querySelector('.status');
  const btn = form.querySelector('.submit');
  btn.disabled = true; status.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    form.reset(); status.textContent = 'Thanks, your message was sent. We\u2019ll be in touch soon.';
  } catch {
    status.textContent = 'Something went wrong and your message wasn\u2019t sent. Please try again or email hello@placekeep.com.';
  }
  btn.disabled = false;
}));