// ===== traQServicesExtender 統合版 =====
(function(){
  const servicesSelector = '._list_s03su_26';

  const customServices = [
    {
      label: 'traQing',
      url: 'https://traqing.cp20.dev/',
      svg: `\n      <svg id="_レイヤー_1" data-name="レイヤー_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243 291.27" fill="currentColor">\n        <path class="cls-1" d="M200.77,29.06c-.23-.08-2.5-1.74-5-3.79-2.5-2.05-6.06-4.55-7.73-5.46-1.74-.99-3.11-1.9-2.96-2.05.68-.68-17.36-8.87-25.62-11.52C122.39-5.96,84.18-.2,50.6,22.77c-6.82,4.7-25.32,22.89-28.27,27.82-.61,1.06-2.43,3.94-4.02,6.6C-.03,85.99-5.11,125.79,5.43,158c4.7,14.1,12.58,28.81,21.83,40.33,2.05,2.5,20.62,21.53,41.24,42.15l37.52,37.52,33.66,6.67,33.73,6.6-.76-4.7c-.46-2.58-3.34-18.04-6.52-34.26l-5.69-29.49-36.39-36.39c-20.01-20.01-36.61-36.16-36.92-35.85-.38.38-.68,2.65-.83,5.08-.15,2.43-.61,6.52-.91,8.95-.3,2.58-1.29,10.84-2.12,18.49-.99,7.66-1.82,14.1-2.05,14.33-.45.46-7.13-3.49-11.29-6.59-21.98-16.22-34.42-40.93-34.57-68.53-.15-18.65,4.09-33.2,14.1-48.51,4.02-6.14,18.04-21.38,20.16-21.83.46-.15,2.43-1.36,4.25-2.73,10.61-7.73,27.74-13.19,43.59-13.87,16.75-.68,30.78,2.58,46.24,10.92,11.14,5.99,25.47,19.56,31.69,30.17,9.25,15.62,13.72,36.76,11.75,55.11-1.36,13.19-7.12,29.11-13.49,37.75-1.36,1.82-2.73,3.79-3.11,4.62-.99,2.05-12.43,13.34-16.45,16.3-3.64,2.58-13.26,8.57-15.84,9.63-1.14.53,0,1.97,4.93,7.05,5.53,5.53,6.44,7.05,7.58,11.83.61,3.03,1.14,5.84,1.06,6.37-.23,1.29,1.44,6.29,2.05,6.29s13.87-7.81,18.5-10.76c6.22-4.1,23.04-21.07,28.12-28.28,33.73-48.44,29.18-112.26-10.99-154.56-4.55-4.85-8.49-8.79-8.72-8.72Z"/>\n        <path class="cls-1" d="M113.41,73.26h-5.43c-3.6,0-6.51,2.92-6.51,6.51v38c0,3.6,2.92,6.51,6.51,6.51h5.43c3.6,0,6.51-2.92,6.51-6.51v-38c0-3.6-2.92-6.51-6.51-6.51Z"/>\n        <path class="cls-1" d="M167.69,73.26h-5.43c-3.6,0-6.51,2.92-6.51,6.51v38c0,3.6,2.92,6.51,6.51,6.51h5.43c3.6,0,6.51-2.92,6.51-6.51v-38c0-3.6-2.92-6.51-6.51-6.51Z"/>\n      </svg>\n    `
    },
    {
      label: 'traQ gazer',
      url: 'https://traq-gazer.trap.show/',
      svg: `\n      <svg id="_レイヤー_1" data-name="レイヤー_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 422.996 391.252" fill="currentColor">\n          <path fill-rule="evenodd" class="cls-1" d="M126,0C88.3,0,56.1,17.8,50.1,42h0L3.9,194.2c-2.5,8.4-3.8,17.1-3.9,25.8,0,52.5,44.8,95,100,95s28.1-2.9,40.5-8.1h0c-.9,15.5-7.7,36-35.1,37.2-26.8-.4-30.8-16.6-30.8-16.6H9s12.2,63,94.7,63.7c44,.4,96.1-26.2,96.1-83.8v-80.7c.2-2.2.3-4.5.3-6.8l.7-66c.3,0,7.5-2,11.1-2,3.6,0,10.1,1.9,10.4,2l.7,66c0,52.5,44.8,95,100,95s29.2-3.1,41.9-8.7v17.5h58v-100.8h0c0-1,0-2,0-3,0-8.7-1.3-17.4-3.9-25.8l-46.1-152.2h0C366.9,17.8,334.7,0,297,0c-37.8,0-69.9,17.8-76,42h0v.2l.2,20.8c-.3,0-6.5-1.5-9.7-1.5s-9.5,1.4-9.7,1.5l.2-20.8v-.2h0C195.9,17.8,163.8,0,126,0ZM98,268.8c23.5,0,42.5-19,42.5-42.5s-19-42.5-42.5-42.5-42.5,19-42.5,42.5,19,42.5,42.5,42.5ZM366,226.2c0,23.5-19,42.5-42.5,42.5s-42.5-19-42.5-42.5,19-42.5,42.5-42.5,42.5,19,42.5,42.5Z"/>\n      </svg>\n    `
    },
    {
      label: 'Q Bell',
      url: 'https://bell.trap.show/',
      svg: `\n      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">\n        <path fill="currentColor" fill-rule="evenodd" d="M18.5 10.5V16l2 2v1h-17v-1l2-2v-5.5c0-3.07 2.13-5.64 5-6.32V3.5a1.5 1.5 0 1 1 3 0v.68c2.86.68 5 3.25 5 6.32" clip-rule="evenodd"/>\n        <path fill="currentColor" d="M13.414 21.414A2 2 0 0 1 10 20h4a2 2 0 0 1-.586 1.414"/>\n      </svg>\n    `
    }
  ];

  function createServiceLink({ label, url, svg }) {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = '_container_13f10_1';
    const spanIcon = document.createElement('span');
    spanIcon.className = '_icon_13f10_17';
    spanIcon.innerHTML = svg || '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>';
    const spanLabel = document.createElement('span');
    spanLabel.className = '_label_13f10_23';
    spanLabel.textContent = label;
    a.appendChild(spanIcon); a.appendChild(spanLabel);
    return a;
  }

  const observer = new MutationObserver(() => {
    const list = document.querySelector(servicesSelector);
    if (!list) return;
    if (list.querySelector('[data-added-by-unified-services]')) return;
    customServices.forEach(service => {
      const link = createServiceLink(service);
      link.dataset.addedByUnifiedServices = 'true';
      list.appendChild(link);
    });
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
