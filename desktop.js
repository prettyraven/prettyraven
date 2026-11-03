'use strict';
(() => {
  const {icon, folder, dock: dockIcon} = UI;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mobile = () => window.innerWidth <= 700;
  const plural=(n,one,few,many)=>`${n} ${n%10===1&&n%100!==11?one:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?few:many}`;
  const storage = {get(k,fallback){try{return localStorage.getItem('pr-desktop-'+k)||fallback}catch{return fallback}},set(k,v){try{localStorage.setItem('pr-desktop-'+k,v)}catch{}}};
  const resumeURL = './assets/vitaliy-bogdanenko-resume-2026.pdf?v=contact-2';
  const contactEmail = 'prettyraven22@yandex.ru';
  const data = PORTFOLIO;
  const selected = data.selectedWorks.map(w => ({...w, src:'./assets/'+w.image+'.webp',thumb:'./assets/thumbs/'+w.id+'.webp',group:w.id.startsWith('f1')?'Формула-1':w.id.startsWith('print')?'Типографика':'Музыка',kind:'selected'}));
  const commerce = [...data.brandWorks,...data.kidWorks].map(w=>({...w,src:'./assets/'+w.image+'.webp',thumb:'./assets/'+w.image+'.webp',group:w.id.startsWith('np-')?'NAPRIKOLE':'KID LIMITED',kind:'commerce'}));
  const custom = Object.values(data.projectWorks).flat().map(w=>({...w,src:'./assets/'+w.image+'.webp',thumb:'./assets/'+w.image+'-thumb.webp',group:'Кастом',kind:'custom'}));
  const prints = PRINT_COLLECTION.works.map(w=>({...w,group:w.category,kind:'print',description:'Авторская графика для одежды. Разработка композиции, обработка изображения и подготовка принта к печати.'}));
  const galleryWorks = [...selected,...prints];
  const allWorks = [...selected,...commerce,...custom,...prints];
  const getWork = id => allWorks.find(w=>w.id===id);
  const cases = [
    {id:'music',name:'Music & Artist Visuals',subtitle:'Постеры, обложки и визуалы',symbol:'image',items:selected.filter(w=>w.group==='Музыка'),description:'Музыкальные и артистические визуалы. Работа с портретом, цветом, коллажем и типографикой под характер каждого изображения.',tags:['POSTER DESIGN','ARTIST VISUALS','IMAGE EDITING']},
    {id:'naprikole',name:'NAPRIKOLE × OZON',subtitle:'Принты и карточки товаров',symbol:'briefcase',items:commerce.filter(w=>w.group==='NAPRIKOLE'),description:'Все принты и карточки товаров в магазине NAPRIKOLE созданы Виталием. Графика на одежде и её подача в каталоге — две части одной работы.',tags:['PRINT DESIGN','E-COMMERCE'],url:'https://www.ozon.ru/category/futbolki-zhenskie-7508/naprikole-101231742/',linkText:'Магазин на Ozon'},
    {id:'clout',name:'Саппорты Clout',subtitle:'Кастомная футболка и флаг',symbol:'star',items:custom.filter(w=>w.id.startsWith('clout')),description:'Кастомная футболка и флаг для концертных саппортов артиста Clout. Зелёно-розовая композиция связывает одежду и флаг в одну визуальную историю.',tags:['CUSTOM','ФУТБОЛКА + ФЛАГ']},
    {id:'centrrykxd',name:'centrrykxd',subtitle:'Кастомная кофта для артиста',symbol:'star',items:custom.filter(w=>w.id.startsWith('centrr')),description:'Кастомная чёрная кофта, созданная специально для электронного артиста centrrykxd. Светлые формы распределены по спинке, капюшону и рукавам.',tags:['CUSTOM','ARTIST MERCH'],video:'./assets/centrrykxd-video.mp4'},
    {id:'kid',name:'KID LIMITED',subtitle:'Графическое направление бренда',symbol:'briefcase',items:commerce.filter(w=>w.group==='KID LIMITED'),description:'Более года работы над графическим направлением KID LIMITED — бренда детской одежды. Разработка принтов, обработка изображений, карточки товаров и подготовка материалов для печати и публикации.',tags:['PRINT DESIGN','PRODUCT VISUALS'],url:'https://www.wildberries.ru/brands/kid-limited',linkText:'Магазин на Wildberries'}
  ];
  const sections = {
    gallery:{name:'Галерея',description:'Постеры, обложки, принты и визуальные эксперименты.',items:galleryWorks},
    commerce:{name:'Коммерческая графика',description:'Принты и карточки товаров для NAPRIKOLE и KID LIMITED.',items:commerce},
    cases:{name:'Кейсы',description:'Задачи, визуальные решения и готовые вещи.',items:[]}
  };
  for(const c of cases) sections['case-'+c.id]={name:c.name,description:c.subtitle,items:c.items,case:c};
  const desktopItems = [
    {id:'gallery',title:'Галерея',sub:'Постеры и принты',symbol:'image',action:'nav'},
    {id:'about',title:'Обо мне',sub:'Виталий Богданенко',symbol:'user',action:'open'},
    {id:'cases',title:'Кейсы',sub:'Коммерческие проекты',symbol:'briefcase',action:'nav'},
    {id:'resume',title:'Резюме.pdf',sub:'Обзор и PDF',symbol:'file',action:'open',document:true},
    {id:'readme',title:'Прочти меня.txt',sub:'Как здесь всё устроено',symbol:'note',action:'open',document:true,note:true}
  ];
  $('#desktop-files').innerHTML = desktopItems.map(item=>`<button class="desktop-item" data-${item.action}="${item.id}" aria-label="${item.id==='gallery'?'Открыть галерею':'Открыть '+item.title}">${item.document?`<span class="desktop-document ${item.note?'note':''}"><i class="doc-lines"></i><i class="doc-lines"></i><i class="doc-lines"></i><b>${item.note?'READ ME':'PDF'}</b></span>`:folder(item.symbol,item.color)}<span class="file-label">${item.title}</span><span class="file-sublabel">${item.sub}</span></button>`).join('');
  const dockItems = [
    {id:'finder',label:'Finder · Галерея',art:'finder',nav:'gallery'},
    {id:'gallery',label:'Галерея',art:'gallery',nav:'gallery'},
    {id:'cases',label:'Кейсы',art:'cases',nav:'cases'},
    {id:'resume',label:'Резюме',art:'resume',open:'resume'},
    {id:'contact',label:'Контакты',art:'contact',open:'contact'},
    {id:'telegram',label:'Telegram',art:'telegram',url:'https://t.me/prettyraven'},
    {id:'settings',label:'Настройки',art:'settings',open:'settings'},
    {id:'trash',label:'Корзина',art:'trash',open:'trash',separator:true}
  ];
  $('#dock').innerHTML = dockItems.map(d=>`${d.separator?'<span class="dock-separator" aria-hidden="true"></span>':''}${d.url?`<a href="${d.url}" target="_blank" rel="noopener noreferrer"`:`<button data-${d.nav?'nav':'open'}="${d.nav||d.open}"`} class="dock-item" data-dock="${d.id}" data-tooltip="${d.label}" aria-label="${d.label}">${dockIcon(d.art)}${d.url?'</a>':'</button>'}`).join('');
  $('#spotlight-trigger').innerHTML=icon('search');
  $('#controls-trigger').innerHTML=icon('sliders');
  $('#spotlight-icon').innerHTML=icon('search');

  const wins = new Map();
  let topZ=20,activeKey=null,toastTimer,spotlightRestore=null;
  let finderState={section:'gallery',filter:'Все',query:'',view:storage.get('view','grid'),history:['gallery'],position:0};
  let previewState={items:selected,index:0,zoom:false};
  let spotlightItems=[],spotlightIndex=0;
  const specs={
    welcome:{title:'Добро пожаловать',w:700,h:395,symbol:'monitor'},
    finder:{title:'Галерея',w:960,h:650,symbol:'folder'},
    preview:{title:'Просмотр',w:830,h:690,symbol:'image'},
    resume:{title:'Виталий Богданенко — резюме',w:790,h:690,symbol:'file'},
    about:{title:'Обо мне',w:640,h:570,symbol:'user'},
    contact:{title:'Контакты',w:510,h:540,symbol:'mail'},
    settings:{title:'Рабочий стол и оформление',w:490,h:430,symbol:'sliders'},
    readme:{title:'Прочти меня.txt',w:500,h:490,symbol:'note'},
    trash:{title:'Корзина',w:420,h:310,symbol:'trash'}
  };
  const title = key => esc(specs[key].title);
  function updateDock(){
    $$('.dock-item').forEach(el=>{
      let key=el.dataset.dock;
      if(key==='gallery'&&finderState.section!=='gallery'){el.classList.remove('running','minimized');return;}
      if(key==='cases'&&finderState.section!=='cases'&&!finderState.section.startsWith('case-')){el.classList.remove('running','minimized');return;}
      if(['finder','gallery','cases'].includes(key)) key='finder';
      const win=wins.get(key);
      el.classList.toggle('running',!!win);
      el.classList.toggle('minimized',!!win?.minimized);
    });
  }
  function focusWindow(key,moveFocus=false){
    const win=wins.get(key);if(!win)return;
    activeKey=key;
    for(const w of wins.values())w.el.classList.remove('active');
    win.el.style.zIndex=++topZ;win.el.classList.add('active');
    win.el.removeAttribute('inert');
    if(moveFocus)win.el.focus({preventScroll:true});
  }
  function windowGeometry(key){
    const d=$('#desktop').getBoundingClientRect(),spec=specs[key];
    const w=Math.min(spec.w,d.width-145),h=Math.min(spec.h,d.height-125);
    const offset=(wins.size%4)*23;
    if(key==='welcome')return {w:Math.min(700,d.width-170),h:395,x:Math.max(28,d.width*.065),y:Math.max(45,(d.height-395)*.32)};
    return{w:Math.max(340,w),h:Math.max(260,h),x:Math.max(15,(d.width-w)/2-35+offset),y:Math.max(15,(d.height-h-80)/2+offset)};
  }
  function openWindow(key,options={}){
    if(!specs[key])return;
    let win=wins.get(key);
    if(win){win.minimized=false;win.el.classList.remove('is-minimized');focusWindow(key,true);if(options.render!==false)renderWindow(key);updateDock();return win;}
    const el=document.createElement('section');
    el.className='window '+key+'-window';el.dataset.window=key;el.tabIndex=-1;el.setAttribute('role','dialog');el.setAttribute('aria-label',specs[key].title);
    const pos=windowGeometry(key);el.style.cssText=`left:${pos.x}px;top:${pos.y}px;width:${pos.w}px;height:${pos.h}px`;
    el.innerHTML=`<header class="window-chrome"><div class="traffic"><button class="close" data-win-action="close" aria-label="Закрыть окно: ${title(key)}">${icon('close')}</button><button class="minimize" data-win-action="minimize" aria-label="Свернуть окно: ${title(key)}">${icon('minus')}</button><button class="maximize" data-win-action="maximize" aria-label="Развернуть окно: ${title(key)}">${icon('plus')}</button></div><h2>${icon(specs[key].symbol)}<span class="window-title">${title(key)}</span></h2><div class="chrome-right">${icon('monitor')}<span>prettyraven</span></div></header><div class="window-content"></div><div class="resize-handle" aria-hidden="true"></div>`;
    $('#window-layer').append(el);
    win={el,minimized:false,maximized:false,restoreFocus:document.activeElement};wins.set(key,win);
    el.addEventListener('pointerdown',()=>focusWindow(key));
    $('.window-chrome',el).addEventListener('pointerdown',e=>startDrag(e,key));
    $('.window-chrome',el).addEventListener('dblclick',e=>{if(!e.target.closest('button'))toggleMax(key)});
    $('.resize-handle',el).addEventListener('pointerdown',e=>startResize(e,key));
    renderWindow(key);focusWindow(key,true);updateDock();return win;
  }
  function closeWindow(key){
    const win=wins.get(key);if(!win)return;
    const restore=win.restoreFocus;
    win.el.remove();wins.delete(key);
    if(key==='welcome')storage.set('welcome','seen');
    activeKey=null;
    const visible=[...wins.entries()].filter(([,w])=>!w.minimized).sort((a,b)=>Number(a[1].el.style.zIndex)-Number(b[1].el.style.zIndex));
    if(visible.length)focusWindow(visible.at(-1)[0]);
    if(restore?.isConnected)restore.focus({preventScroll:true});
    updateDock();
  }
  function minimizeWindow(key){
    const win=wins.get(key);if(!win)return;
    win.minimized=true;
    win.el.classList.add('is-minimized');win.el.setAttribute('inert','');
    activeKey=null;
    const visible=[...wins.entries()].filter(([,w])=>!w.minimized).sort((a,b)=>Number(a[1].el.style.zIndex)-Number(b[1].el.style.zIndex));
    if(visible.length)focusWindow(visible.at(-1)[0],true);
    else $('[data-dock="finder"]').focus({preventScroll:true});
    updateDock();
  }
  function toggleMax(key){const win=wins.get(key);if(!win||mobile())return;win.maximized=!win.maximized;win.el.classList.toggle('maximized',win.maximized);$('.maximize',win.el).setAttribute('aria-label',`${win.maximized?'Восстановить размер':'Развернуть окно'}: ${specs[key].title}`)}
  function showDesktop(){for(const [key] of wins)minimizeWindow(key);closeMenu()}
  function pointerGesture(e,onMove,onDone){
    e.preventDefault();const target=e.currentTarget;target.setPointerCapture?.(e.pointerId);
    const move=ev=>onMove(ev);
    const done=ev=>{target.removeEventListener('pointermove',move);target.removeEventListener('pointerup',done);target.removeEventListener('pointercancel',done);try{target.releasePointerCapture?.(e.pointerId)}catch{};onDone?.(ev)};
    target.addEventListener('pointermove',move);target.addEventListener('pointerup',done);target.addEventListener('pointercancel',done);
  }
  function startDrag(e,key){
    const win=wins.get(key);if(e.button!==0||e.target.closest('button')||mobile()||win.maximized)return;
    const x=e.clientX,y=e.clientY,left=win.el.offsetLeft,top=win.el.offsetTop,d=$('#desktop').getBoundingClientRect();
    pointerGesture(e,ev=>{win.el.style.left=Math.max(4,Math.min(d.width-win.el.offsetWidth-4,left+ev.clientX-x))+'px';win.el.style.top=Math.max(4,Math.min(d.height-125,top+ev.clientY-y))+'px'});
  }
  function startResize(e,key){
    const win=wins.get(key);if(e.button!==0||mobile()||win.maximized)return;
    const x=e.clientX,y=e.clientY,w=win.el.offsetWidth,h=win.el.offsetHeight,d=$('#desktop').getBoundingClientRect();
    pointerGesture(e,ev=>{win.el.style.width=Math.max(key==='finder'?610:350,Math.min(d.width-win.el.offsetLeft-7,w+ev.clientX-x))+'px';win.el.style.height=Math.max(270,Math.min(d.height-win.el.offsetTop-98,h+ev.clientY-y))+'px'});
  }
  function setWindowTitle(key,value){const win=wins.get(key);if(!win)return;$('.window-title',win.el).textContent=value;win.el.setAttribute('aria-label',value)}
  function content(key){return $('.window-content',wins.get(key).el)}
  function renderWindow(key){
    const root=content(key);
    if(key==='welcome'){
      root.innerHTML=`<div class="welcome-body"><div class="welcome-copy"><span class="micro-label">РАБОЧЕЕ ПРОСТРАНСТВО ДИЗАЙНЕРА</span><h1>Виталий<br>Богданенко</h1><p>Постеры, обложки, принты и digital.<br>Сильная графическая база.</p><div class="welcome-actions"><button class="primary-button" data-nav="gallery">Смотреть галерею ${icon('arrow')}</button><button class="plain-link" data-open="resume">Резюме ↗</button></div></div><div class="welcome-stack" aria-label="Избранные работы"><img class="stack-art" src="./assets/thumbs/artist-cover2.webp" alt="Cover artwork" width="140" height="192"><img class="stack-art" src="./assets/thumbs/f1-vettel.webp" alt="Vettel — F1 poster" width="140" height="192"><img class="stack-art" src="./assets/thumbs/album-kai-angel.webp" alt="Kai Angel — God System" width="140" height="192"><span>SELECTED WORKS / 2026</span></div></div><footer class="welcome-footer"><span><i></i>Графический дизайнер · Москва</span><button data-open="readme">Как здесь всё устроено ↗</button></footer>`;
      root.style.display='flex';root.style.flexDirection='column';
    }else if(key==='finder')renderFinder();
    else if(key==='preview')renderPreview();
    else if(key==='resume')renderResume();
    else if(key==='about')renderAbout();
    else if(key==='contact')renderContact();
    else if(key==='settings')renderSettings();
    else if(key==='readme')renderReadme();
    else if(key==='trash')root.innerHTML=`<div class="trash-content">${icon('trash')}<h3>Корзина пуста</h3><p>Все работы на своих местах.</p><button class="plain-link" data-nav="gallery">Открыть портфолио ↗</button></div>`;
  }

  function navigate(section,record=true){
    if(!sections[section])section='gallery';
    finderState.section=section;finderState.filter='Все';finderState.query='';
    if(record&&finderState.history[finderState.position]!==section){finderState.history=finderState.history.slice(0,finderState.position+1);finderState.history.push(section);finderState.position=finderState.history.length-1;}
    openWindow('finder');
  }
  function sidebarButton(id,label,symbol,count){return `<button class="sidebar-button ${finderState.section===id?'selected':''}" data-nav="${id}" ${finderState.section===id?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span>${count!==undefined?`<span>${count}</span>`:''}</button>`}
  function renderFinder(){
    const state=finderState,section=sections[state.section],root=content('finder');
    setWindowTitle('finder',section.name);
    root.innerHTML=`<div class="finder-layout"><aside class="finder-sidebar" aria-label="Разделы портфолио"><span class="sidebar-label">Избранное</span>${sidebarButton('gallery','Галерея','image',galleryWorks.length)}${sidebarButton('cases','Кейсы','briefcase',cases.length)}${sidebarButton('commerce','Коммерция','folder',commerce.length)}<span class="sidebar-label second">Личное</span><button class="sidebar-button sidebar-personal" data-open="about">${icon('user')}Обо мне</button><button class="sidebar-button sidebar-personal" data-open="resume">${icon('file')}Резюме</button><button class="sidebar-button sidebar-personal" data-open="contact">${icon('mail')}Контакты</button><div class="sidebar-bottom"><span>pr</span><div><strong>prettyraven</strong><br>Graphic designer</div></div></aside><div class="finder-body"><div class="finder-toolbar"><div class="finder-nav"><button class="tool-button back" data-finder="back" aria-label="Назад" ${state.position===0?'disabled':''}>${icon('chevron')}</button><button class="tool-button" data-finder="forward" aria-label="Вперёд" ${state.position>=state.history.length-1?'disabled':''}>${icon('chevron')}</button><span class="finder-breadcrumb"><span class="crumb-root">prettyraven</span>${icon('chevron')}<strong>${esc(section.name)}</strong></span></div><div class="finder-tools"><div class="view-switch" aria-label="Вид файлов"><button data-view="grid" class="${state.view==='grid'?'selected':''}" aria-label="Плитка" aria-pressed="${state.view==='grid'}">${icon('grid')}</button><button data-view="list" class="${state.view==='list'?'selected':''}" aria-label="Список" aria-pressed="${state.view==='list'}">${icon('list')}</button></div><label class="finder-search">${icon('search')}<input type="search" aria-label="Поиск в папке" placeholder="Поиск" value="${esc(state.query)}"></label></div></div><div class="finder-scroll"><div class="finder-heading"><div><h3>${esc(section.name)}</h3><p>${esc(section.description)}</p></div><span>PORTFOLIO / 2026</span></div><div id="finder-filter-area"></div><div id="finder-items"></div></div><footer class="finder-footer"><span id="finder-count"></span><span>${icon('image')}Нажми на файл, чтобы рассмотреть</span></footer></div></div>`;
    $('.finder-search input',root).addEventListener('input',e=>{finderState.query=e.target.value;renderFinderItems()});
    renderFinderItems();
  }
  function finderItems(){
    let items=sections[finderState.section].items;
    if(finderState.filter!=='Все')items=items.filter(w=>w.group===finderState.filter);
    const q=finderState.query.trim().toLowerCase();
    if(q)items=items.filter(w=>[w.title,w.category,w.group].join(' ').toLowerCase().includes(q));
    return items;
  }
  function workCard(w){return `<button class="work-card ${w.kind==='selected'?'dark':''}" data-work="${esc(w.id)}" aria-label="Открыть: ${esc(w.title)}"><span class="art-thumbnail" ${w.kind==='print'?`style="background:${esc(w.background)}"`:''}><img src="${esc(w.thumb)}" alt="${esc(w.title)}" loading="lazy" decoding="async"><span class="file-ext">WEBP</span></span><span class="card-name">${esc(w.title)}</span><span class="card-meta">${esc(w.category)}</span></button>`}
  function renderFinderItems(){
    if(!wins.has('finder'))return;
    const root=content('finder'),state=finderState,section=sections[state.section];
    const q=state.query.trim().toLowerCase();
    if(state.section==='cases'){
      const shown=cases.filter(c=>[c.name,c.subtitle,c.description].join(' ').toLowerCase().includes(q));
      $('#finder-filter-area',root).innerHTML='';
      $('#finder-items',root).innerHTML=shown.length?`<div class="case-grid">${shown.map(c=>`<button class="case-folder" data-nav="case-${c.id}" aria-label="Открыть кейс ${esc(c.name)}">${folder(c.symbol)}<span><strong>${esc(c.name)}</strong><small>${esc(c.subtitle)}<br>${c.items.length} файлов</small></span></button>`).join('')}</div>`:emptySearch();
      $('#finder-count',root).textContent=plural(shown.length,'папка','папки','папок');
      return;
    }
    const groups=[...new Set(section.items.map(w=>w.group))];
    $('#finder-filter-area',root).innerHTML=groups.length>1&&!section.case?`<div class="filter-row" aria-label="Категории работ">${['Все',...groups].map(g=>`<button class="filter-chip ${state.filter===g?'selected':''}" data-filter="${esc(g)}" aria-pressed="${state.filter===g}">${esc(g)}</button>`).join('')}</div>`:'';
    const c=section.case,items=finderItems();
    $('#finder-items',root).innerHTML=`${c?`<div class="case-description"><p>${esc(c.description)}</p>${c.url?`<a class="case-link" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${esc(c.linkText)} ${icon('external')}</a>`:''}<div class="tag-row">${c.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div>`:''}${items.length?`<div class="work-grid ${state.view}">${items.map(workCard).join('')}</div>`:emptySearch()}${c?.video?`<div class="case-video"><video controls playsinline preload="none" poster="./assets/centrrykxd-video-poster.webp"><source src="${c.video}" type="video/mp4"></video><p>Кофта в движении / видео</p></div>`:''}`;
    $('#finder-count',root).textContent=plural(items.length,'файл','файла','файлов')+(state.query?' · результаты поиска':'');
  }
  function emptySearch(){return `<div class="empty-search">${icon('search')}<strong>Ничего не нашлось</strong><p>Попробуй другое название или категорию.</p><button class="plain-link" data-finder="clear-search">Сбросить поиск</button></div>`}
  function openPreview(id,items){
    const w=getWork(id);if(!w)return;
    const list=items?.length?items:allWorks.filter(x=>x.kind===w.kind);
    previewState={items:list,index:Math.max(0,list.findIndex(x=>x.id===id)),zoom:false};
    openWindow('preview');
  }
  function renderPreview(){
    const state=previewState,w=state.items[state.index];if(!w)return;
    setWindowTitle('preview',w.title+'.webp');
    content('preview').innerHTML=`<div class="preview-tools"><div class="navigation"><button class="tool-button" data-preview-action="prev" aria-label="Предыдущая работа" ${state.items.length<2?'disabled':''}>${icon('chevron')}</button><span>${String(state.index+1).padStart(2,'0')} / ${String(state.items.length).padStart(2,'0')}</span><button class="tool-button" data-preview-action="next" aria-label="Следующая работа" ${state.items.length<2?'disabled':''}>${icon('chevron')}</button></div><button class="tool-button zoom-button" data-preview-action="zoom" aria-label="${state.zoom?'Вписать изображение':'Увеличить изображение'}" aria-pressed="${state.zoom}">${icon('zoom')}<span>${state.zoom?'Вписать':'Увеличить'}</span></button></div><div class="preview-stage ${w.kind==='print'?'is-print':''} ${state.zoom?'zoomed':''}"><img src="${esc(w.src)}" alt="${esc(w.title)}" draggable="false"></div><div class="preview-info"><div><h3>${esc(w.title)}</h3><p>${esc(w.description||w.category)}</p></div>${w.productUrl?`<a class="external-link" href="${esc(w.productUrl)}" target="_blank" rel="noopener noreferrer">${w.marketplace||'Ozon'} ${icon('external')}</a>`:''}</div>`;
    const next=state.items[(state.index+1)%state.items.length];
    if(next&&next!==w){const img=new Image();img.src=next.src;}
  }
  function movePreview(delta){previewState.index=(previewState.index+delta+previewState.items.length)%previewState.items.length;previewState.zoom=false;renderPreview()}
  function renderResume(mode='overview'){
    const root=content('resume');
    root.innerHTML=`<div class="resume-toolbar"><div class="segmented"><button data-resume-tab="overview" class="${mode==='overview'?'selected':''}" aria-pressed="${mode==='overview'}">Резюме</button><button data-resume-tab="pdf" class="${mode==='pdf'?'selected':''}" aria-pressed="${mode==='pdf'}">PDF</button></div><a class="download-button" href="${resumeURL}" download="Vitaliy_Bogdanenko_Resume.pdf">${icon('download')}Скачать PDF</a></div>${mode==='pdf'?`<div class="resume-pdf"><div class="pdf-fallback"><span>Оригинальный PDF с полной информацией.</span><a href="${resumeURL}" target="_blank" rel="noopener noreferrer">Открыть отдельно ↗</a></div><iframe title="PDF-резюме Виталия Богданенко" src="${resumeURL}#view=FitH"></iframe></div>`:resumeDocument()}`;
  }
  function resumeDocument(){return `<article class="resume-document"><header class="resume-top"><span class="micro-label">GRAPHIC DESIGNER / MOSCOW</span><h3>Виталий<br>Богданенко</h3><p class="resume-role">Графический дизайнер · визуальные коммуникации</p><div class="tag-row"><span class="tag">1,5 года опыта</span><span class="tag">Гибридный формат</span><span class="tag">Москва</span></div><p>Разносторонний графический дизайнер с коммерческим опытом в e-commerce и fashion. Постеры, обложки, принты, презентации и графика для digital и печати.</p></header><div class="resume-columns"><div><section class="resume-section"><h4>ОПЫТ</h4><h5>Графический дизайнер</h5><p>E-commerce / Fashion-маркетплейсы · 1,5 года</p><ul><li>Разработка и поддержка визуального стиля магазинов детской и взрослой одежды.</li><li>Создание продуктовых визуалов, карточек товаров и рекламных креативов.</li><li>Работа с изображением, типографикой и цветом — от концепции до финальных файлов.</li><li>Подготовка графики для печати и публикации.</li></ul></section><section class="resume-section"><h4>ПРОЕКТЫ</h4><p>NAPRIKOLE × OZON<br>KID LIMITED<br>Саппорты Clout<br>centrrykxd</p><button class="plain-link" data-nav="cases">Открыть кейсы ↗</button></section><section class="resume-section"><h4>ОБРАЗОВАНИЕ</h4><h5>Московский колледж дизайна<br>имени Карла Фаберже</h5><p>Направление — дизайн.</p></section></div><div><section class="resume-section"><h4>ИНСТРУМЕНТЫ</h4><div class="tag-row"><span class="tag">Adobe Photoshop</span><span class="tag">Adobe Illustrator</span><span class="tag">AI-инструменты</span></div></section><section class="resume-section"><h4>НАВЫКИ</h4><p>Композиция и типографика<br>Коллаж и обработка фото<br>Дизайн принтов<br>E-commerce и digital<br>Подготовка к печати</p></section><section class="resume-section"><h4>ЯЗЫКИ</h4><p>Русский — родной<br>Английский — B2</p></section><section class="resume-section"><h4>КОНТАКТЫ</h4><p><a href="mailto:${contactEmail}">${contactEmail}</a><br><a href="https://t.me/prettyraven" target="_blank" rel="noopener noreferrer">@prettyraven ↗</a></p></section></div></div></article>`}
  function renderAbout(){content('about').innerHTML=`<article class="about-content"><div class="about-identity"><div class="avatar" aria-hidden="true"><span>pr</span></div><div><h3>Виталий<br>Богданенко</h3><p>Графический дизайнер · prettyraven</p></div></div><p class="about-motto">Сильная<br>графическая база.</p><p>Создаю визуалы и графику для брендов, артистов и разных форматов коммуникации. Работаю с изображением, типографикой, цветом и композицией.</p><p>От отдельных макетов и презентаций до принтов, постеров, обложек и визуальных систем. Интересны разноплановые задачи, сильная визуальная среда и работа в команде.</p><div class="about-facts"><div><small>ОПЫТ</small><strong>1,5 года<br>e-commerce и fashion</strong></div><div><small>ИНСТРУМЕНТЫ</small><strong>Photoshop · Illustrator<br>AI-инструменты</strong></div><div><small>ФОРМАТ</small><strong>Москва<br>Гибридная позиция</strong></div></div><div class="about-bottom"><button class="primary-button" data-open="contact">Связаться ${icon('arrow')}</button></div></article>`}
  function renderContact(){content('contact').innerHTML=`<article class="contact-content"><span class="contact-availability"><i class="status-dot"></i>Открыт к предложениям</span><h3>Ищу команду.<br>Готов к новым<br>задачам.</h3><p>Гибридная позиция графического дизайнера.<br>Москва · e-commerce / music / digital.</p><a class="contact-card" href="https://t.me/prettyraven" target="_blank" rel="noopener noreferrer">${icon('plane')}<span><small>Написать в Telegram</small><strong>@prettyraven</strong></span>${icon('external')}</a><div class="email-contact"><a class="contact-card" href="mailto:${contactEmail}">${icon('mail')}<span><small>Email</small><strong>${contactEmail}</strong></span></a><button data-copy-email aria-label="Скопировать email">${icon('copy')}</button></div><div class="contact-socials"><a href="https://t.me/pr3ttyraven" target="_blank" rel="noopener noreferrer">Telegram-канал ↗</a><a href="https://www.instagram.com/prettyraven44/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><button data-open="resume">Резюме ↗</button></div></article>`}
  function renderSettings(){
    const wallpaper=storage.get('wallpaper-v2','mac'),theme=storage.get('theme','light');
    content('settings').innerHTML=`<div class="settings-content"><h3>Личное пространство.</h3><p>Немного настроек, чтобы чувствовать себя как дома.</p><span class="setting-label">Обои рабочего стола</span><div class="wallpaper-options">${[['mac','Мой Mac'],['forest','Forest'],['midnight','Midnight'],['paper','Silver']].map(([id,label])=>`<button class="wallpaper-option ${wallpaper===id?'selected':''}" data-wallpaper="${id}" aria-pressed="${wallpaper===id}"><span></span>${label}</button>`).join('')}</div><div class="setting-row"><span class="setting-label">Оформление окон</span><div class="segmented">${[['light','Светлое'],['dark','Тёмное']].map(([id,label])=>`<button class="${theme===id?'selected':''}" data-theme-option="${id}" aria-pressed="${theme===id}">${label}</button>`).join('')}</div></div><div class="setting-row"><span class="setting-label">Окна рабочего стола</span><button data-arrange>Собрать по центру</button></div><p class="settings-bottom">Оформление сохраняется в этом браузере.<br>prettyraven design · Desktop edition / 2026</p></div>`;
  }
  function renderReadme(){content('readme').innerHTML=`<article class="readme-content"><span class="micro-label">ПРИВЕТ, ТЫ НА МОЁМ РАБОЧЕМ СТОЛЕ</span><h3>Расположись<br>поудобнее.</h3><p>Это портфолио Виталия Богданенко в формате рабочего пространства. Все папки и приложения можно открывать.</p><ol><li><strong>Начни с папки «Галерея».</strong><br>Внутри — постеры, обложки, принты и другие визуалы. Нажми на изображение, чтобы рассмотреть его.</li><li><strong>Загляни в «Кейсы».</strong><br>В кейсах — задачи, визуальные решения и готовые вещи.</li><li><strong>Окна ведут себя как на Mac.</strong><br>Их можно двигать за верхнюю панель, менять размер, сворачивать и разворачивать. Папки открываются одним нажатием.</li></ol><div class="readme-shortcuts"><span><kbd>Ctrl / ⌘ K</kbd>поиск</span><span><kbd>← →</kbd>листать работы</span><span><kbd>Esc</kbd>закрыть просмотр</span></div></article>`}

  function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600)}
  async function copyEmail(){
    try{
      await navigator.clipboard.writeText(contactEmail);
      toast('Email скопирован');
    }catch{
      const focused=document.activeElement,field=document.createElement('textarea');
      field.value=contactEmail;field.readOnly=true;field.tabIndex=-1;
      field.style.cssText='position:fixed;left:-9999px;top:0';
      field.setAttribute('aria-hidden','true');document.body.append(field);field.select();
      let copied=false;
      try{copied=document.execCommand('copy')}catch{}
      field.remove();focused?.focus?.({preventScroll:true});
      toast(copied?'Email скопирован':'Email: '+contactEmail);
    }
  }
  function arrange(){
    for(const [key,win] of wins){if(win.minimized)continue;const d=$('#desktop').getBoundingClientRect();win.el.style.left=Math.max(9,(d.width-win.el.offsetWidth)/2)+'px';win.el.style.top=Math.max(9,(d.height-win.el.offsetHeight-90)/2)+'px';}
    toast('Окна собраны по центру');
  }
  function applyTheme(){document.body.dataset.wallpaper=storage.get('wallpaper-v2','mac');document.body.dataset.theme=storage.get('theme','light')}
  function updateClock(){
    const now=new Date();const clock=$('#menu-clock');
    clock.dateTime=now.toISOString();
    clock.textContent=new Intl.DateTimeFormat('ru-RU',{weekday:mobile()?undefined:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(now).replace(' г.','');
  }
  let currentMenu=null;
  const menuContent={
    brand:`<button data-open="about">Об этом портфолио</button><button data-open="readme">Как здесь всё устроено</button><hr><button data-open="contact">Связаться с дизайнером</button>`,
    file:`<button data-nav="gallery">Открыть галерею <small>↵</small></button><button data-nav="cases">Открыть кейсы</button><hr><button data-open="resume">Открыть резюме</button><a href="${resumeURL}" download>Скачать PDF <small>↓</small></a>`,
    view:`<button data-menu-action="search">Поиск по портфолио <small>⌘ K</small></button><button data-open="settings">Обои и оформление</button><hr><button data-menu-action="desktop">Показать рабочий стол</button>`,
    window:`<button data-arrange>Собрать окна по центру</button><button data-menu-action="minimize">Свернуть текущее окно</button><button data-menu-action="close">Закрыть текущее окно</button><hr><button data-menu-action="desktop">Показать рабочий стол</button>`
  };
  function closeMenu(){currentMenu=null;$('#popup-menu').hidden=true;$$('.menu-trigger').forEach(e=>e.setAttribute('aria-expanded','false'))}
  function toggleMenu(name,trigger){
    if(currentMenu===name){closeMenu();return}
    closeMenu();currentMenu=name;trigger.setAttribute('aria-expanded','true');
    const menu=$('#popup-menu'),rect=trigger.getBoundingClientRect();
    menu.innerHTML=menuContent[name]+(name==='window'&&wins.size?'<hr>'+[...wins].map(([key,w])=>`<button data-open="${key}">${esc($('.window-title',w.el).textContent)}${w.minimized?'<small>Свёрнуто</small>':''}</button>`).join(''):'');
    menu.style.left=Math.min(rect.left,innerWidth-230)+'px';menu.style.top='36px';menu.hidden=false;
  }
  function openSpotlight(){
    closeMenu();spotlightRestore=document.activeElement;$('#spotlight').hidden=false;
    $('#desktop').setAttribute('inert','');$('#dock').setAttribute('inert','');$('.menu-bar').setAttribute('inert','');
    $('#spotlight-input').value='';spotlightIndex=0;renderSpotlight();$('#spotlight-input').focus();
  }
  function closeSpotlight(){
    $('#spotlight').hidden=true;$('#desktop').removeAttribute('inert');$('#dock').removeAttribute('inert');$('.menu-bar').removeAttribute('inert');spotlightRestore?.focus?.({preventScroll:true});
  }
  function renderSpotlight(){
    const q=$('#spotlight-input').value.trim().toLowerCase();
    const folders=[{title:'Галерея',sub:'Постеры, обложки и принты',nav:'gallery',symbol:'image'},{title:'Кейсы',sub:'Коммерческие проекты',nav:'cases',symbol:'briefcase'},{title:'Резюме',sub:'Обзор и оригинальный PDF',open:'resume',symbol:'file'},{title:'Обо мне',sub:'Виталий Богданенко',open:'about',symbol:'user'},{title:'Контакты',sub:'Telegram и email',open:'contact',symbol:'mail'}];
    spotlightItems=q?[...folders.filter(f=>[f.title,f.sub].join(' ').toLowerCase().includes(q)),...allWorks.filter(w=>[w.title,w.group,w.category].join(' ').toLowerCase().includes(q)).map(w=>({title:w.title,sub:w.category,work:w.id,thumb:w.thumb}))].slice(0,14):folders;
    spotlightIndex=Math.min(spotlightIndex,Math.max(0,spotlightItems.length-1));
    $('#spotlight-results').innerHTML=spotlightItems.length?spotlightItems.map((w,i)=>`<button class="spotlight-result ${i===spotlightIndex?'selected':''}" data-spotlight-index="${i}">${w.thumb?`<img src="${esc(w.thumb)}" alt="">`:icon(w.symbol)}<span><strong>${esc(w.title)}</strong><small>${esc(w.sub)}</small></span>${i===spotlightIndex?'<span class="return-key">↵</span>':''}</button>`).join(''):`<div class="empty-search"><strong>Ничего не нашлось</strong><p>Попробуй название работы или категории.</p></div>`;
  }
  function activateSpotlight(i){const item=spotlightItems[i];if(!item)return;closeSpotlight();if(item.nav)navigate(item.nav);else if(item.open)openWindow(item.open);else if(item.work)openPreview(item.work)}
  $('#spotlight-input').addEventListener('input',()=>{spotlightIndex=0;renderSpotlight()});
  $('#spotlight').addEventListener('click',e=>{if(e.target===$('#spotlight'))closeSpotlight()});
  $('#spotlight-close').addEventListener('click',closeSpotlight);
  $('#spotlight-trigger').addEventListener('click',openSpotlight);
  document.addEventListener('click',e=>{
    const target=e.target.closest('button,a');
    if(!target){if(!e.target.closest('#popup-menu'))closeMenu();return}
    if(target.matches('.menu-trigger')){toggleMenu(target.dataset.menu,target);return}
    if(!target.closest('#popup-menu'))closeMenu();
    if(target.dataset.open){openWindow(target.dataset.open);closeMenu()}
    else if(target.dataset.nav){navigate(target.dataset.nav);closeMenu()}
    else if(target.dataset.work){openPreview(target.dataset.work,finderItems())}
    else if(target.dataset.preview){openPreview(target.dataset.preview,selected)}
    else if(target.dataset.winAction){const key=target.closest('.window').dataset.window;({close:closeWindow,minimize:minimizeWindow,maximize:toggleMax}[target.dataset.winAction])(key)}
    else if(target.dataset.finder){
      if(target.dataset.finder==='clear-search'){finderState.query='';finderState.filter='Все';renderFinder()}
      else{const delta=target.dataset.finder==='back'?-1:1;const pos=Math.max(0,Math.min(finderState.history.length-1,finderState.position+delta));finderState.position=pos;navigate(finderState.history[pos],false)}
    }
    else if(target.dataset.filter){finderState.filter=target.dataset.filter;renderFinderItems()}
    else if(target.dataset.view){finderState.view=target.dataset.view;storage.set('view',finderState.view);renderFinder()}
    else if(target.dataset.previewAction){
      if(target.dataset.previewAction==='zoom'){previewState.zoom=!previewState.zoom;renderPreview()}
      else movePreview(target.dataset.previewAction==='next'?1:-1);
    }
    else if(target.dataset.resumeTab)renderResume(target.dataset.resumeTab);
    else if(target.hasAttribute('data-copy-email'))copyEmail();
    else if(target.dataset.wallpaper){storage.set('wallpaper-v2',target.dataset.wallpaper);applyTheme();renderSettings()}
    else if(target.dataset.themeOption){storage.set('theme',target.dataset.themeOption);applyTheme();renderSettings()}
    else if(target.hasAttribute('data-arrange')){arrange();closeMenu()}
    else if(target.dataset.menuAction){const action=target.dataset.menuAction;closeMenu();if(action==='search')openSpotlight();else if(action==='desktop')showDesktop();else if(activeKey)(action==='close'?closeWindow:minimizeWindow)(activeKey)}
    else if(target.dataset.spotlightIndex!==undefined)activateSpotlight(Number(target.dataset.spotlightIndex));
    if(target.matches('.dock-item')){target.classList.remove('bounce');void target.offsetWidth;target.classList.add('bounce');setTimeout(()=>target.classList.remove('bounce'),700)}
  });
  document.addEventListener('keydown',e=>{
    if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#spotlight').hidden?openSpotlight():closeSpotlight();return}
    if(!$('#spotlight').hidden){
      if(e.key==='Escape'){e.preventDefault();closeSpotlight()}
      else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();spotlightIndex=(spotlightIndex+(e.key==='ArrowDown'?1:-1)+spotlightItems.length)%Math.max(1,spotlightItems.length);renderSpotlight();$('.spotlight-result.selected')?.scrollIntoView({block:'nearest'})}
      else if(e.key==='Enter'){e.preventDefault();activateSpotlight(spotlightIndex)}
      else if(e.key==='Tab'){const nodes=$$('input,button',$('#spotlight'));const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
      return;
    }
    if(e.target.closest('input,textarea'))return;
    if(e.key==='Escape'){if(currentMenu)closeMenu();else if(activeKey==='preview')closeWindow('preview')}
    if(activeKey==='preview'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();movePreview(e.key==='ArrowRight'?1:-1)}
  });
  $('#dock').addEventListener('pointermove',e=>{
    if(e.pointerType==='touch'||mobile())return;
    $$('.dock-item').forEach(el=>{const r=el.getBoundingClientRect(),d=Math.abs(e.clientX-r.left-r.width/2);el.style.setProperty('--scale',1+.35*Math.exp(-(d*d)/(2*55*55)))});
  });
  $('#dock').addEventListener('pointerleave',()=>$$('.dock-item').forEach(el=>el.style.setProperty('--scale',1)));
  window.addEventListener('resize',()=>{updateClock();if(mobile())return;const d=$('#desktop').getBoundingClientRect();for(const win of wins.values()){if(win.maximized)continue;const w=Math.min(win.el.offsetWidth,d.width-24),h=Math.min(win.el.offsetHeight,d.height-110);win.el.style.width=w+'px';win.el.style.height=h+'px';win.el.style.left=Math.max(7,Math.min(win.el.offsetLeft,d.width-w-7))+'px';win.el.style.top=Math.max(7,Math.min(win.el.offsetTop,d.height-h-98))+'px'}});
  applyTheme();updateClock();setInterval(updateClock,15000);
  if(!mobile()&&storage.get('welcome','new')==='new')openWindow('welcome');
})();
