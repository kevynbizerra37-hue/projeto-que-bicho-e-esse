// ========= DADOS — MUNDO 1 =========
const ANIMALS1 = [
  { id:'arara',  name:'ARARA',  emoji:'🦜', sound:'assets/sounds/arara.mp3',
    color:'linear-gradient(135deg,#1565C0,#FFD700)', biome:'amz',
    fact:'A arara vive na Floresta Amazônica! 🌳 Ela ama árvores altíssimas e frutas tropicais.' },
  { id:'onca',   name:'ONÇA',   emoji:'🐆', sound:'assets/sounds/onca.mp3',
    color:'linear-gradient(135deg,#FFD700,#FF8F00)', biome:'pan',
    fact:'A onça-pintada caça no Pantanal! 💧 É o maior felino das Américas.' },
  { id:'flamingo', name:'FLAMINGO', emoji:'🦩', sound:'assets/sounds/flamingo.mp3',
    color:'linear-gradient(135deg,#FF8F00,#E53935)', biome:'mat',
    fact:'O flamingo habita a Mata Atlântica! 🌿 Sua cor rosa vem dos alimentos que ele come.' },
  { id:'macaco', name:'MACACO', emoji:'🐵', sound:'assets/sounds/macaco.mp3',
    color:'linear-gradient(135deg,#FF8F00,#6D4C41)', biome:'amz',
    fact:'O macaco-prego vive na Floresta Amazônica! 🌳 Ele usa pedras para quebrar cocos.' },
];

// ========= DADOS — MUNDO 2 =========
const ANIMALS2 = [
  { id:'mico',     name:'MICO-LEÃO', emoji:'🦁', sound:'assets/sounds/mico.mp3',
    color:'linear-gradient(135deg,#FFD700,#FF8F00)', biome:'mac',
    fact:'O mico-leão-dourado vive na Mata Costeira! 🌿 É um dos animais mais ameaçados do Brasil.' },
  { id:'tatu',     name:'TATU',      emoji:'🦔', sound:'assets/sounds/tatu.mp3',
    color:'linear-gradient(135deg,#8D6E63,#5D4037)', biome:'cat',
    fact:'O tatu vive na Caatinga! 🌵 Sua armadura de osso o protege dos predadores.' },
  { id:'capivara', name:'CAPIVARA',  emoji:'🦫', sound:'assets/sounds/capirava.mp3',
    color:'linear-gradient(135deg,#795548,#4E342E)', biome:'man',
    fact:'A capivara vive nos Manguezais! 💦 É o maior roedor do mundo!' },
  { id:'tartaruga',name:'TARTARUGA', emoji:'🐢', sound:'assets/sounds/tartaruga.mp3',
    color:'linear-gradient(135deg,#006064,#0277BD)', biome:'oce',
    fact:'A tartaruga-marinha nada no Oceano Atlântico! 🌊 Ela volta à mesma praia onde nasceu para desovar.' },
];

const BIOMES1 = {
  amz:{ id:'amz', name:'AMAZÔNIA',       icon:'🌳', cssClass:'b-amz', desc:'Floresta tropical úmida',    hint:'Floresta com muita chuva e rios' },
  mat:{ id:'mat', name:'MATA ATLÂNTICA', icon:'🌿', cssClass:'b-mat', desc:'Costa leste do Brasil',       hint:'Montanhas cobertas de floresta' },
  cer:{ id:'cer', name:'CERRADO',        icon:'🌵', cssClass:'b-cer', desc:'Savana brasileira',            hint:'Gramíneas e árvores retorcidas' },
  pan:{ id:'pan', name:'PANTANAL',       icon:'💧', cssClass:'b-pan', desc:'Maior área alagada do mundo', hint:'Rios, lagos e terrenos alagados' },
};
const BIOMES2 = {
  mac:{ id:'mac', name:'MATA COSTEIRA',  icon:'🌿', cssClass:'b-mac', desc:'Floresta úmida do litoral',   hint:'Floresta junto ao mar' },
  cat:{ id:'cat', name:'CAATINGA',       icon:'🌵', cssClass:'b-cat', desc:'Semiárido nordestino',        hint:'Solo seco e plantas espinhosas' },
  man:{ id:'man', name:'MANGUEZAL',      icon:'🦀', cssClass:'b-man', desc:'Entre o mar e o rio',         hint:'Raízes dentro da água salgada' },
  oce:{ id:'oce', name:'OCEANO',         icon:'🌊', cssClass:'b-oce', desc:'Mar aberto do Brasil',        hint:'Águas salgadas do Atlântico' },
};

// Cavernas Mundo 1 (baseado em 1402×1122)
const PORTALS1 = [
  { x:244, y:154 },   // Floresta → Arara
  { x:1218, y:154 },  // Pantanal  → Onça
  { x:1185, y:958 },  // Mata Atlântica → Flamingo
  { x:215, y:956 },   // Amazônia  → Macaco
];
const TREE1 = { x:680, y:544 };

// Cavernas Mundo 2 (baseado em 1402×1122)
const PORTALS2 = [
  { x:164, y:158 },   // Floresta costeira → Mico-leão
  { x:690, y:745 },   // Buraco no solo    → Tatu
  { x:681, y:158 },   // Deserto/Caatinga  → Capivara
  { x:1288, y:505 },  // Caverna aquática  → Tartaruga
];
const TREE2 = { x:300, y:720 };

// Dimensões do mundo (podem ser ajustadas após carregar a imagem)
let WW = 1402, WH = 1122;
const MAP_DIM = { 1:{w:1402,h:1122}, 2:{w:1402,h:1122} };

// ========= ESTADO =========
const G = {
  screen:'intro',
  world:1,
  idx:0,
  score:0, combo:0,
  done1:[], done2:[],
  firstTry:true, muted:false, audio:null,
  keys:{}, raf:null,
  px1:680, py1:640,
  px2:330, py2:760,
  vx:0, vy:0,
  camx:0, camy:0,
  p3tries:0,
  _walkTimer:null,
  webAudio:{ctx:null, nodes:[]},
};

// Helpers
function curAnimals(){ return G.world===1 ? ANIMALS1 : ANIMALS2; }
function curBiomes(){ return G.world===1 ? BIOMES1  : BIOMES2; }
function curDone(){   return G.world===1 ? G.done1  : G.done2; }
function curPortals(){return G.world===1 ? PORTALS1 : PORTALS2; }
function curTree(){   return G.world===1 ? TREE1    : TREE2; }
function curPX(){     return G.world===1 ? G.px1    : G.px2; }
function curPY(){     return G.world===1 ? G.py1    : G.py2; }
function curPlayerEl(){ return document.getElementById(G.world===1?'player':'player2'); }
function curWorldEl(){  return document.getElementById(G.world===1?'world':'world2'); }
function curMapSc(){    return G.world===1?'map':'map2'; }

// ========= SAVE / LOAD =========
function save(){
  try{
    localStorage.setItem('aq_score',G.score);
    localStorage.setItem('aq_done1',JSON.stringify(G.done1));
    localStorage.setItem('aq_done2',JSON.stringify(G.done2));
  }catch(e){}
}
function load(){
  try{
    const s = localStorage.getItem('aq_score');
    const d1= localStorage.getItem('aq_done1');
    const d2= localStorage.getItem('aq_done2');
    if(s) G.score=parseInt(s)||0;
    if(d1) G.done1=JSON.parse(d1)||[];
    if(d2) G.done2=JSON.parse(d2)||[];
  }catch(e){}
}
function resetGame(){
  try{
    localStorage.removeItem('aq_score');
    localStorage.removeItem('aq_done1');
    localStorage.removeItem('aq_done2');
  }catch(e){}
  G.score=0; G.done1=[]; G.done2=[]; G.world=1;
  document.getElementById('btn-continue').style.display='none';
  feedback('Progresso apagado!', true);
}

// ========= NAVEGAÇÃO =========
function showSc(id){
  const prev=G.screen;
  if(prev==='p1' && id!=='p1') stopAnimalAudio();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('sc-'+id).classList.add('active');
  G.screen=id;
  const onMap = id==='map'||id==='map2';
  document.getElementById('mutebtn').style.display= onMap?'block':'none';
  document.getElementById('backbtn').style.display= ['p1','p2','p3','p4'].includes(id)?'block':'none';
  ['p1','p2','p3','p4'].forEach(p=>{
    const el=document.getElementById('sc-'+p);
    if(el) el.classList.toggle('world2-theme', G.world===2);
  });
}

// ========= HUD =========
function updateHUD(){
  const ids=['map-score-val','map-score-val2'];
  ids.forEach(id=>{ const el=document.getElementById(id); if(el) el.textContent=G.score; });
  drawProg(1); drawProg(2);
}
function addPts(n){ G.score+=n; save(); updateHUD(); }

let _fbT=null;
function feedback(msg, ok){
  const el=document.getElementById('fbmsg');
  el.textContent=msg; el.className='fbm show '+(ok?'ok':'bad');
  if(_fbT) clearTimeout(_fbT);
  _fbT=setTimeout(()=>el.classList.remove('show'),1800);
}

// ========= ÁUDIO =========
function ensureAudioCtx(){
  if(!G.webAudio.ctx){
    try{ G.webAudio.ctx = new (window.AudioContext||window.webkitAudioContext)(); }
    catch(e){ G.webAudio.ctx = null; }
  }
  return G.webAudio.ctx;
}
function stopWebAudio(){
  G.webAudio.nodes.forEach(n=>{ try{ n.stop ? n.stop() : (n.gain && (n.gain.value=0)); }catch(e){} });
  G.webAudio.nodes=[];
}
function stopAnimalAudio(){
  if(G.audio){ try{ G.audio.pause(); G.audio.currentTime=0; }catch(e){} G.audio=null; }
  stopWebAudio();
  const orb=document.getElementById('sound-orb');
  if(orb) orb.classList.remove('play');
}
function playBeepSequence(seq=[{f:440,d:0.2}]){
  const ctx=ensureAudioCtx(); if(!ctx) return;
  if(ctx.state==='suspended') ctx.resume();
  const now=ctx.currentTime;
  let t=now;
  seq.forEach(step=>{
    const osc=ctx.createOscillator(); const gain=ctx.createGain();
    osc.type='square'; osc.frequency.value=step.f;
    gain.gain.setValueAtTime(0.0001,t);
    gain.gain.exponentialRampToValueAtTime(0.2,t+0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001,t+Math.max(0.05,step.d-0.02));
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t+step.d);
    G.webAudio.nodes.push(osc);
    t+=step.d+0.03;
  });
}
function animalTone(animalId){
  // Pequenas assinaturas sonoras por animal (fallback)
  const A=(...f)=>f.map(x=>({f:x,d:0.18}));
  switch(animalId){
    case 'arara': return A(880,660,990,660,880);
    case 'onca': return A(220,220,196,174,220);
    case 'flamingo': return A(523,659,784,659,523);
    case 'macaco': return A(392,440,494,440,392);
    case 'mico': return A(660,784,988,784,660);
    case 'tatu': return A(196,220,247,220,196);
    case 'capivara': return A(262,330,392,330,262);
    case 'tartaruga': return A(330,294,262,294,330);
    default: return A(440,660,440);
  }
}

function playSound(){
  if(G.muted) return;
  const orb=document.getElementById('sound-orb');
  if(orb) orb.classList.add('play');
  try{
    if(G.audio){G.audio.pause();G.audio=null;}
    const a=curAnimals()[G.idx];
    const au=new Audio(a.sound);
    G.audio=au;
    // Caso ocorra falha ao tocar (arquivo inexistente), usar WebAudio
    const onFail=()=>{ try{ playBeepSequence(animalTone(a.id)); }catch(_){} };
    au.onerror=onFail;
    au.play().catch(()=>{ onFail(); });
    au.onended=()=>{ if(orb) orb.classList.remove('play'); };
    // safety
    setTimeout(()=>{ if(orb) orb.classList.remove('play'); }, 4000);
  }catch(e){
    setTimeout(()=>{ if(orb) orb.classList.remove('play'); },1500);
  }
}
function toggleMute(){
  G.muted=!G.muted;
  document.getElementById('mutebtn').textContent=G.muted?'🔇':'🔊';
  if(G.muted) stopAnimalAudio();
}

// ========= INTRO =========
function buildIntroBG(){
  const c=document.getElementById('intro-trees');
  if(!c) return;
  ['🌳','🌲','🌴','🌿','🌳','🌲','🌴','🌿','🌳','🌲','🌴','🌿'].forEach((t,i)=>{
    const d=document.createElement('div');
    d.className='intro-tree'; d.textContent=t;
    d.style.cssText=`left:${4+i*8.2}%;font-size:${22+Math.random()*20}px;opacity:${(.3+Math.random()*.35).toFixed(2)};animation-delay:${Math.random()*2}s`;
    c.appendChild(d);
  });
}

function startGame(){
  G.world=1; applyWorldSize(1);
  buildPortals(1); positionPlayer(1); snapCamera(1,true); drawMini(1); updateHUD();
  showSc('map'); startLoop();
}
function continueGame(){
  if(G.done1.length>=4){
    G.world=2; applyWorldSize(2);
    buildPortals(2); positionPlayer(2); snapCamera(2,true); drawMini(2); showSc('map2');
  } else { startGame(); }
  startLoop();
}

// ========= PORTAIS =========
function buildPortals(w){
  const animals = w===1 ? ANIMALS1 : ANIMALS2;
  const done    = w===1 ? G.done1  : G.done2;
  const portPos = w===1 ? PORTALS1 : PORTALS2;
  const tree    = w===1 ? TREE1    : TREE2;
  const cont    = document.getElementById(w===1?'portals':'portals2');
  cont.querySelectorAll('.portal').forEach(p=>p.remove());

  portPos.forEach((pos,i)=>{
    const a=animals[i]; const isDone=done.includes(i); const isUlk=(i===0)||done.includes(i-1);
    const div=document.createElement('div');
    div.className='portal '+(isDone?'don':isUlk?'ulk':'lck');
    div.id='portal'+(w===1?'':'2')+'-'+i; div.style.left=pos.x+'px'; div.style.top=pos.y+'px'; div.dataset.idx=i;
    if(isDone){
      div.innerHTML=`<span class="portal-emoji">${a.emoji}</span><span class="portal-name">${a.name}</span><span class="portal-star">⭐</span>`;
    } else if(isUlk){
      div.innerHTML=`<span class="portal-emoji portal-shadow">${a.emoji}</span><span class="portal-name">???</span>`;
      div.onclick=()=>enterLevel(i);
    } else {
      div.innerHTML=`<span class="portal-emoji portal-shadow">${a.emoji}</span><span class="portal-name" style="color:#90A4AE">???</span>`;
    }
    cont.appendChild(div);
  });

  const tp=document.getElementById(w===1?'tree-portal':'tree-portal2');
  tp.style.left=tree.x+'px'; tp.style.top=tree.y+'px';
  checkTreeUnlock(w);
}
function biomeColor(b,w){
  const m={amz:'#69F0AE',mat:'#B9F6CA',cer:'#FFCC02',pan:'#80D8FF',mac:'#A5D6A7',cat:'#FFCC80',man:'#80CBC4',oce:'#80DEEA'};
  return m[b]||'#fff';
}
function checkTreeUnlock(w){
  const done=w===1?G.done1:G.done2; const animals=w===1?ANIMALS1:ANIMALS2;
  const tp=document.getElementById(w===1?'tree-portal':'tree-portal2'); if(!tp) return;
  if(w===2){
    tp.classList.add('unlocked');
    tp.onclick=()=>backToWorld1();
    return;
  }
  const all=done.length>=animals.length;
  if(all){
    tp.classList.add('unlocked'); tp.onclick=w===1?showW2Unlock:()=>backToWorld1();
  } else { tp.classList.remove('unlocked'); tp.onclick=null; }
}

// ========= PLAYER & CAMERA =========
function positionPlayer(w){ const pl=document.getElementById(w===1?'player':'player2'); const x=w===1?G.px1:G.px2, y=w===1?G.py1:G.py2; pl.style.left=x+'px'; pl.style.top=y+'px'; }
function setPlayerMotion(pl, dx, dy, moving){
  if(!pl) return;
  pl.classList.toggle('walk', moving);
  if(!moving) return;
  pl.classList.remove('frog-up','frog-down','frog-left','frog-right','flip');
  if(Math.abs(dx)>Math.abs(dy)) pl.classList.add(dx<0?'frog-left':'frog-right');
  else pl.classList.add(dy<0?'frog-up':'frog-down');
}
function snapCamera(w, immediate=false){
  const worldEl=document.getElementById(w===1?'world':'world2'); if(!worldEl) return;
  const vw=window.innerWidth, vh=window.innerHeight;
  const px=w===1?G.px1:G.px2, py=w===1?G.py1:G.py2;
  const dim=MAP_DIM[w]||{w:WW,h:WH};
  WW=dim.w; WH=dim.h;
  const tx=Math.max(0,Math.min(WW-vw, px-vw/2));
  const ty=Math.max(0,Math.min(WH-vh, py-vh/2));
  if(immediate){
    G.camx=tx; G.camy=ty;
  } else {
    G.camx += (tx-G.camx)*0.18;
    G.camy += (ty-G.camy)*0.18;
  }
  worldEl.style.transform=`translate(${-G.camx}px,${-G.camy}px)`;
}

// ========= MINIMAP / PROGRESS =========
function drawMini(w){
  const mm=document.getElementById(w===1?'minimap':'minimap2'); if(!mm) return;
  const ctx=mm.getContext('2d'); const mw=mm.width, mh=mm.height;
  const dim=MAP_DIM[w]||{w:WW,h:WH}; const sx=mw/dim.w, sy=mh/dim.h;
  ctx.clearRect(0,0,mw,mh);

  if(w===1){
    ctx.fillStyle='#1B5E20'; ctx.fillRect(0,0,mw/2,mh/2);
    ctx.fillStyle='#BF360C'; ctx.fillRect(mw/2,0,mw/2,mh/2);
    ctx.fillStyle='#FF8F00'; ctx.fillRect(0,mh/2,mw/2,mh/2);
    ctx.fillStyle='#558B2F'; ctx.fillRect(mw/2,mh/2,mw/2,mh/2);
    PORTALS1.forEach((p,i)=>{ const d=G.done1.includes(i), u=(i===0)||G.done1.includes(i-1); ctx.fillStyle=d?'#69F0AE':u?'#FFD700':'#607D8B'; ctx.fillRect(p.x*sx-3,p.y*sy-3,6,6); });
    ctx.fillStyle=G.done1.length>=4?'#FFD700':'#795548'; ctx.fillRect(TREE1.x*sx-4,TREE1.y*sy-4,8,8);
    ctx.fillStyle='#fff'; ctx.fillRect(G.px1*sx-4,G.py1*sy-4,8,8);
  } else {
    ctx.fillStyle='#2E7D32'; ctx.fillRect(0,0,mw*0.28,mh);
    ctx.fillStyle='#BF360C'; ctx.fillRect(mw*0.28,0,mw*0.38,mh);
    ctx.fillStyle='#C8A96A'; ctx.fillRect(mw*0.54,0,mw*0.14,mh);
    ctx.fillStyle='#0277BD'; ctx.fillRect(mw*0.68,0,mw*0.32,mh);
    PORTALS2.forEach((p,i)=>{ const d=G.done2.includes(i), u=(i===0)||G.done2.includes(i-1); ctx.fillStyle=d?'#80DEEA':u?'#FFD700':'#607D8B'; ctx.fillRect(p.x*sx-3,p.y*sy-3,6,6); });
    ctx.fillStyle='#006064'; ctx.fillRect(TREE2.x*sx-4,TREE2.y*sy-4,8,8);
    ctx.fillStyle='#fff'; ctx.fillRect(G.px2*sx-4,G.py2*sy-4,8,8);
  }
  const vw=window.innerWidth, vh=window.innerHeight;
  ctx.strokeStyle='rgba(255,255,255,.45)'; ctx.lineWidth=1; ctx.strokeRect(G.camx*sx,G.camy*sy,vw*sx,vh*sy);
}
function drawProg(w){
  const animals=w===1?ANIMALS1:ANIMALS2; const done=w===1?G.done1:G.done2;
  const el=document.getElementById('prog-list'+w); if(!el) return;
  el.innerHTML=animals.map((a,i)=>{
    const isDone=done.includes(i);
    const label=isDone ? `${a.emoji} ${a.name}` : '???';
    return `<div class="prog-item"><div class="prog-dot ${isDone?'done':'todo'}"></div><span style="color:${isDone?'#69F0AE':'#90A4AE'}">${label}</span></div>`;
  }).join('');
  const sv=document.getElementById('map-score-val'+(w===2?'2':'')); if(sv) sv.textContent=G.score;
}

// ========= LOOP =========
function startLoop(){
  if(G.raf) cancelAnimationFrame(G.raf);
  function loop(){ if(G.screen==='map'||G.screen==='map2') movePlayer(); G.raf=requestAnimationFrame(loop); }
  loop();
}
function movePlayer(){
  let ix=0,iy=0;
  if(G.keys['ArrowLeft']||G.keys['a']||G.keys['A']) ix-=1;
  if(G.keys['ArrowRight']||G.keys['d']||G.keys['D']) ix+=1;
  if(G.keys['ArrowUp']||G.keys['w']||G.keys['W']) iy-=1;
  if(G.keys['ArrowDown']||G.keys['s']||G.keys['S']) iy+=1;

  const mag=Math.hypot(ix,iy);
  if(mag>0){ ix/=mag; iy/=mag; }

  const ACC=0.34, FRICTION=0.78, MAX=3.0;
  G.vx=(G.vx||0)+ix*ACC;
  G.vy=(G.vy||0)+iy*ACC;
  if(!mag){ G.vx*=FRICTION; G.vy*=FRICTION; }
  const speed=Math.hypot(G.vx,G.vy);
  if(speed>MAX){ G.vx=(G.vx/speed)*MAX; G.vy=(G.vy/speed)*MAX; }
  if(Math.hypot(G.vx,G.vy)<0.05){
    G.vx=0; G.vy=0;
    setPlayerMotion(curPlayerEl(),0,0,false);
    return;
  }

  const w=G.world; const dim=MAP_DIM[w]||{w:WW,h:WH};
  let nx=(w===1?G.px1:G.px2)+G.vx, ny=(w===1?G.py1:G.py2)+G.vy;
  nx=Math.max(40,Math.min(dim.w-40,nx)); ny=Math.max(80,Math.min(dim.h-40,ny));
  if(w===1){G.px1=nx;G.py1=ny;} else {G.px2=nx;G.py2=ny;}

  const pl=curPlayerEl(); pl.style.left=nx+'px'; pl.style.top=ny+'px';
  setPlayerMotion(pl,G.vx,G.vy,true);
  clearTimeout(G._walkTimer); G._walkTimer=setTimeout(()=>setPlayerMotion(pl,0,0,false),200);
  snapCamera(G.world); drawMini(G.world); checkNear();
}
function checkNear(){
  const w=G.world; const done=w===1?G.done1:G.done2; const portPos=w===1?PORTALS1:PORTALS2;
  const px=w===1?G.px1:G.px2, py=w===1?G.py1:G.py2; const prefix=w===1?'portal':'portal2';
  portPos.forEach((pos,i)=>{
    const dist=Math.hypot(px-pos.x,py-pos.y); const pDiv=document.getElementById(prefix+'-'+i); if(!pDiv) return;
    const ulk=(i===0)||done.includes(i-1); const pDone=done.includes(i);
    const oldH=pDiv.querySelector('.portal-hint'); if(oldH) oldH.remove(); pDiv.classList.remove('near');
    if(dist<110&&ulk&&!pDone){ pDiv.classList.add('near'); const h=document.createElement('div'); h.className='portal-hint'; h.textContent='▶ APERTE E'; pDiv.appendChild(h); }
  });
}

// ========= ENTRAR NO NÍVEL =========
function enterLevel(i){
  const done=curDone(); const ulk=(i===0)||done.includes(i-1);
  if(!ulk||done.includes(i)) return;
  G.idx=i; G.firstTry=true; G.combo=0; G.p3tries=0;
  setupP1(); showSc('p1');
}

// ========= FASE 1 — SOM =========
function setupP1(){
  const a=curAnimals(); const animal=a[G.idx]; const others=a.filter((_,j)=>j!==G.idx);
  const opts=shuffle([animal,...shuffle(others).slice(0,3)]);
  const grid=document.getElementById('p1grid'); grid.innerHTML='';
  opts.forEach(opt=>{ const card=document.createElement('div'); card.className='p1card'; card.innerHTML=`<span class="c-emoji">${opt.emoji}</span><span class="c-name">${opt.name}</span>`; card.onclick=()=>onP1(opt,card); grid.appendChild(card); });
  setTimeout(playSound, 400);
}
function onP1(opt,card){
  const animals=curAnimals();
  if(opt.id===animals[G.idx].id){ card.classList.add('ok'); addPts(G.firstTry?25:10); G.combo++; feedback('CORRETO! 🎉',true); setTimeout(()=>{setupP2();showSc('p2');},850); }
  else { card.classList.add('ng'); G.firstTry=false; G.combo=0; feedback('TENTE NOVAMENTE! 🤔',false); setTimeout(()=>card.classList.remove('ng'),600); }
}

// ========= FASE 2 — SOMBRA =========
function setupP2(){
  const a=curAnimals(); const animal=a[G.idx]; document.getElementById('shadow-anim').textContent=animal.emoji;
  const others=a.filter((_,j)=>j!==G.idx); const opts=shuffle([animal,...shuffle(others).slice(0,3)]);
  const grid=document.getElementById('p2grid'); grid.innerHTML='';
  opts.forEach(opt=>{ const card=document.createElement('div'); card.className='p2card'; card.style.background=opt.color; card.innerHTML=`<span class="c-emoji">${opt.emoji}</span><span class="c-name">${opt.name}</span>`; card.onclick=()=>onP2(opt,card); grid.appendChild(card); });
}
function onP2(opt,card){
  const animals=curAnimals();
  if(opt.id===animals[G.idx].id){ card.classList.add('ok'); addPts(G.firstTry?20:10); G.combo++; feedback('INCRÍVEL! 🌟',true); setTimeout(()=>{setupP3();showSc('p3');},850); }
  else { card.classList.add('ng'); G.firstTry=false; G.combo=0; feedback('NÃO É ESSE! 🤔',false); setTimeout(()=>card.classList.remove('ng'),600); }
}

// ========= FASE 3 — BIOMA =========
function setupP3(){
  const animal=curAnimals()[G.idx]; G.p3tries=0; document.getElementById('hintbtn').classList.remove('show');
  const card=document.getElementById('p3card'); card.querySelector('.c-emoji').textContent=animal.emoji; card.querySelector('.c-name').textContent=animal.name;
  const grid=document.getElementById('biogrid'); grid.innerHTML='';
  Object.values(curBiomes()).forEach(b=>{ const div=document.createElement('div'); div.className=`bdrop ${b.cssClass}`; div.dataset.bio=b.id; div.innerHTML=`<span class="b-icon">${b.icon}</span><span class="b-name">${b.name}</span><span class="b-desc">${b.desc}</span>`; div.ondragover=e=>{e.preventDefault();div.classList.add('over');}; div.ondragleave=()=>div.classList.remove('over'); div.ondrop=e=>{e.preventDefault();div.classList.remove('over');onP3(b.id);}; div.onclick=()=>onP3(b.id); grid.appendChild(div); });
  card.draggable=true; card.ondragstart=e=>{card.classList.add('drag');e.dataTransfer.setData('text','animal');}; card.ondragend=()=>card.classList.remove('drag');
  setupTouchDrag(card);
}
function setupTouchDrag(card){
  const clone=document.getElementById('drag-clone'); const animal=curAnimals()[G.idx];
  clone.querySelector('.c-emoji').textContent=animal.emoji; clone.querySelector('.c-name').textContent=animal.name;
  card.ontouchstart=e=>{ e.preventDefault(); card.classList.add('drag'); clone.style.display='flex'; const t=e.touches[0]; clone.style.left=(t.clientX-50)+'px'; clone.style.top=(t.clientY-50)+'px'; };
  card.ontouchmove=e=>{ e.preventDefault(); const t=e.touches[0]; clone.style.left=(t.clientX-50)+'px'; clone.style.top=(t.clientY-50)+'px'; };
  card.ontouchend=e=>{ e.preventDefault(); card.classList.remove('drag'); clone.style.display='none'; const t=e.changedTouches[0]; const els=document.elementsFromPoint(t.clientX,t.clientY); const target=els.find(el=>el.classList.contains('bdrop')); if(target) onP3(target.dataset.bio); };
}
function onP3(bioId){
  const animal=curAnimals()[G.idx]; const correct=bioId===animal.biome; const bDiv=document.querySelector(`.bdrop[data-bio="${bioId}"]`); if(!bDiv) return;
  if(correct){ bDiv.classList.add('cflsh'); const pl=document.createElement('div'); pl.className='bdrop-placed'; pl.textContent=animal.emoji; bDiv.appendChild(pl); addPts(G.p3tries===0?30:15); G.combo++; feedback('BIOMA CERTO! 🌿',true); setTimeout(()=>{setupP4();showSc('p4');},1100); }
  else { G.p3tries++; G.firstTry=false; G.combo=0; bDiv.classList.add('wflsh'); feedback('ESSE NÃO É O LUGAR! 🤔',false); setTimeout(()=>bDiv.classList.remove('wflsh'),600); if(G.p3tries>=1) document.getElementById('hintbtn').classList.add('show'); }
}
function showHint(){
  const animal=curAnimals()[G.idx]; const biome=curBiomes()[animal.biome]; const bDiv=document.querySelector(`.bdrop[data-bio="${animal.biome}"]`);
  if(bDiv){ const arr=document.createElement('div'); arr.className='hint-arrow'; arr.textContent='⬆ AQUI!'; bDiv.appendChild(arr); }
  feedback('💡 '+biome.hint,true);
}

// ========= FASE 4 — CELEBRAÇÃO =========
function setupP4(){
  const animal=curAnimals()[G.idx]; const done=curDone();
  document.getElementById('p4ring').textContent=animal.emoji;
  document.getElementById('p4name').textContent=animal.name;
  document.getElementById('p4fact').textContent=animal.fact;
  addPts(30); if(!done.includes(G.idx)){ done.push(G.idx); save(); }
  const cw=document.getElementById('confwrap'); cw.innerHTML='';
  const emojis=['🎉','🎊','⭐','🌟','🎈','🦜','🐵','🐆','🦤','🏆','✨','🌿','🌊','🐢','🦁'];
  for(let i=0;i<28;i++){ const p=document.createElement('div'); p.style.cssText=`position:absolute;top:-60px;left:${Math.random()*100}%;font-size:${14+Math.random()*18}px;animation:conffall ${2+Math.random()*3}s ${Math.random()*2}s linear infinite`; p.textContent=emojis[i%emojis.length]; cw.appendChild(p); }

  const btn=document.getElementById('p4btn'); const animals=curAnimals(); const allDone=done.length>=animals.length;
  if(allDone && G.world===1){ btn.textContent='🌊 IR AO MUNDO 2!'; btn.className='pbtn pbtn-cyan'; btn.onclick=()=>{ buildPortals(1); showW2Unlock(); }; }
  else if(allDone && G.world===2){ btn.textContent='🏆 ZEROU O JOGO!'; btn.className='pbtn pbtn-gold'; btn.onclick=()=>{ buildPortals(2); showSc('map2'); }; }
  else { btn.textContent='PRÓXIMO ANIMAL ▶'; btn.className='pbtn pbtn-green'; btn.onclick=nextAnimal; }
}
function nextAnimal(){ stopAnimalAudio(); buildPortals(G.world); showSc(curMapSc()); drawMini(G.world); updateHUD(); }

// ========= TRANSIÇÕES DE MUNDO =========
function showW2Unlock(){ document.getElementById('w2-unlock').classList.add('show'); }
function enterWorld2(){
  document.getElementById('w2-unlock').classList.remove('show');
  G.world=2; applyWorldSize(2);
  G.vx=0; G.vy=0;
  buildPortals(2); positionPlayer(2); snapCamera(2,true); drawMini(2); updateHUD(); showSc('map2'); feedback('🌊 BEM-VINDO AO MUNDO 2!',true);
}
function backToWorld1(){
  G.world=1; applyWorldSize(1);
  G.vx=0; G.vy=0;
  buildPortals(1); positionPlayer(1); snapCamera(1,true); drawMini(1); showSc('map'); feedback('🌿 DE VOLTA AO MUNDO 1!',true);
}

// ========= TECLADO =========
document.addEventListener('keydown',e=>{
  G.keys[e.key]=true;
  if(G.screen==='map'||G.screen==='map2'){
    if(e.key==='e'||e.key==='E'||e.key==='Enter'){
      const done=curDone(); const px=curPX(), py=curPY();
      curPortals().forEach((pos,i)=>{ const dist=Math.hypot(px-pos.x,py-pos.y); const ulk=(i===0)||done.includes(i-1); if(dist<110&&ulk&&!done.includes(i)) enterLevel(i); });
      const tree=curTree(); const td=Math.hypot(px-tree.x,py-tree.y); if(td<140&&(G.world===2||done.length>=curAnimals().length)){ if(G.world===1) showW2Unlock(); else backToWorld1(); }
    }
    if(e.key==='Escape'){ document.getElementById('helpmdf1').classList.remove('open'); document.getElementById('helpmdf2').classList.remove('open'); }
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)) e.preventDefault();
  }
});
document.addEventListener('keyup',e=>{ G.keys[e.key]=false; });

// ========= TOUCH — MOVER NO MAPA =========
function addTouchMove(vpId,w){
  const vp=document.getElementById(vpId); if(!vp) return;
  vp.addEventListener('touchstart',e=>{ const t=e.touches[0]; G._tsx=t.clientX; G._tsy=t.clientY; },{passive:true});
  vp.addEventListener('touchmove',e=>{
    const t=e.touches[0];
    const dx=(t.clientX-G._tsx)*.45, dy=(t.clientY-G._tsy)*.45;
    G._tsx=t.clientX; G._tsy=t.clientY;
    const dim=MAP_DIM[w]||{w:WW,h:WH};
    if(w===1){
      G.px1=Math.max(40,Math.min(dim.w-40,G.px1+dx));
      G.py1=Math.max(80,Math.min(dim.h-40,G.py1+dy));
    } else {
      G.px2=Math.max(40,Math.min(dim.w-40,G.px2+dx));
      G.py2=Math.max(80,Math.min(dim.h-40,G.py2+dy));
    }
    const pl=document.getElementById(w===1?'player':'player2');
    const px=w===1?G.px1:G.px2, py=w===1?G.py1:G.py2;
    pl.style.left=px+'px'; pl.style.top=py+'px';
    setPlayerMotion(pl,dx,dy,true);
    snapCamera(w); drawMini(w); checkNear();
  },{passive:true});
  vp.addEventListener('touchend',()=>{ setPlayerMotion(document.getElementById(w===1?'player':'player2'),0,0,false); },{passive:true});
}

// ========= MODAL AJUDA =========
function toggleHelp(w){ document.getElementById('helpmdf'+w).classList.toggle('open'); }

// ========= BACK BUTTON =========
document.getElementById('backbtn').onclick=()=>{ stopAnimalAudio(); buildPortals(G.world); showSc(curMapSc()); };

// ========= UTILS =========
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

// ========= WORLD SIZE (ajuste à imagem real) =========
function getEmbeddedMapUrl(w){
  const el=document.getElementById(w===1?'map1-data':'map2-data');
  const data=(el?.textContent||'').trim();
  if(data && data.startsWith('data:image/')) return data;
  return w===1 ? 'assets/images/mapainicial.png' : 'assets/images/mapacima.png';
}

function applyWorldSize(w){
  const id = w===1 ? 'world' : 'world2';
  const portalsId = w===1 ? 'portals' : 'portals2';
  const url = getEmbeddedMapUrl(w);
  const img = new Image();
  img.onload = ()=>{
    const wd=document.getElementById(id); const pd=document.getElementById(portalsId);
    const wpx=img.naturalWidth||1402; const hpx=img.naturalHeight||1122;
    wd.style.width = wpx+'px'; wd.style.height = hpx+'px';
    wd.style.backgroundImage = `url("${url}")`;
    wd.style.backgroundSize = wpx+'px '+hpx+'px';
    pd.style.width = wpx+'px'; pd.style.height = hpx+'px';
    MAP_DIM[w]={w:wpx,h:hpx};
    // Reenquadrar câmera e minimapa quando a imagem carrega
    snapCamera(w,true); drawMini(w);
  };
  img.src = url;
}

// ========= INIT =========
window.addEventListener('DOMContentLoaded',()=>{
  load(); buildIntroBG();
  document.getElementById('mutebtn').style.display='none';
  document.getElementById('backbtn').style.display='none';
  if(G.done1.length>0||G.done2.length>0){ document.getElementById('btn-continue').style.display='block'; }
  addTouchMove('vp1',1); addTouchMove('vp2',2);
  document.addEventListener('contextmenu',e=>e.preventDefault());
  window.addEventListener('resize',()=>{ if(G.screen==='map') snapCamera(1); if(G.screen==='map2') snapCamera(2); });
  // Preparar tamanhos de mundo ao abrir
  applyWorldSize(1); applyWorldSize(2);
});
