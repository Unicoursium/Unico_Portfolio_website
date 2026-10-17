const $ = (s, root = document) => root.querySelector(s);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
