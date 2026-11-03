'use strict';
window.UI = (() => {
  const lines = {
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    sliders:'<path d="M4 7h16M4 17h16"/><rect x="7" y="4" width="5" height="6" rx="2" fill="currentColor" stroke="none"/><rect x="13" y="14" width="5" height="6" rx="2" fill="currentColor" stroke="none"/>',
    folder:'<path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    star:'<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    list:'<path d="M9 6h12M9 12h12M9 18h12M3 6h1M3 12h1M3 18h1"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
    briefcase:'<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V4h8v3M3 12c6 3 12 3 18 0M10 14h4"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',
    file:'<path d="M14 3H6a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9ZM14 3v6h6M8 14h8M8 18h6"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    arrowup:'<path d="M12 20V4m-6 6 6-6 6 6"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    external:'<path d="M14 3h7v7m0-7L10 14M10 4H4v16h16v-6"/>',
    copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
    plus:'<path d="M12 4v16M4 12h16"/>',
    minus:'<path d="M5 12h14"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8m-4-5v5"/>',
    trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
    plane:'<path d="m21 3-7 18-4-7-7-4 18-7ZM10 14l5-5"/>',
    note:'<path d="M5 3h14v18H5Z M8 8h8M8 12h8M8 16h5"/>',
    zoom:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>'
  };
  function icon(name,cls=''){return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${lines[name]||lines.folder}</svg>`;}
  function folder(symbol='image',color='blue'){return `<span class="folder-icon ${color}"><span class="folder-back"></span><span class="folder-paper"></span><span class="folder-front">${icon(symbol)}</span></span>`;}
  const dockArt={
    finder:`<defs><linearGradient id="finder-a" x2="0" y2="1"><stop stop-color="#4cbcff"/><stop offset="1" stop-color="#2189f4"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#finder-a)"/><path d="M34 2H48a14 14 0 0 1 14 14v32a14 14 0 0 1-14 14H32c-4-11-5-18-2-25h-7l8-22Z" fill="#d3eeff"/><path d="M15 19v7m32-7v7M15 40c9 9 25 9 34-1M34 38v15" stroke="#15354b" stroke-width="2.3" stroke-linecap="round" fill="none"/>`,
    gallery:`<defs><linearGradient id="gal-a" x2="1" y2="1"><stop stop-color="#e29bf9"/><stop offset="1" stop-color="#7849c5"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#gal-a)"/><rect x="15" y="12" width="35" height="40" rx="5" transform="rotate(10 32 32)" fill="#4a2772" opacity=".4"/><rect x="12" y="13" width="36" height="39" rx="5" fill="#fff"/><rect x="16" y="17" width="28" height="27" rx="2" fill="#ae87d4"/><circle cx="23" cy="24" r="4" fill="#ffdb85"/><path d="m16 40 9-10 6 6 6-10 7 14v4H16Z" fill="#4e7b70"/>`,
    cases:`<defs><linearGradient id="case-a" x2="0" y2="1"><stop stop-color="#83d2ff"/><stop offset="1" stop-color="#348de0"/></linearGradient></defs><path d="M4 17a6 6 0 0 1 6-6h15l6 7h23a6 6 0 0 1 6 6v29a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6Z" fill="#1974bb"/><path d="M4 25a5 5 0 0 1 5-5h46a5 5 0 0 1 5 5v27a7 7 0 0 1-7 7H11a7 7 0 0 1-7-7Z" fill="url(#case-a)"/><rect x="22" y="31" width="20" height="16" rx="3" stroke="#1966a3" stroke-width="2" fill="none"/><path d="M28 31v-4h8v4m-14 7h20" stroke="#1966a3" stroke-width="2" fill="none"/>`,
    resume:`<rect x="8" y="3" width="48" height="58" rx="10" fill="#f8f9fc"/><path d="M42 3v13h14" fill="#d8dce5"/><path d="M19 23h20m-20 7h26m-26 7h20" stroke="#c2c6d0" stroke-width="3" stroke-linecap="round"/><rect x="15" y="43" width="34" height="14" rx="4" fill="#ed5c5c"/><text x="32" y="53.5" fill="white" font-size="10" font-weight="700" text-anchor="middle" font-family="Arial">PDF</text>`,
    contact:`<defs><linearGradient id="mail-a" x2="0" y2="1"><stop stop-color="#61baff"/><stop offset="1" stop-color="#246be1"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#mail-a)"/><rect x="10" y="16" width="44" height="33" rx="5" fill="#fff"/><path d="m11 18 21 18 21-18M11 47l14-14m28 14L39 33" stroke="#81b7f4" stroke-width="1.7" fill="none"/>`,
    telegram:`<defs><linearGradient id="tg-a" x2="0" y2="1"><stop stop-color="#6bd6f7"/><stop offset="1" stop-color="#259bdc"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#tg-a)"/><path d="m12 30 38-15c2-1 3 1 2 3l-7 32c-.4 2-2 2-4 1L30 43l-6 6c-1 1-2 1-2-1l1-12 21-17-25 14Z" fill="white"/><path d="m23 36 3 11 4-4 14-24Z" fill="#c4e7f7"/>`,
    settings:`<defs><linearGradient id="set-a" x2="0" y2="1"><stop stop-color="#e4e6e9"/><stop offset="1" stop-color="#91969c"/></linearGradient></defs><rect x="2" y="2" width="60" height="60" rx="14" fill="url(#set-a)"/><circle cx="32" cy="32" r="21" fill="#586169"/><path d="m32 10 3 7 7-2 1 7 7 3-4 7 4 7-7 3-1 7-7-2-3 7-4-7-7 2-1-7-7-3 4-7-4-7 7-3 1-7 7 2Z" fill="#c7ccd1"/><circle cx="32" cy="32" r="13" fill="#68747d"/><circle cx="32" cy="32" r="8" fill="#adb7bd"/>`,
    trash:`<defs><linearGradient id="trash-a" x2="1" y2="0"><stop stop-color="#d9e4e5" stop-opacity=".8"/><stop offset=".5" stop-color="#eef7f4" stop-opacity=".5"/><stop offset="1" stop-color="#97b4b5" stop-opacity=".8"/></linearGradient></defs><path d="m13 15 4 40c1 6 29 6 30 0l4-40" fill="url(#trash-a)" stroke="#d9eded"/><ellipse cx="32" cy="15" rx="19" ry="6" fill="#bdd0ce"/><ellipse cx="32" cy="15" rx="15" ry="3.5" fill="#6f898b"/><path d="m22 24 2 28m8-27v29m10-30-2 28" stroke="#6f898b" stroke-width="2" opacity=".65"/>`
  };
  function dock(name){return `<svg class="dock-art" viewBox="0 0 64 64" aria-hidden="true">${dockArt[name]||dockArt.finder}</svg>`;}
  return {icon,folder,dock};
})();
