const labelInput = document.getElementById('label');
const hrefInput = document.getElementById('href');
const sectionInput = document.getElementById('section');
const addButton = document.getElementById('add');
const homeListEl = document.getElementById('home-list');
const channelListEl = document.getElementById('channel-list');

function generateUUID(){ return crypto.randomUUID(); }

function loadLinks(){
  chrome.storage.local.get(['traqCustomLinks'], (result)=>{
    const links = result.traqCustomLinks || [];
    homeListEl.innerHTML=''; channelListEl.innerHTML='';
    links.forEach(link=>{ const li=document.createElement('li'); li.className='link-item'; li.dataset.id=link.id; li.dataset.href=link.href; 
      const handle=document.createElement('img'); handle.src='handle.svg'; handle.className='handle-icon'; handle.alt='drag';
      const labelSpan=document.createElement('span'); labelSpan.className='link-label'; labelSpan.textContent=link.label||'（無名）';
      const urlSpan=document.createElement('span'); urlSpan.className='link-url'; urlSpan.textContent=link.href;
      const del=document.createElement('img'); del.src='delete.svg'; del.alt='削除'; del.title='削除'; del.className='delete-button'; del.onclick=()=>{ const updated=links.filter(l=> l.id!==link.id); chrome.storage.local.set({traqCustomLinks:updated}, loadLinks); };
      li.appendChild(handle); li.appendChild(labelSpan); li.appendChild(urlSpan); li.appendChild(del);
      (link.section==='home'?homeListEl:channelListEl).appendChild(li); });
    setupSortables();
  });
}

function setupSortables(){
  const updateStorage = ()=>{
    const newLinks=[];
    [...homeListEl.querySelectorAll('li')].forEach(li=> newLinks.push({id:li.dataset.id,label:li.querySelector('.link-label').textContent,href:li.dataset.href,section:'home'}));
    [...channelListEl.querySelectorAll('li')].forEach(li=> newLinks.push({id:li.dataset.id,label:li.querySelector('.link-label').textContent,href:li.dataset.href,section:'channel'}));
    chrome.storage.local.set({traqCustomLinks:newLinks}, loadLinks);
  };
  Sortable.create(homeListEl,{group:'traq-links',animation:150,handle:'.handle-icon',onEnd:updateStorage});
  Sortable.create(channelListEl,{group:'traq-links',animation:150,handle:'.handle-icon',onEnd:updateStorage});
}

addButton.onclick=()=>{ const label=labelInput.value.trim(); const href=hrefInput.value.trim(); const section=sectionInput.value; if(!label||!href) return; chrome.storage.local.get(['traqCustomLinks'], result=>{ const links=result.traqCustomLinks||[]; links.push({id:generateUUID(),label,href,section}); chrome.storage.local.set({traqCustomLinks:links},()=>{ labelInput.value=''; hrefInput.value=''; loadLinks(); }); }); };

loadLinks();
