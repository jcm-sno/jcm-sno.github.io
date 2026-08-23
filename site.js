(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem('wedding-theme');
  root.dataset.theme = stored || 'coastal-bright';

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
