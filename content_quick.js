// traQuick — sidebar update (2026-11-12)
(() => {
  'use strict';

  const HOST = '[data-traquick-section]';
  const ROW = '[data-custom-traq-quick]';

  let links = [];
  let queued = false;
  let lastLocation = '';
  let stopped = false;

  const storage = globalThis.chrome?.storage;
  if (!storage?.local) return;

  const part = (name) => `[class*="_${name}_"]`;
  const classes = (el) => el?.getAttribute('class') || '';
  const original = (el) => !el.closest(HOST);

  function findTree(heading) {
    for (
      let node = heading;
      node && node !== document.body;
      node = node.parentElement
    ) {
      const next = node.nextElementSibling;
      if (next?.matches(part('treeWrapper'))) return next;
    }
    return null;
  }

  function getTemplate(tree) {
    const anchors = [
      ...tree.querySelectorAll('a[href^="/channels/"]')
    ];

    const sample =
      anchors.find(original) ||
      [...document.querySelectorAll('a[href^="/channels/"]')].find(
        a => original(a) && a.closest(part('channelContainer'))
      );

    const container = sample?.closest(part('channelContainer'));
    const outer = container?.parentElement;

    if (!sample || !container || !outer) return null;

    const icon = container.querySelector('[data-container-type]');
    const selectedBg = [
      ...document.querySelectorAll(part('selectedBg'))
    ].find(original);

    return {
      outer: classes(outer),
      container: classes(container),
      anchor: classes(sample),
      iconOuter: classes(icon?.parentElement),
      icon: classes(icon),
      svg: classes(icon?.querySelector('svg')),
      nameContainer: classes(sample.firstElementChild),
      name: classes(sample.querySelector('span')),

      bg: classes(selectedBg) || '_selectedBg_flqat_47'
    };
  }

  function element(tag, className, parent) {
    const el = document.createElement(tag);
    el.className = className;

    if (parent) parent.appendChild(el);

    return el;
  }

  function createRow(link, map) {
    const row = element('div', map.outer);
    row.dataset.customTraqQuick = '1';
    row.style.setProperty('--channel-indent', '0px');

    const container = element('div', map.container, row);
    const iconOuter = element('div', map.iconOuter, container);
    const icon = element('div', map.icon, iconOuter);
    icon.dataset.containerType = 'leaf';

    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('class', map.svg);
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute(
      'd',
      'M5 15.717v-1.728h2.38l.793-4.38H6.017V7.881h2.481l.57-3.214h2.034l-.57 3.214h2.44l.57-3.214h2.034l-.57 3.214H17V9.61h-2.319l-.793 4.38h2.095v1.728h-2.4l-.65 3.616h-2.035l.651-3.616H9.11l-.651 3.616H6.424l.65-3.616zm7.648-6.108h-2.441l-.793 4.38h2.44z'
    );

    svg.appendChild(path);
    icon.appendChild(svg);

    const anchor = element('a', map.anchor, container);
    anchor.href = link.href;
    anchor.draggable = false;
    anchor.setAttribute('aria-label', `#${link.label}`);

    const url = new URL(anchor.href);

    if (!isInternal(url)) {
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
    }

    const nameContainer = element(
      'div',
      map.nameContainer,
      anchor
    );

    const name = element('span', map.name, nameContainer);
    name.textContent = link.label;
    name.title = `#${link.label}`;

    const bg = element(
      'div',
      `${map.bg} traquick-background`.trim(),
      row
    );
    bg.setAttribute('aria-hidden', 'true');

    const stateNodes = [
      row,
      container,
      iconOuter,
      icon,
      anchor,
      nameContainer,
      bg
    ];

    row.addEventListener('mouseenter', () => {
      stateNodes.forEach(el => {
        el.setAttribute('data-is-hovered', '');
      });
    });

    row.addEventListener('mouseleave', () => {
      stateNodes.forEach(el => {
        el.removeAttribute('data-is-hovered');
      });
    });

    row.addEventListener('focusin', () => {
      bg.setAttribute('data-is-focused', '');
    });

    row.addEventListener('focusout', event => {
      if (!row.contains(event.relatedTarget)) {
        bg.removeAttribute('data-is-focused');
      }
    });

    return row;
  }

  function isInternal(url) {
    return (
      url.origin === location.origin &&
      /^\/(channels|users)\//.test(url.pathname)
    );
  }

  function normalizedLinks(value) {
    if (!Array.isArray(value)) return [];

    return value
      .filter(link => {
        if (
          !link ||
          typeof link.label !== 'string' ||
          typeof link.href !== 'string'
        ) {
          return false;
        }

        if (!['home', 'channel'].includes(link.section)) {
          return false;
        }

        try {
          return ['https:', 'http:'].includes(
            new URL(link.href, location.href).protocol
          );
        } catch {
          return false;
        }
      })
      .map(({ label, href, section }) => ({
        label,
        href,
        section
      }));
  }

  function updateSelection() {
    lastLocation = location.href;

    document.querySelectorAll(ROW).forEach(row => {
      const anchor = row.querySelector('a');
      const url = new URL(anchor.href);

      const selected =
        isInternal(url) &&
        url.pathname + url.search ===
          location.pathname + location.search;

      [row, ...row.querySelectorAll('div, a')].forEach(el => {
        el.toggleAttribute('data-is-selected', selected);
      });

      if (selected) {
        anchor.setAttribute('aria-current', 'page');
      } else {
        anchor.removeAttribute('aria-current');
      }
    });
  }

  function render() {
    if (stopped) return;

    observer.disconnect();

    try {
      if (!document.getElementById('traquick-style')) {
        const style = document.createElement('style');
        style.id = 'traquick-style';

        style.textContent = `
          ${HOST} {
            position: relative;
            flex-shrink: 0;
            min-width: 0;
            padding-bottom: 16px;
          }

          [class*="_treeWrapper_"]:has(+ ${HOST}) {
            padding-bottom: 0;
          }
        `;

        (document.head || document.documentElement).appendChild(style);
      }

      const retained = new Set();

      document.querySelectorAll('h3').forEach(heading => {
        const section = {
          'ホームチャンネル': 'home',
          'チャンネル': 'channel'
        }[heading.textContent.trim()];

        if (!section) return;

        const tree = findTree(heading);
        if (!tree) return;

        const items = links.filter(
          link => link.section === section
        );

        let host = tree.nextElementSibling;

        if (
          !host?.matches(HOST) ||
          host.dataset.traquickSection !== section
        ) {
          host = null;
        }

        if (!items.length) {
          host?.remove();
          return;
        }

        const map = getTemplate(tree);

        if (!map) {
          if (host) retained.add(host);
          return;
        }

        if (!host) {
          host = document.createElement('div');
          host.dataset.traquickSection = section;

          tree.after(host);
        }

        retained.add(host);

        const signature = JSON.stringify([items, map]);

        if (host.dataset.traquickSignature !== signature) {
          host.replaceChildren(
            ...items.map(link => createRow(link, map))
          );
          host.dataset.traquickSignature = signature;
        }
      });

      document.querySelectorAll(HOST).forEach(host => {
        if (!retained.has(host)) host.remove();
      });

      updateSelection();
    } finally {
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  function schedule() {
    if (queued || stopped) return;

    queued = true;

    requestAnimationFrame(() => {
      queued = false;
      render();
    });
  }

  const observer = new MutationObserver(schedule);

  document.addEventListener(
    'click',
    event => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor =
        event.target instanceof Element
          ? event.target.closest(`${ROW} a`)
          : null;

      if (!anchor) return;

      const url = new URL(anchor.href);
      if (!isInternal(url)) return;

      event.preventDefault();
      event.stopPropagation();

      history.pushState(
        null,
        '',
        url.pathname + url.search + url.hash
      );

      window.dispatchEvent(new PopStateEvent('popstate'));
      updateSelection();
    },
    true
  );

  window.addEventListener('popstate', schedule);

  setInterval(() => {
    if (location.href !== lastLocation) schedule();
  }, 500);

  storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.traqCustomLinks) {
      links = normalizedLinks(
        changes.traqCustomLinks.newValue
      );
      schedule();
    }
  });

  storage.local.get(['traqCustomLinks'], result => {
    if (chrome.runtime?.lastError) {
      stopped = true;
      console.warn(
        '[traQuick] 設定を読み込めませんでした:',
        chrome.runtime.lastError.message
      );
      return;
    }

    links = normalizedLinks(result.traqCustomLinks);
    schedule();
  });
})();