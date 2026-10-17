const $ = (s, root = document) => root.querySelector(s);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projects = [
  {id:'fold',title:'Fold / Form',category:'physical',label:'OBJECTS & STRUCTURES',bg:'#d9ddcf',desc:'An exploration of structure, material and the possibilities of a single surface.',intro:'How much can one surface become? A visual study of folds, balance and the space between an object and its structure.',question:'What happens when a simple sheet becomes the starting point for a three-dimensional object?',process:'This placeholder shows how sketches, material tests and prototypes could sit together in a project story. Your own design decisions and iterations will take its place.',outcome:'Use this space for the final object, photographs of the details, and a reflection on what changed along the way.'},
  {id:'field',title:'Field Notes',category:'digital',label:'INTERFACES & EXPERIENCES',bg:'#c9d5df',desc:'A quieter digital space for collecting observations and connecting ideas.',intro:'A concept interface for small observations and unexpected connections. An example of how a digital project could live alongside physical work.',question:'How might an interface make space for curiosity, without adding to the noise?',process:'This section can hold research, user journeys, wireframes and interface iterations. A working prototype or a demonstration video can be added with your real project.',outcome:'Show the finished experience, explain your contribution, and connect the design back to the problem you set out to explore.'},
  {id:'orbit',title:'Orbit Assembly',category:'experimental',label:'MECHANISMS & MOTION',bg:'#d9c9ba',desc:'A study in connected parts, playful movement and mechanical expression.',intro:'An abstract assembly built around a circular form. A visual placeholder for projects where engineering and experimentation meet.',question:'How can a mechanism be expressive as well as functional?',process:'Use this space to document CAD development, mechanism choices, testing and revisions. Diagrams and short clips can help explain what static photographs cannot.',outcome:'A place for the assembled prototype, the results of testing, and the next questions you would like to investigate.'},
  {id:'signal',title:'Signal / Noise',category:'experimental',label:'COMPUTATION & PATTERN',bg:'#313c35',desc:'Finding rhythm and unexpected order in a field of simple rules.',intro:'A generative visual study made from repeated lines and small changes. An example of a project that begins with a question and a few rules.',question:'What kind of complexity can emerge from a very simple system?',process:'This section can explain the rules behind a computational experiment, show variations, and trace how the work evolved through iteration.',outcome:'Bring together the final patterns, interactive experiments and the observations that make the project yours.'}
];

const svgWrap = (content, label, extra='') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 520" role="img" aria-label="${label}" ${extra}>${content}</svg>`;
const defs = `<defs><filter id="shadow"><feGaussianBlur stdDeviation="12"/></filter><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e2e4da"/><stop offset=".48" stop-color="#b2b7a5"/><stop offset="1" stop-color="#77806e"/></linearGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5f6ef"/><stop offset="1" stop-color="#d7e3db"/></linearGradient><linearGradient id="dark" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#454c40"/><stop offset="1" stop-color="#202b25"/></linearGradient></defs>`;

function torus(cx=320,cy=245,scale=1,base=[239,84,46]) {
  const faces=[], n=80,m=18;
  function point(u,v){
    let x=(133+39*Math.cos(v))*Math.cos(u), y=(133+39*Math.cos(v))*Math.sin(u), z=39*Math.sin(v);
    const a=.72,b=-.48;
    let yy=y*Math.cos(a)-z*Math.sin(a),zz=y*Math.sin(a)+z*Math.cos(a);
    let xx=x*Math.cos(b)+zz*Math.sin(b), z2=-x*Math.sin(b)+zz*Math.cos(b);
    return [cx+scale*xx,cy+scale*yy, z2];
  }
  for(let i=0;i<n;i++)for(let j=0;j<m;j++){
    const u=i/n*Math.PI*2,v=j/m*Math.PI*2;
    const pts=[point(u,v),point(u+2*Math.PI/n,v),point(u+2*Math.PI/n,v+2*Math.PI/m),point(u,v+2*Math.PI/m)];
    const light=.68+.22*Math.cos(v-1.0)+.15*Math.sin(u+1.2);
    const c=base.map(x=>Math.max(0,Math.min(255,Math.round(x*light+12))));
    faces.push({z:pts.reduce((s,p)=>s+p[2],0)/4,content:`<polygon points="${pts.map(p=>p.slice(0,2).map(v=>v.toFixed(1)).join(',')).join(' ')}" fill="rgb(${c})" stroke="rgb(${c})" stroke-width=".6"/>`});
  }
  return faces.sort((a,b)=>a.z-b.z).map(f=>f.content).join('');
}

function art(type){
 if(type==='hero'||type==='orbit')return svgWrap(`${defs}<ellipse cx="333" cy="426" rx="155" ry="20" fill="#253126" opacity=".15" filter="url(#shadow)"/><path d="M243 337 351 307 439 353 330 387Z" fill="#444d40"/><path d="M243 337 330 387 330 416 243 366Z" fill="#283329"/><path d="M330 387 439 353 439 382 330 416Z" fill="#171f19"/><path d="M302 340 322 330 322 229 302 236Z" fill="#757d6a"/><path d="M322 330 338 339 338 237 322 229Z" fill="#394335"/>${torus(320,227,1.08)}<circle cx="327" cy="365" r="5" fill="#a7b393"/><path d="M132 384h70m-35-35v70M447 146h50m-25-25v50" stroke="#6d7864" stroke-width="1" opacity=".5"/><path d="M155 164 230 124M432 345l59-32" stroke="#6d7864" opacity=".5"/><circle cx="155" cy="164" r="3" fill="none" stroke="#6d7864"/><text x="105" y="148" font-family="monospace" font-size="9" fill="#6d7864">R. 133</text><text x="475" y="302" font-family="monospace" font-size="9" fill="#6d7864">01 / UY</text>`, 'Original orange toroidal sculpture on a dark geometric base');
 if(type==='fold')return svgWrap(`${defs}<ellipse cx="333" cy="438" rx="170" ry="18" fill="#4e5b3c" opacity=".18" filter="url(#shadow)"/><path d="M173 184 359 113 470 170 285 246Z" fill="#e5e7d9"/><path d="M285 246 470 170 430 342 249 419Z" fill="url(#metal)"/><path d="M173 184 285 246 249 419 141 357Z" fill="#a7b099"/><path d="M211 218 247 239 220 367 182 345Z" fill="#59674c"/><path d="M321 264 419 223 398 316 301 356Z" fill="#879477"/><path d="M321 264 334 273 429 233 419 223Z" fill="#5e6d53"/><path d="M301 356 315 361 334 273 321 264Z" fill="#b9c2ac"/><path d="M173 184 359 113 470 170M285 246 249 419" stroke="#f6f6eb" fill="none" stroke-width="1.5"/><path d="M141 430h322M141 424v12m322-12v12" stroke="#7a886e" stroke-width=".7"/><text x="280" y="451" fill="#738168" font-size="9" font-family="monospace" letter-spacing="2">ONE SURFACE / MANY POSSIBILITIES</text>`, 'Original folded sheet sculpture in sage green');
 if(type==='field')return svgWrap(`${defs}<ellipse cx="329" cy="452" rx="180" ry="16" fill="#243b50" opacity=".15" filter="url(#shadow)"/><g transform="translate(92 81) rotate(-8 210 180)"><rect x="28" y="18" width="422" height="313" rx="9" fill="#a5b7c1"/><rect width="422" height="313" rx="9" fill="#f0f1e9"/><path d="M0 42h422" stroke="#d0d4c9"/><circle cx="18" cy="21" r="3" fill="#ee5b36"/><circle cx="30" cy="21" r="3" fill="#c2c6ba"/><circle cx="42" cy="21" r="3" fill="#c2c6ba"/><text x="348" y="25" font-family="monospace" font-size="8" fill="#5f6e5a">FIELD / 01</text><text x="26" y="88" font-family="sans-serif" font-size="28" letter-spacing="-1" fill="#28352c">Small observations.</text><text x="26" y="112" font-family="sans-serif" font-size="11" fill="#73816c">Room for the things you notice.</text><rect x="26" y="139" width="169" height="147" rx="3" fill="#d6dec7"/><path d="M91 252c-25-34 8-51 21-84 32 32 37 56-3 84" fill="#798e60"/><path d="M105 273v-68" fill="none" stroke="#4b5e3e"/><text x="39" y="273" font-family="monospace" font-size="7" fill="#4c5f40">01 / A WALK OUTSIDE</text><rect x="207" y="139" width="189" height="70" rx="3" fill="#e4d4bf"/><path d="M228 174h109m-109 9h145m-145 9h88" stroke="#a59176" stroke-width="2"/><text x="221" y="157" font-family="monospace" font-size="7" fill="#7b694f">THOUGHTS IN PROGRESS</text><rect x="207" y="221" width="189" height="65" rx="3" fill="#343f35"/><text x="222" y="249" font-family="sans-serif" font-size="13" fill="#e6eada">Make space for an idea.</text><path d="M365 258h14m-7-7 7 7-7 7" stroke="#b9c9ab" fill="none"/></g>`, 'Original concept interface for Field Notes, with observation cards');
 let lines=''; for(let i=0;i<58;i++){let d='';for(let j=0;j<=80;j++){const x=98+j*5.5;const y=90+i*6.2 + Math.sin(j*.105+i*.075)*32*Math.sin(j/80*Math.PI)+Math.cos(j*.17+i*.12)*18;d+=(j?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' ';}lines+=`<path d="${d}" fill="none" stroke="${i%8===0?'#f17a42':'#bdc8a9'}" opacity="${.45+i/140}" stroke-width="1.2"/>`;}
 return svgWrap(`<circle cx="330" cy="260" r="190" fill="#a6b393" opacity=".03"/>${lines}<text x="98" y="480" fill="#a5b69c" font-size="9" font-family="monospace" letter-spacing="2">SIMPLE RULES. UNEXPECTED PATTERNS.</text>`, 'Original generative line field in cream and orange on deep green');
}

$('#hero-art').innerHTML=art('hero');
const grid=$('#project-grid');
grid.innerHTML=projects.map((p,i)=>`<article class="project-card reveal" data-category="${p.category}"><button class="project-button" data-project="${p.id}" aria-label="Explore ${p.title}, illustrative project"><div class="project-art" style="background:${p.bg}"><span class="art-index" style="${p.id==='signal'?'color:#c9d2bb':''}">STUDY / 00${i+1}</span>${art(p.id)}<span class="art-open" aria-hidden="true">↗</span></div><div class="project-meta"><span>${p.label}</span><span>ILLUSTRATIVE STUDY</span></div><div class="project-title"><h3>${p.title}</h3><span aria-hidden="true">↗</span></div></button><p class="project-description">${p.desc}</p></article>`).join('');

let currentFilter='all';
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 currentFilter=button.dataset.filter;
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 document.querySelectorAll('.project-card').forEach(card=>{card.hidden=currentFilter!=='all'&&card.dataset.category!==currentFilter;});
 grid.classList.toggle('filtered',currentFilter!=='all');
 const count=projects.filter(p=>currentFilter==='all'||p.category===currentFilter).length;
 $('#filter-count').textContent=`${count} ${count===1?'STUDY':'STUDIES'}`;
}));

const dialog=$('#project-dialog');let previousFocus=null;
function renderProject(id){
 const p=projects.find(p=>p.id===id);if(!p)return;
 const next=projects[(projects.indexOf(p)+1)%projects.length];
 $('#dialog-content').innerHTML=`<div class="case-header"><span class="eyebrow">${p.label} / ILLUSTRATIVE STUDY</span><h2 id="dialog-title">${p.title}<span class="accent">.</span></h2><p>${p.intro}</p><div class="case-facts"><div><span>DISCIPLINE</span>${p.category[0].toUpperCase()+p.category.slice(1)} design</div><div><span>STATUS</span>Sample content</div><div><span>PORTFOLIO</span>Unico Yin</div></div></div><div class="case-art" style="background:${p.bg}">${art(p.id)}</div><div class="case-content"><section><h3>01 / The question</h3><p>${p.question}</p></section><section><h3>02 / The exploration</h3><p>${p.process}</p></section><section><h3>03 / The outcome</h3><p>${p.outcome}</p></section><div class="case-note">This is an illustrative project layout, not a completed project by Unico. The artwork and text demonstrate the presentation; real project material will replace them.</div></div><button class="case-next" data-next="${next.id}"><div><span>NEXT STUDY</span><strong>${next.title}</strong></div><b aria-hidden="true">↗</b></button>`;
 $('[data-next]',dialog).addEventListener('click',()=>{location.hash=`project/${next.id}`;});
 dialog.scrollTop=0;
}
function syncRoute(){
 const id=location.hash.startsWith('#project/')?location.hash.slice(9):null;
 if(id&&projects.some(p=>p.id===id)){
  if(!dialog.open){previousFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
  renderProject(id);$('#close-dialog').focus({preventScroll:true});document.title=`${projects.find(p=>p.id===id).title} — Unico Yin`;
 }else if(dialog.open){dialog.close();}
}
grid.addEventListener('click',e=>{const button=e.target.closest('[data-project]');if(button)location.hash=`project/${button.dataset.project}`;});
$('#close-dialog').addEventListener('click',()=>{location.hash='work';});
$('.dialog-home').addEventListener('click',()=>{location.hash='work';});
dialog.addEventListener('cancel',e=>{e.preventDefault();location.hash='work';});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)location.hash='work';}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');document.title='Unico Yin — Design Engineering';if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});});
window.addEventListener('hashchange',syncRoute);syncRoute();

const themeButton=$('.theme');
function setTheme(dark){document.body.classList.toggle('dark',dark);themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');$('meta[name="theme-color"]').content=dark?'#20231f':'#ecebe5';}
try{setTheme(localStorage.getItem('unico-theme')==='dark');}catch{}
themeButton.addEventListener('click',()=>{const dark=!document.body.classList.contains('dark');setTheme(dark);try{localStorage.setItem('unico-theme',dark?'dark':'light');}catch{}});
function updateClock(){$('#clock').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());}
updateClock();setInterval(updateClock,30000);$('#year').textContent=new Date().getFullYear();
if(!reduceMotion&&'IntersectionObserver' in window){document.body.classList.add('js-motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
if(!reduceMotion&&matchMedia('(hover:hover)').matches){const box=$('.hero-object');box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();$('#hero-art').style.transform=`perspective(850px) rotateX(${-(e.clientY-r.top-r.height/2)/28}deg) rotateY(${(e.clientX-r.left-r.width/2)/28}deg)`;});box.addEventListener('pointerleave',()=>{$('#hero-art').style.transform='none';});}
