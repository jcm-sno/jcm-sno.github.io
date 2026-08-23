(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem('wedding-theme');
  root.dataset.theme = stored || 'coastal-bright';

  const loadEncodedFallback = (img) => {
    if (img.dataset.fallbackLoading === 'true') return;
    img.dataset.fallbackLoading = 'true';
    fetch(`${img.getAttribute('src')}.b64`)
      .then((response) => {
        if (!response.ok) throw new Error('No encoded fallback');
        return response.text();
      })
      .then((encoded) => {
        img.src = `data:image/webp;base64,${encoded.trim()}`;
      })
      .catch(() => {
        img.dataset.fallbackLoading = 'failed';
      });
  };

  document.querySelectorAll('img[src$=".webp"]').forEach((img) => {
    img.addEventListener('error', () => loadEncodedFallback(img), { once: true });
    if (img.complete && img.naturalWidth === 0) loadEncodedFallback(img);
  });

  const nav = document.querySelector('.nav');
  const menuButton = document.querySelector('[data-menu-button]');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = String(!open);
      menuButton.setAttribute('aria-expanded', String(!open));
    });
  }

  const themeMenu = document.querySelector('.theme-menu');
  const themeButton = document.querySelector('[data-theme-button]');
  if (themeButton && themeMenu) {
    themeButton.addEventListener('click', () => {
      const open = themeMenu.dataset.open === 'true';
      themeMenu.dataset.open = String(!open);
      themeButton.setAttribute('aria-expanded', String(!open));
    });
    themeMenu.querySelectorAll('[data-theme]').forEach((button) => {
      button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        root.dataset.theme = theme;
        localStorage.setItem('wedding-theme', theme);
        themeMenu.dataset.open = 'false';
      });
    });
  }
})();
