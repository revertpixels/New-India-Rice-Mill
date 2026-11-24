(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,PH='917001769570',MAIL='umasankardan@gmail.com';
document.documentElement.classList.add('js');
const root=location.pathname.includes('/products/')?'../':'';
/* ---------- grain art (fallback for photos + product cards) ---------- */
const KINDS={swarna:[9,.42,'#f1dc9a'],ratna:[8.5,.4,'#f6efd6'],bashkathi:[12.5,.25,'#f8f2de'],minikit:[7,.34,'#fffdf4'],mix:[9,.36,'#f4e8bf']};
function kindOf(t){t=(t||'').toLowerCase();return /swarna/.test(t)?'swarna':/ratna/.test(t)?'ratna':/bashkathi|banskathi/.test(t)?'bashkathi':/minikit|miniket/.test(t)?'minikit':'mix'}
function art(kind){const[l,t,c]=KINDS[kind]||KINDS.mix;let s=kind.length*97+7;const r=()=>(s=(s*16807)%2147483647)/2147483647;let g='';
for(let i=0;i<150;i++){const x=r()*400,y=r()*300,a=r()*180,k=.75+r()*.5;g+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(l*k*1.35).toFixed(1)}" ry="${(l*t*k*1.35).toFixed(1)}" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c}" stroke="rgba(70,80,40,.35)" stroke-width=".7"/>`}
return`<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="ag${kind}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d5e2c6"/><stop offset="1" stop-color="#b9cfa6"/></linearGradient></defs><rect width="400" height="300" fill="url(#ag${kind})"/>${g}</svg>`}
$$('.product-photo').forEach(p=>{const im=$('img',p);const k=kindOf((im&&im.alt)+(p.closest('a,article')||{}).innerHTML?.slice(0,300));p.insertAdjacentHTML('afterbegin',art(k))});
function failed(im){if(im.dataset.f)return;im.dataset.f=1;const p=im.parentElement;
if(p.classList.contains('product-photo')){im.remove();return}
const b=document.createElement('div');b.className='artbox '+im.className;b.style.height=getComputedStyle(im).height;b.style.minHeight=im.offsetHeight?'':'220px';b.innerHTML=art(kindOf(im.alt));im.replaceWith(b)}
$$('img').forEach(im=>{im.addEventListener('error',()=>failed(im));if(im.complete&&!im.naturalWidth&&im.src)failed(im)});
/* ---------- nav ---------- */
const nav=$('.nav-shell'),links=$('.nav-links'),menu=$('.menu-btn');let ly=0;
$$('a',links).forEach((a,i)=>a.style.setProperty('--i',i));
if(menu)menu.addEventListener('click',()=>{const o=links.classList.toggle('open');menu.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''});
$$('a',links).forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu&&menu.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const prog=document.createElement('div');prog.id='prog';document.body.prepend(prog);
const bt=$('.backtop');
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;prog.style.transform=`scaleX(${h>0?y/h:0})`;
if(nav&&!links.classList.contains('open'))nav.classList.toggle('hide',y>320&&y>ly+4);if(y<ly-4&&nav)nav.classList.remove('hide');ly=y;
bt&&bt.classList.toggle('on',y>700);
if(!RM)$$('.visual-band').forEach(v=>{const r=v.getBoundingClientRect();v.style.setProperty('--py',(r.top*-.12).toFixed(1)+'px')})}
let tk=0;addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(()=>{onScroll();tk=0})}},{passive:true});onScroll();
const ic=null;
/* ---------- icons for cards ---------- */
const I={grain:'<path d="M12 3c3 3 4 7 0 11-4-4-3-8 0-11zM12 14v7M7 9c-2 1-3 3-3 6 3 0 5-2 5-5M17 9c2 1 3 3 3 6-3 0-5-2-5-5"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/>',pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>',check:'<path d="M4 12l5 5L20 6"/>',box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8"/>',tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.500" cy="7.500" r="1.500"/>',home:'<path d="M3 21V9l9-6 9 6v12zM9 21v-7h6v7"/>'};
function pick(t,i){t=t.toLowerCase();for(const[k,v]of[['business','home'],['location','pin'],['local','pin'],['product','grain'],['variety','grain'],['range','grain'],['direct','chat'],['connected','chat'],['grade','check'],['confirm','check'],['quantity','box'],['price','tag']])if(t.includes(k))return v;return['grain','chat','pin'][i%3]}
$$('.feature,.spec-card').forEach((c,i)=>{const h=$('h3',c);const d=document.createElement('div');d.className='ico';d.innerHTML=`<svg viewBox="0 0 24 24">${I[pick(h?h.textContent:'',[...c.parentElement.children].indexOf(c))]}</svg>`;const m=$('.feature-mark',c);m?m.replaceWith(d):c.prepend(d)});
/* ---------- reveal ---------- */
const SEL='.section-head,.split-copy,.split-image,.photo-mosaic,.feature,.product-card,.step,.spec-card,.stat,.story-block,.gallery-item,.faq-item,.contact-info,.contact-form-card,.detail-hero-copy,.builder-grid>*,.cta-strip .container,.visual-band .container,.map-box';
if(!RM&&'IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);setTimeout(()=>e.target.classList.remove('rv','in'),1500)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$(SEL).forEach(el=>{if(el.closest('.hero'))return;const sib=[...el.parentElement.children].filter(x=>x.matches(SEL));el.style.setProperty('--d',Math.min(sib.indexOf(el),5)*.08+'s');el.classList.add('rv');io.observe(el)})}
/* ---------- counters ---------- */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,m=el.textContent.match(/^(\d+)(.*)$/);if(!m||RM)return;const n=+m[1],pad=m[1].length,t0=performance.now();(function f(t){const k=Math.min((t-t0)/1300,1),v=Math.round(n*(1-Math.pow(1-k,3)));el.textContent=String(v).padStart(pad,'0')+m[2];if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$('.stat strong').forEach(s=>cio.observe(s));
/* ---------- ticker ---------- */
const trk=$('.track');if(trk)trk.innerHTML+=trk.innerHTML;
/* ---------- open now ---------- */
$$('[data-open]').forEach(el=>{try{const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date()).map(x=>[x.type,x.value]));
const sun=p.weekday==='Sun',now=(+p.hour%24)*60+ +p.minute,o=sun?420:480,c=sun?1320:1260,f=m=>{const h=Math.floor(m/60);return(h%12||12)+':00 '+(h>=12?'PM':'AM')};
if(now>=o&&now<c)el.textContent='Open now · until '+f(c);else{el.classList.add('closed');const tomSun=p.weekday==='Sat';el.textContent='Closed · opens '+(now<o?f(o):f(tomSun?420:480))}}catch(e){el.remove()}});
/* ---------- grain engine ---------- */
function grains(host,o){const c=document.createElement('canvas');c.className='gcv';c.setAttribute('aria-hidden','true');host.prepend(c);
const x=c.getContext('2d'),pc=document.createElement('canvas'),px=pc.getContext('2d'),COL=['#fffdf2','#f6edcf','#ecdca4','#f0b429','#e3ecd2'];
let W,H,dp,cols,hm,cap,gs=[],on=true,mx=-999,my=-999,CW=6,last=0;
const capAt=i=>cap*(.62+.38*Math.sin(i*.05+1)*Math.cos(i*.017));
function G(top){const s=4+Math.random()*4.5;return{x:Math.random()*W,y:top?-Math.random()*H*.9-10:-12,vx:(Math.random()-.5)*.6,vy:.8+Math.random()*1.6,r:Math.random()*6.28,vr:(Math.random()-.5)*.05,s,c:COL[Math.random()*COL.length|0]}}
function dg(k,g){k.save();k.translate(g.x,g.y);k.rotate(g.r);k.fillStyle=g.c;k.strokeStyle='rgba(11,38,25,.35)';k.lineWidth=.7;k.beginPath();k.ellipse(0,0,g.s,g.s*.36,0,0,6.283);k.fill();k.stroke();k.restore()}
function settle(g){const i=Math.min(cols-1,Math.max(0,g.x/CW|0));if(hm[i]>=capAt(i))return;g.y=H-hm[i]-g.s*.2;dg(px,g);for(let k=-2;k<=2;k++){const j=i+k;if(j>=0&&j<cols)hm[j]=Math.min(capAt(j),hm[j]+g.s*.3*(1-Math.abs(k)/3))}}
function size(){const r=host.getBoundingClientRect();dp=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;c.width=pc.width=W*dp;c.height=pc.height=H*dp;x.setTransform(dp,0,0,dp,0,0);px.setTransform(dp,0,0,dp,0,0);cols=Math.ceil(W/CW)+1;hm=new Float32Array(cols);cap=H*o.cap;
for(let i=0;i<o.pre;i++){const g=G(0);g.y=0;settle(g)}gs=[];for(let i=0;i<(W<700?o.n*.55:o.n);i++)gs.push(G(1))}
function dig(){if(my<H-cap*1.25)return;const R=46;px.save();px.globalCompositeOperation='destination-out';px.beginPath();px.arc(mx,my,R,0,6.283);px.fill();px.restore();
for(let i=Math.max(0,(mx-R)/CW|0);i<Math.min(cols,(mx+R)/CW+1);i++){const d=i*CW-mx,t=my+Math.sqrt(Math.max(0,R*R-d*d))*.7;hm[i]=Math.min(hm[i],Math.max(0,H-t))}
if(gs.length<420)for(let k=0;k<3;k++){const g=G(0);g.x=mx+(Math.random()-.5)*30;g.y=my;g.vy=-2-Math.random()*3;g.vx=(Math.random()-.5)*4;gs.push(g)}}
function frame(t){if(!on)return;requestAnimationFrame(frame);if(t-last<14)return;last=t;x.clearRect(0,0,W,H);x.drawImage(pc,0,0,W,H);
for(let i=0;i<gs.length;i++){const g=gs[i];g.vy=Math.min(g.vy+.045,4.2);g.vx*=.992;
const dx=g.x-mx,dy=g.y-my,d2=dx*dx+dy*dy;if(d2<9000){const d=Math.sqrt(d2)||1,f=(95-d*.55)/95*1.4;g.vx+=dx/d*f;g.vy+=dy/d*f*.6}
g.x+=g.vx+Math.sin(g.y*.01+i)*.18;g.y+=g.vy;g.r+=g.vr;if(g.x<-10)g.x=W+10;if(g.x>W+10)g.x=-10;
const ci=Math.min(cols-1,Math.max(0,g.x/CW|0));if(g.y>=H-hm[ci]-g.s*.3){if(g.vy>0){settle(g)}gs[i]=G(0);continue}dg(x,g)}}
size();x.drawImage(pc,0,0,W,H);
if(RM)return;
host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;dig()});host.addEventListener('pointerleave',()=>{mx=my=-999});
new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&!on){on=true;requestAnimationFrame(frame)}on=v;},{threshold:0}).observe(host);
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,200)});requestAnimationFrame(frame)}
const hero=$('.hero');if(hero){grains(hero,{n:90,cap:.17,pre:3000});}
const ph=$('.page-hero');if(ph)grains(ph,{n:30,cap:.09,pre:600});
/* ---------- stalks above footer ---------- */
const ft=$('.site-footer');if(ft){let s=3;const r=()=>(s=(s*16807)%2147483647)/2147483647;let g='';
for(let i=0;i<54;i++){const x=i*22.5+r()*10,h=36+r()*30,b=(r()-.5)*8,d=(-r()*4.5).toFixed(2);let gr='';for(let k=0;k<6;k++){const t=k/6,gx=x+b*1.2+(k%2?3.5:-3.5),gy=76-h+k*5.200;gr+=`<ellipse cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" rx="4.200" ry="1.800" transform="rotate(${k%2?-35:35} ${gx.toFixed(1)} ${gy.toFixed(1)})" fill="#f0b429"/>`}
g+=`<g class="st" style="animation-delay:${d}s"><path d="M${x.toFixed(1)} 76Q${(x+b).toFixed(1)} ${76-h/2} ${(x+b*1.2).toFixed(1)} ${76-h}" stroke="#2f8a4f" stroke-width="1.700" fill="none" stroke-linecap="round"/>${gr}</g>`}
ft.insertAdjacentHTML('afterbegin',`<div class="stalks" aria-hidden="true"><svg viewBox="0 0 1200 76" preserveAspectRatio="xMidYMax slice">${g}</svg></div>`)}
/* ---------- faq ---------- */
$$('.faq-a').forEach(a=>{a.innerHTML=`<div>${a.innerHTML}</div>`});
$$('.faq-q').forEach(q=>q.addEventListener('click',()=>{const row=q.closest('.faq-item'),o=!row.classList.contains('open');$$('.faq-item.open').forEach(x=>x!==row&&x.classList.remove('open'));row.classList.toggle('open',o)}));
/* ---------- product filter, tilt ---------- */
const fl=$$('[data-filter]');fl.forEach(b=>b.addEventListener('click',()=>{fl.forEach(x=>x.classList.remove('active'));b.classList.add('active');const v=b.dataset.filter;$$('[data-category]').forEach(c=>c.classList.toggle('hidden-card',v!=='all'&&c.dataset.category!==v))}));
if(matchMedia('(hover:hover)').matches&&!RM)$$('.product-card').forEach(c=>{c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${px*7}deg) rotateX(${-py*7}deg) translateY(-6px)`});c.addEventListener('pointerleave',()=>{c.style.transform=''})});
/* ---------- lightbox ---------- */
const gi=$$('.gallery-item');if(gi.length){const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<button class="x" aria-label="Close">×</button><button class="pv" aria-label="Previous">‹</button><div style="text-align:center"><img alt=""><p></p></div><button class="nx" aria-label="Next">›</button>';document.body.append(lb);let n=0;
const show=i=>{n=(i+gi.length)%gi.length;const im=$('img',gi[n]);if(!im)return;$('img',lb).src=im.currentSrc||im.src;$('p',lb).textContent=im.alt;lb.classList.add('on')};
gi.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();show(i)}));
$('.x',lb).onclick=()=>lb.classList.remove('on');$('.pv',lb).onclick=()=>show(n-1);$('.nx',lb).onclick=()=>show(n+1);lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on')});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowRight')show(n+1);if(e.key==='ArrowLeft')show(n-1)});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(n+(d<0?1:-1))})}
/* ---------- enquiries ---------- */
$$('[data-enquire]').forEach(b=>b.addEventListener('click',()=>{const p=b.dataset.enquire;location.href=`mailto:${MAIL}?subject=${encodeURIComponent('Wholesale enquiry – '+p)}&body=${encodeURIComponent('Hello,\nI would like to enquire about '+p+'. Please share the current availability, grade/specification, packaging, wholesale price and dispatch details.\n\nThank you.')}`}));
const form=$('#enquiry-form');if(form){const q=new URLSearchParams(location.search).get('product');if(q){const sel=$('#product');[...sel.options].forEach(o=>{if(o.text.toLowerCase().startsWith(q.split('-')[0]))sel.value=o.value})}
form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);location.href=`mailto:${MAIL}?subject=${encodeURIComponent('Website enquiry – '+d.get('name'))}&body=${encodeURIComponent(`Name: ${d.get('name')}\nPhone: ${d.get('phone')}\nBusiness: ${d.get('business')}\nRice variety: ${d.get('product')}\nQuantity: ${d.get('quantity')}\nMessage: ${d.get('message')}`)}`})}
const bq=$('#qr');if(bq){let v='Swarna';const msg=$('#msg'),bn=$('#bn'),bd=$('#bd'),qv=$('#qv');
const build=()=>{const q=+bq.value,qs=q>=100?'100+ tonnes':q+(q===1?' tonne':' tonnes');qv.textContent=qs;
const t=`Hello, ${bn.value.trim()?'I’m '+bn.value.trim()+'. ':''}I’d like to enquire about ${v} rice — about ${qs}${bd.value.trim()?', delivered to '+bd.value.trim():''}. Please share current availability, grade, packing, price and dispatch details. Thank you.`;msg.textContent=t;
$('#wa').href=`https://wa.me/${PH}?text=${encodeURIComponent(t)}`;$('#em').href=`mailto:${MAIL}?subject=${encodeURIComponent('Wholesale enquiry – '+v+' rice')}&body=${encodeURIComponent(t)}`};
$$('.chip').forEach(c=>c.addEventListener('click',()=>{$$('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');v=c.dataset.v;build()}));
[bq,bn,bd].forEach(i=>i.addEventListener('input',build));
$('#cp').addEventListener('click',e=>{const b=e.currentTarget;(navigator.clipboard?navigator.clipboard.writeText(msg.textContent):Promise.reject()).then(()=>{b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy message',1800)}).catch(()=>{b.textContent='Press Ctrl+C to copy'})});build()}
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
/* ---------- page transition ---------- */
$$('a[href]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(e.defaultPrevented||e.metaKey||e.ctrlKey||a.target||!h||/^(#|mailto:|tel:|https?:)/.test(h)||RM)return;e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.href,200)}));
addEventListener('pageshow',e=>{if(e.persisted)document.body.classList.remove('leaving')});
})();
