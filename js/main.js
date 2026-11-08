const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2600)}
/* ---- configurable links ---- */
function link(el,u,msg){el.href=u;if(u==='#')el.addEventListener('click',e=>{e.preventDefault();toast(msg)});else{el.target='_blank';el.rel='noopener'}}
link($('#resume'),CONFIG.resume,'Resume not added yet: set CONFIG.resume');link($('#paper'),CONFIG.paper,'Research PDF not added yet: set CONFIG.paper');
$$('.soc').forEach(a=>link(a,CONFIG[a.dataset.k],a.textContent+' link not set yet: edit CONFIG'));
function fill(el,u){if(el&&u){const i=new Image();i.src=u;i.alt='';el.textContent='';el.appendChild(i)}}
fill($('#ph>div'),CONFIG.heroPhoto||CONFIG.photo);fill($('#about [data-slot]>div'),CONFIG.photo);fill($('#kl'),CONFIG.kaamLogo);
/* ---- sound (generated live with WebAudio, no files) ---- */
let AC,on=false,amb,ag;
function ac(){AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC}
function tone(f,t,d,ty,v,f2){const a=ac(),n=a.currentTime+t,o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(.0001,n);g.gain.linearRampToValueAtTime(v,n+.02);g.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(g).connect(a.destination);o.start(n);o.stop(n+d+.05)}
function noise(t,d,v,hz){const a=ac(),n=a.currentTime+t,b=a.createBuffer(1,a.sampleRate*d,a.sampleRate),x=b.getChannelData(0);for(let i=0;i<x.length;i++)x[i]=(Math.random()*2-1)*(1-i/x.length);const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=b;f.type='highpass';f.frequency.value=hz;g.gain.value=v;s.connect(f).connect(g).connect(a.destination);s.start(n)}
const S={click(){on&&tone(1900,0,.06,'square',.025,800)},crackle(){if(!on)return;for(let i=0;i<4;i++)noise(i*.07,.05,.12,3500)},boot(){if(!on)return;tone(50,0,1.8,'sawtooth',.05,120);tone(600,.2,.5,'sine',.03,1200)},
enter(){if(!on)return;tone(70,0,2,'sawtooth',.1,35);tone(180,0,1.3,'sawtooth',.06,2000);noise(0,1,.25,1200);noise(.3,.6,.15,4000);tone(880,.6,1.4,'sine',.05)}};
$('#snd').onclick=()=>{on=!on;$('#snd').textContent='Sound: '+(on?'on':'off');$('#snd').classList.toggle('on',on);$('#snd').setAttribute('aria-pressed',on);if(on){ac();S.click()}};
/* ---- film intro: hard cuts on the beat ---- */
S.kick=()=>{if(on){tone(150,0,.2,'sine',.45,38);noise(0,.02,.12,2500)}};S.sub=f=>on&&tone(f,0,.42,'sine',.36,f*.9);S.bell=f=>{if(on){tone(f,0,.35,'triangle',.05);tone(f*2,0,.2,'sine',.02)}};S.ohat=()=>on&&noise(0,.09,.1,7000);S.crash=()=>on&&noise(0,.9,.12,5000);S.stab=f=>{if(on){tone(f,0,.13,'sawtooth',.03);tone(f*1.189,0,.13,'sawtooth',.03);tone(f*1.498,0,.13,'sawtooth',.03)}};const ROOT3=[55,55,65.4,49];const ROOT2=[41.2,41.2,49,36.7],BELL=[659.3,587.3,493.9,440,392,329.6,392,440];S.hat=v=>on&&noise(0,.03,v||.05,8000);S.clap=()=>{if(on){noise(0,.12,.2,1800);tone(200,0,.07,'triangle',.05)}};S.snare=()=>on&&noise(0,.09,.12,2500);
S.bass=f=>on&&tone(f,0,.09,'sawtooth',.06,f*.96);S.arp=f=>on&&tone(f,0,.09,'square',.016);S.riser=()=>{if(on){noise(0,1.7,.12,3000);tone(200,0,1.7,'sawtooth',.04,1800)}};S.hit=()=>{if(on){tone(70,0,1,'sawtooth',.11,30);noise(0,.4,.22,1400)}};
const ROOT=[55,55,49,43.65],ARP=[220,330,262,392,330,440,392,523];
/* [beats, big text, theme k/w, small line, hit]. Total beats are stretched to CONFIG.introSeconds */
const CARDS=[[2,'WHO','w'],[2,'IS ADEN?','k'],[2,'ADEN','k','',1],[2,'MALIK','w'],[2,'JUDGE','k','Atal Innovation Mission · NITI Aayog'],[2,'AIR 37','w','International Entrepreneur Olympiad · IIT Bombay'],[2,'4× WINNER','k','Atal Innovation Mission'],[2,'TOP 3','w','Pitching competition · DCRUST'],[2,'WHITE PAPER','k','India’s DPDP Act, 2023 &amp; media houses'],[2,'BUILDER','w','Kaam Book · shipped'],[2,'INTERN','k','Good Young Innovator · Scaler School of Technology'],[2,'CONTENT','w','Media-agency internship · 2025'],
[1,'LEADER','k','Leading ideas into action',1],[1,'COMMUNICATOR','w','Making complex ideas clear'],[1,'RESEARCHER','k','Policy, privacy and the press'],[1,'INNOVATOR','w','Judge at Atal Innovation Mission'],[1,'SPEAKER','k','On stage and in the room'],[1,'THINKER','w','Curious, critical, always asking why'],[1,'BUILDER','k','Shipping real prototypes'],[1,'POLICY MIND','w','Where technology meets governance'],
[.5,'B.TECH','k'],[.5,'CS','w'],[.5,'&amp; AI','k'],[.5,'NEWTON','w'],[.5,'SCHOOL','k'],[.5,'OF TECH','w'],
[1,'DPDP ACT','k','Data protection × journalism',1],[1,'KAAM BOOK','w','Har Site Ka Digital Register'],[1,'NITI AAYOG','k','Atal Innovation Mission'],[1,'IIT BOMBAY','w','Entrepreneur Olympiad · AIR 37'],[2,'RADDIWALLAH','k','Launching soon · cardboard circular economy',1],[2,'LAUNCHING SOON','w','Reducing cardboard waste'],[.5,'RECYCLE','k'],[.5,'REUSE','w'],[.5,'REDUCE','k'],[.5,'REPEAT','w'],
[.5,'POLICY','k'],[.5,'TECH','w'],[.5,'IDEAS','k'],[.5,'IMPACT','w'],[.5,'POLICY','k'],[.5,'TECH','w'],[.5,'IDEAS','k'],[.5,'IMPACT','w'],
[2,'LEADERSHIP','k'],[2,'COMMUNICATION','w'],[2,'PUBLIC SPEAKING','k'],[2,'PITCHING','w'],[3,'I turn ideas<br>into impact.','k','',1],[6,'Building Ideas.<br>Exploring Technology.<br>Shaping Impact.','w'],[0,'','k']];
const BEATS=CARDS.reduce((a,c)=>a+c[0],0),TOTAL=CONFIG.introSeconds,BT=TOTAL/BEATS;
let done=false,TM=[],tick,t0,MA;
const cd=$('#cd'),cdb=cd.querySelector('b'),cds=cd.querySelector('small'),fl=$('#fl'),F=$('#film');
function card(i){const c=CARDS[i];F.style.setProperty('--h',(i*53+20)%360);fl.classList.remove('f');void fl.offsetWidth;fl.classList.add('f');if(i===CARDS.length-1){clearInterval(tick);cd.style.display='none';$('#stage').classList.add('on');$('#ent').classList.add('on');S.hit();return}
startScene(i);const L=c[1].replace(/<[^>]+>/g,'').length;cd.className=c[2]==='w'?'w':'';cd.classList.toggle('sm',L>12);cd.classList.toggle('md',L>8&&L<=12);cdb.innerHTML=c[1];cds.innerHTML=c[3]||'';cdb.style.animation='none';void cdb.offsetWidth;cdb.style.animation='';if(c[4])S.hit()}
const bump=()=>{F.classList.remove('bp');void F.offsetWidth;F.classList.add('bp')};
/* ---- coding, CS and pattern scenes drawn behind every card ---- */
const VC=document.createElement('canvas'),vx=VC.getContext('2d');VC.id='vis';cd.prepend(VC);
let VW=1,VH=1,vt=0,vs=0,H=20,LT=false,RW=[],sortS=[],sI=0,sJ=0;
const CODE=['def judge(ideas):','    impact = analyze(ideas)','    return impact * action','policy = parse("DPDP_Act_2023")','while learning: build()','for site in construction_sites:','    register.digital(site)','class Aden(Innovator):','    skills = ["python", "html", "ai"]','if idea.worth_exploring:','    ship("Kaam Book")','git commit -m "impact"','await pitch(top3)','SELECT impact FROM ideas;','const future = build(ideas);','// O(n log n), never O(n²)'];
const CAP=['BINARY STREAM','aden.py','BUBBLE SORT · O(n²)','BINARY TREE · BFS','NEURAL NETWORK','PHYLLOTAXIS','WAVE FIELD','NESTED POLYGONS'];
const col=(a,o)=>LT?'rgba(7,6,10,'+a+')':'hsla('+((H+(o||0))%360)+',100%,'+(o?70:62)+'%,'+a+')';
function vr(){VW=VC.width=cd.clientWidth||innerWidth;VH=VC.height=cd.clientHeight||innerHeight}addEventListener('resize',vr);
function startScene(i){vs=i%8;vt=performance.now();H=(i*53+20)%360;LT=CARDS[i][2]==='w';vr();sortS=Array.from({length:26},(_,k)=>k+1).sort(()=>Math.random()-.5);sI=sJ=0;RW=Array.from({length:Math.ceil(VW/22)},()=>Math.random()*VH)}
const FS=[
e=>{vx.font='16px ui-monospace,monospace';RW.forEach((y,k)=>{RW[k]=y>VH+250?-Math.random()*200:y+2+k%5;for(let j=0;j<12;j++){vx.fillStyle=col((1-j/12)*.6,j?0:160);vx.fillText(Math.random()<.5?'0':'1',k*22,RW[k]-j*18)}})},
e=>{vx.font='15px ui-monospace,monospace';let n=Math.floor(e*70);const o=(vs*3)%CODE.length;for(let li=0;li<14&&n>0;li++){const t=CODE[(o+li)%CODE.length],p=t.slice(0,n);n-=t.length;vx.fillStyle=col(.6,li%2?160:0);vx.fillText(p+(n<=0?'█':''),VW*.08,VH*.22+li*24)}},
e=>{const L=sortS.length,w=VW*.8/L;for(let k=0;k<3;k++){if(sortS[sJ]>sortS[sJ+1])[sortS[sJ],sortS[sJ+1]]=[sortS[sJ+1],sortS[sJ]];sJ++;if(sJ>=L-1-sI){sJ=0;sI++}if(sI>=L-1){sortS.sort(()=>Math.random()-.5);sI=sJ=0}}sortS.forEach((v,k)=>{const h=v/L*VH*.5,on=k===sJ||k===sJ+1;vx.fillStyle=on?col(.95,160):col(.45,k*5);vx.fillRect(VW*.1+k*w,VH*.82-h,w-4,h)})},
e=>{const hi=Math.floor(e*8)%15,P=i=>{const l=Math.floor(Math.log2(i+1)),k=i+1-(1<<l);return[VW*(2*k+1)/(1<<(l+1)),VH*(.2+l*.15)]};for(let i=1;i<15;i++){const a=P(i),b=P((i-1)>>1);vx.strokeStyle=col(.3);vx.beginPath();vx.moveTo(a[0],a[1]);vx.lineTo(b[0],b[1]);vx.stroke()}for(let i=0;i<15;i++){const a=P(i);vx.fillStyle=i===hi?col(1,160):col(.5,i*14);vx.beginPath();vx.arc(a[0],a[1],i===hi?16:10,0,6.3);vx.fill()}},
e=>{const Ls=[3,6,6,2],X=l=>VW*(.2+l*.2),Y=(l,k)=>VH*(.5+(k-(Ls[l]-1)/2)*.1),ph=Math.floor(e*3);for(let l=0;l<3;l++)for(let a=0;a<Ls[l];a++)for(let b=0;b<Ls[l+1];b++){vx.strokeStyle=col(.12);vx.beginPath();vx.moveTo(X(l),Y(l,a));vx.lineTo(X(l+1),Y(l+1,b));vx.stroke();if((a+b+l)%3===ph%3){const p=(e*1.6)%1;vx.fillStyle=col(.95,160);vx.beginPath();vx.arc(X(l)+(X(l+1)-X(l))*p,Y(l,a)+(Y(l+1,b)-Y(l,a))*p,3.5,0,6.3);vx.fill()}}Ls.forEach((n,l)=>{for(let k=0;k<n;k++){vx.fillStyle=col(.8,l*40);vx.beginPath();vx.arc(X(l),Y(l,k),9,0,6.3);vx.fill()}})},
e=>{const c=Math.min(VW,VH)/38;for(let k=1;k<520;k++){const r=c*Math.sqrt(k),a=k*2.39996+e*.25;vx.fillStyle=col(.7,k*.35);vx.beginPath();vx.arc(VW/2+Math.cos(a)*r,VH/2+Math.sin(a)*r,1+k/170,0,6.3);vx.fill()}},
e=>{const cx=44,cy=26;for(let i=0;i<cx;i++)for(let j=0;j<cy;j++){const x=VW*(i+.5)/cx,y=VH*(j+.5)/cy,d=Math.hypot(x-VW/2,y-VH/2),r=2+2.6*Math.sin(d/38-e*3.2);vx.fillStyle=col(.55,d*.2);vx.beginPath();vx.arc(x,y,Math.max(.4,r),0,6.3);vx.fill()}},
e=>{const sd=vs%2?6:4,m=Math.min(VW,VH);for(let k=1;k<18;k++){const R=k*m*.032,rot=e*.5+k*.13;vx.strokeStyle=col(.5,k*14);vx.lineWidth=1.5;vx.beginPath();for(let q=0;q<=sd;q++){const a=rot+q*6.2832/sd;vx[q?'lineTo':'moveTo'](VW/2+Math.cos(a)*R,VH/2+Math.sin(a)*R)}vx.stroke()}}];
function vdraw(){if(done||cd.style.display==='none')return;vx.clearRect(0,0,VW,VH);FS[vs]((performance.now()-vt)/1000);vx.font='600 12px ui-monospace,monospace';vx.fillStyle=col(.85);vx.fillText('// '+CAP[vs],VW*.06,VH*.84);requestAnimationFrame(vdraw)}

function step(n){const b=n/4,s=n%16,bar=n>>4,k=s%4===0;
if(b<4){if(n===0)S.riser();if(b>=3&&s%2===0)S.snare();if(k&&b>=2)S.kick();if(b===3&&s===12)bump()}
else{if(k||(s===10&&bar%2)){S.kick();bump()}
if(s===4||s===12)S.clap();
if(s%4===2)S.ohat();else if(!k)S.hat(s%2?.05:.03);
if(!k&&s!==4&&s!==12)S.bass(ROOT3[bar%4]*[1,2,1,1,2,1,4,2][s%8]);
if(bar%4===3&&s>=8&&s%2===0)S.snare();
if(bar%4===0&&s===0&&b>=8)S.crash();
if(b>=8&&(s===6||s===14))S.stab(ROOT3[bar%4]*4);
if(b>=16&&s%2===0)S.bell(BELL[((n>>1)+bar)%BELL.length]*(bar%8>3?2:1))}}
function film(snd){on=snd;$('#snd').textContent='Sound: '+(on?'on':'off');$('#snd').classList.toggle('on',on);$('#snd').setAttribute('aria-pressed',on);if(on)ac();$('#gate').style.display='none';F.classList.add('on');t0=performance.now();
if(RM){card(CARDS.length-1);return}
if(on&&CONFIG.music){MA=new Audio(CONFIG.music);MA.addEventListener('loadedmetadata',()=>{MA.currentTime=CONFIG.musicStart||0;MA.play().catch(()=>{})});MA.load()}
let at=0;CARDS.forEach((c,i)=>{TM.push(setTimeout(()=>card(i),at*1000));at+=c[0]*BT});
if(!CONFIG.music){let n=0;const q=BT*250;tick=setInterval(()=>{const e=performance.now()-t0;if(e-n*q>1000)n=Math.floor(e/q);while(e>=n*q)step(n++)},20)}
vr();vdraw();(function r(){if(done)return;const e=(performance.now()-t0)/1000;$('#tc').textContent='● REC 00:'+String(Math.floor(e)).padStart(2,'0')+':'+String(Math.floor(e%1*30)).padStart(2,'0');$('#pg i').style.width=Math.min(100,e/TOTAL*100)+'%';requestAnimationFrame(r)})()}
async function enter(fast){if(done)return;done=true;TM.forEach(clearTimeout);clearInterval(tick);const i=$('#intro');$('#skip').remove();if(MA){const m=MA,iv=setInterval(()=>{m.volume=Math.max(0,m.volume-.12);if(m.volume<=0){m.pause();clearInterval(iv)}},60)}if(!fast){S.hit();fl.style.opacity=1;i.classList.add('go');await sleep(700)}i.remove();document.body.classList.add('ent');reveal();scrollTo(0,0)}
if(CONFIG.portrait)$('#cut').src=CONFIG.portrait;$$('.shot>div').forEach((d,i)=>fill(d,CONFIG.ach[i]));
$('#stage').addEventListener('pointermove',e=>{$('#stage').style.setProperty('--px',(e.clientX/innerWidth-.5)*2);$('#stage').style.setProperty('--py',(e.clientY/innerHeight-.5)*2)});
$('#pl1').onclick=()=>film(true);$('#pl0').onclick=()=>film(false);$('#ent').onclick=()=>enter();$('#skip').onclick=()=>enter(true);addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('on')});
/* ---- cursor ---- */
let cx=-80,cy=-80,rx=-80,ry=-80;addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;document.body.classList.add('cc')});
(function m(){rx+=(cx-rx)*.16;ry+=(cy-ry)*.16;$('#cur').style.transform='translate('+cx+'px,'+cy+'px)';$('#ring').style.transform='translate('+rx+'px,'+ry+'px)';requestAnimationFrame(m)})();
document.addEventListener('pointerover',e=>$('#ring').classList.toggle('h',!!e.target.closest('a,button,[data-slot],.gi,summary,.n')));addEventListener('pointerdown',()=>$('#ring').classList.add('p'));addEventListener('pointerup',()=>$('#ring').classList.remove('p'));
/* ---- smooth stacking cards ---- */
(function st(){const A=$$('.sc');A.forEach((c,i)=>{const nx=A[i+1];if(!nx)return;const t=Math.max(0,Math.min(1,1-(nx.getBoundingClientRect().top-c.getBoundingClientRect().top)/c.offsetHeight));c._p=(c._p||0)+(t-(c._p||0))*.1;const e=c.firstElementChild;e.style.transform='scale('+(1-c._p*.07)+') translateY('+(-c._p*14)+'px)';e.style.setProperty('--d',c._p*.6)});requestAnimationFrame(st)})();
/* ---- reveals & counters ---- */
function cnt(e){if(e.d)return;e.d=1;const t=+e.dataset.n;let v=0;const iv=setInterval(()=>{e.textContent=++v;if(v>=t)clearInterval(iv)},Math.max(25,1100/t))}
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');$$('[data-n]').forEach(n=>t.contains(n)&&cnt(n));io.unobserve(t)}),{threshold:.12});$$('.rv,.rl,.cl').forEach((e,i)=>{e.style.transitionDelay=(i%4)*80+'ms';io.observe(e)});$$('#sk,#contact .rv:last-child').forEach(e=>io.observe(e))}
/* ---- skills graph ---- */
const TECH=['Python','HTML','CSS','JavaScript','AI foundations','CS fundamentals'],PRO=['Public policy research','Policy impact analysis','Research writing','Critical thinking','Communication','Leadership','Public speaking','Pitching','Team collaboration','Problem solving'];
let h='';[[TECH,110,'t'],[PRO,235,'p']].forEach(([a,r,k])=>a.forEach((s,i)=>{const t=i/a.length*6.283-1.57,x=320+Math.cos(t)*r,y=320+Math.sin(t)*r;h+='<line x1="320" y1="320" x2="'+x+'" y2="'+y+'" pathLength="1"/>'}));
h+='<circle cx="320" cy="320" r="26" fill="#0f0f17" stroke="#ff5a36" stroke-width="2"/><text x="320" y="325" text-anchor="middle" style="font-size:11px;font-weight:700">ADEN</text>';
[[TECH,110,'t'],[PRO,235,'p']].forEach(([a,r,k])=>a.forEach((s,i)=>{const t=i/a.length*6.283-1.57,x=320+Math.cos(t)*r,y=320+Math.sin(t)*r,cs=Math.cos(t),an=Math.abs(cs)<.25?'middle':cs>0?'start':'end',ty=Math.abs(cs)<.25?(Math.sin(t)>0?22:-14):4,tx=Math.abs(cs)<.25?0:(cs>0?14:-14);h+='<g class="n '+k+'" data-k="'+k+'" data-s="'+s+'" tabindex="0"><circle cx="'+x+'" cy="'+y+'" r="6"/><text x="'+(x+tx)+'" y="'+(y+ty)+'" text-anchor="'+an+'">'+s+'</text></g>'}));
$('#svg').innerHTML=h;
$$('#svg g.n').forEach(g=>{const f=()=>{$$('#svg g.n').forEach(n=>n.classList.remove('a'));g.classList.add('a');S.click();$('#info').innerHTML='<b>'+g.dataset.s+'</b><br>'+(g.dataset.k==='t'?'Currently learning and building with this. Not claiming expertise yet.':'A skill I keep developing through judging, pitching, research and teamwork.')};g.addEventListener('pointerenter',f);g.addEventListener('click',f);g.addEventListener('focus',f)});
/* ---- gallery, lightbox, photo upload ---- */
const GL=['Professional portrait','Innovation events','Pitching competitions','Public-speaking moments','Campus life','Research & work environment'];

let cur,pk=$('#pick');
function lb(el){cur=el;const b=$('#lbx'),im=el.querySelector('img');b.innerHTML=im?'<img src="'+im.src+'" alt="">':'Placeholder: '+(el.querySelector('span')||{textContent:'Photo'}).textContent;$('#lb').classList.add('on')}
const og=g=>g.querySelector('img')?lb(g):(cur=g,pk.click());$$('.gi').forEach(g=>{g.addEventListener('click',()=>og(g));g.addEventListener('keydown',e=>e.key==='Enter'&&og(g))});
$$('[data-slot]').forEach(s=>s.addEventListener('click',()=>{cur=s.firstElementChild||s;pk.click()}));
$('#lbc').onclick=()=>$('#lb').classList.remove('on');$('#lbr').onclick=()=>pk.click();
pk.onchange=()=>{const f=pk.files[0];if(!f)return;const u=URL.createObjectURL(f);if(cur.classList.contains('gi')){const ad=cur.querySelector('.add');if(ad)ad.remove();let i=cur.querySelector('img');if(!i){i=new Image();cur.prepend(i)}i.src=u;$('#lbx').innerHTML='<img src="'+u+'" alt="">'}else{cur.textContent='';const i=new Image();i.src=u;cur.appendChild(i)}pk.value='';toast('Photo added as a preview. Send me the files to publish them permanently.')};
/* ---- scroll fx ---- */
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.width=scrollY/h*100+'%';$$('.gi').forEach((g,i)=>{const r=g.getBoundingClientRect();g.style.translate='0 '+((r.top-H/2)*(i%2?-.05:.05))+'px'})},{passive:true});
$('#snd').style.display='';
/* ---- scroll-shifting dark palettes: [accent1, accent2, glow3, background] ---- */
const PAL={hero:[[255,90,54],[255,180,58],[255,60,120],[10,6,6]],about:[[168,85,247],[236,72,153],[255,90,54],[12,6,18]],wins:[[34,211,238],[59,130,246],[168,85,247],[5,10,18]],research:[[99,102,241],[56,189,248],[236,72,153],[6,7,20]],work:[[16,185,129],[132,204,22],[34,211,238],[5,14,10]],skills:[[236,72,153],[168,85,247],[251,191,36],[16,6,14]],beyond:[[251,191,36],[249,115,22],[239,68,68],[16,10,4]],gallery:[[56,189,248],[16,185,129],[168,85,247],[5,12,16]],contact:[[244,63,94],[255,140,50],[168,85,247],[14,5,8]]};
let CU=JSON.parse(JSON.stringify(PAL.hero));const RS=document.documentElement.style,fj=a=>a.map(Math.round).join(',');
(function pl(){let id='hero';$$('main section').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight*.5&&r.bottom>innerHeight*.5)id=e.id});const T=PAL[id]||PAL.hero;CU.forEach((c,i)=>c.forEach((v,j)=>c[j]=v+(T[i][j]-v)*.05));
RS.setProperty('--c1r',fj(CU[0]));RS.setProperty('--c2r',fj(CU[1]));RS.setProperty('--c3r',fj(CU[2]));RS.setProperty('--bgr',fj(CU[3]));requestAnimationFrame(pl)})();

/* ---- footer name fit + working contact buttons ---- */
function fit(){const f=$('#fname');f.style.fontSize='100px';f.style.width='auto';f.style.display='inline-block';const w=f.parentElement.clientWidth-2*parseFloat(getComputedStyle(f.parentElement).paddingLeft);f.style.fontSize=(100*w/f.getBoundingClientRect().width)+'px';f.style.display='block';f.style.width='100%'}
fit();addEventListener('resize',fit);addEventListener('load',fit);document.fonts&&document.fonts.ready.then(fit);
$$('a[href^="mailto:"],a[href^="tel:"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const h=a.getAttribute('href'),v=h.replace(/^(mailto:|tel:)/,'');try{navigator.clipboard.writeText(v)}catch(_){}try{window.top.location.href=h}catch(_){window.open(h,'_blank')}toast(h.startsWith('tel')?'Opening dialer · number copied':'Opening mail · address copied')}));

/* ---- sweet click sound + ripple ---- */
S.pop=()=>{if(on){tone(880,0,.14,'sine',.07,1320);tone(1760,.04,.2,'sine',.035,2093)}};
addEventListener('pointerdown',e=>{S.pop();const r=document.createElement('i');r.className='rpl';r.style.left=e.clientX+'px';r.style.top=e.clientY+'px';document.body.appendChild(r);setTimeout(()=>r.remove(),700)});
$$('.fc').forEach(c=>c.addEventListener('click',()=>c.classList.toggle('flip')));
PAL.startup=[[34,197,94],[251,191,36],[20,184,166],[5,14,10]];

/* ---- research cover: set CONFIG.paperCover, or tap the cover to add it ---- */
const CV=$('.cover');function setCover(u){CV.textContent='';const i=new Image();i.src=u;i.alt='Front page of the white paper';CV.appendChild(i)}
if(CONFIG.paperCover)setCover(CONFIG.paperCover);
CV.addEventListener('click',()=>{cur=CV;pk.click()});
