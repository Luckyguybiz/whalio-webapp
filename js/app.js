/* Whalio Platform - App Logic */
let tg = window.Telegram && window.Telegram.WebApp;
if(tg){tg.ready();tg.expand();}

function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));const el=document.getElementById(id);if(el){el.classList.add('active');window.scrollTo(0,0);}}
function toggleMobileMenu(){document.getElementById('mobileMenu').classList.toggle('open');}
function toggleFaq(btn){btn.parentElement.classList.toggle('open');}

const quizData=[
{type:'gender',q:'SELECT YOUR GENDER',sub:'AI-DRIVEN INCOME GROWTH CHALLENGE',opts:[{t:'FEMALE',i:'👩'},{t:'MALE',i:'👨'}]},
{type:'sel',q:'What is your age?',sub:'We will personalize your AI challenge',opts:['18-24','25-34','35-44','45+']},
{type:'sel',q:'What is your main goal?',sub:'Customize your learning path',opts:['Increase income with AI','Learn AI for career','Start AI business','Personal development']},
{type:'sel',q:'How familiar are you with AI?',sub:'We will match your level',opts:['Complete beginner','Tried ChatGPT','Use AI regularly','AI expert']},
{type:'sel',q:'Which AI tool interests you?',sub:'Explore all tools later',opts:['ChatGPT','Midjourney','DALL-E','Jasper AI','All of them']},
{type:'sel',q:'Daily time available?',sub:'Even 10 min/day helps',opts:['5-10 min','15-30 min','30-60 min','1+ hours']},
{type:'sel',q:'Current income level?',sub:'For relevant AI strategies',opts:['Under $1k/mo','$1k-$3k/mo','$3k-$5k/mo','$5k+/mo']},
{type:'sel',q:'Learning preference?',sub:'We adapt your experience',opts:['Video lessons','Reading','Hands-on practice','Mix of everything']},
{type:'load',q:'Analyzing your answers...',sub:'Creating your personal plan'},
{type:'done',q:'Your plan is ready! 🎉',sub:'Personalized learning path created'}
];
let qs=0,qa={};

function startQuiz(){qs=0;qa={};showPage('app-quiz');renderQ();}
function renderQ(){
const b=document.getElementById('quizBody'),bar=document.getElementById('quizProgressBar'),st=document.getElementById('quizStep');
const d=quizData[qs],tot=quizData.length;
st.textContent=(qs+1)+'/'+tot;bar.style.width=((qs+1)/tot*100)+'%';
if(d.type==='gender'){
b.innerHTML='<div class="quiz-image">🐳</div><h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p><div class="quiz-gender-grid">'+d.opts.map(o=>'<div class="quiz-gender-card" onclick="pickQ(this,\''+o.t+'\')"><div class="gender-icon">'+o.i+'</div><div>'+o.t+'</div></div>').join('')+'</div>';
}else if(d.type==='sel'){
b.innerHTML='<h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p><div class="quiz-options">'+d.opts.map(o=>'<button class="quiz-option" onclick="pickQ(this,\''+o.replace(/'/g,"\\'")+'\')">'+o+'</button>').join('')+'</div>';
}else if(d.type==='load'){
b.innerHTML='<div class="quiz-loading"><div class="spinner"></div><h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p></div>';
setTimeout(()=>{qs++;renderQ();},2500);
}else if(d.type==='done'){
b.innerHTML='<div class="quiz-result"><h2>'+d.q+'</h2><p>'+d.sub+'</p><button class="btn-primary btn-large" onclick="finishQ()">Start Learning ›</button></div>';
}}
function pickQ(el,v){qa[qs]=v;el.parentElement.querySelectorAll('.quiz-option,.quiz-gender-card').forEach(o=>o.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>{qs++;renderQ();},400);}
function quizBack(){if(qs>0){qs--;renderQ();}else showPage('app-landing');}
function finishQ(){localStorage.setItem('whalio_quiz','1');localStorage.setItem('whalio_qa',JSON.stringify(qa));showPage('app-auth');}

function handleLogin(e){e.preventDefault();const em=document.getElementById('loginEmail').value;if(em){localStorage.setItem('whalio_user',JSON.stringify({email:em}));updProfile(em);showPage('app-dashboard');}}
function togglePw(b){const i=b.previousElementSibling;i.type=i.type==='password'?'text':'password';}
function handleLogout(){localStorage.removeItem('whalio_user');showPage('app-landing');}
function updProfile(em){const n=document.getElementById('pName'),e=document.getElementById('pEmail');if(n)n.textContent=em.split('@')[0];if(e)e.textContent=em;}
function showDashTab(t){if(t==='profile')showPage('app-profile');else if(t==='aitools')showPage('app-dashboard');else alert('Coming soon!');}

const mods={chatgpt:{n:'ChatGPT',d:'Master conversational AI',i:'💬'},midjourney:{n:'Midjourney',d:'Create stunning AI art',i:'🎨'},jasper:{n:'Jasper AI',d:'AI-powered writing',i:'✍️'},dalle:{n:'DALL-E',d:'Generate amazing images',i:'🖼️'}};
function openModule(k){const m=mods[k];if(!m)return;document.getElementById('modTitle').textContent=m.n;document.getElementById('modName').textContent=m.n;document.getElementById('modDesc').textContent=m.d;document.getElementById('moduleChat').innerHTML='<div class="chat-empty"><p>No messages yet.</p></div>';showPage('app-module');}
function newChat(){document.getElementById('moduleChat').innerHTML='<div class="chat-empty"><p>No messages yet.</p></div>';document.getElementById('modInput').value='';}
function usePrompt(b){document.getElementById('modInput').value=b.textContent;sendMsg();}
function sendMsg(){const inp=document.getElementById('modInput'),msg=inp.value.trim();if(!msg)return;const c=document.getElementById('moduleChat');if(c.querySelector('.chat-empty'))c.innerHTML='';c.innerHTML+='<div class="chat-msg user"><div class="bubble">'+esc(msg)+'</div></div>';inp.value='';c.scrollTop=c.scrollHeight;setTimeout(()=>{const r=['Great question! AI is transforming how we work.','Here are some ideas to get started!','Try being more specific in your prompts.','Start with basics then explore advanced techniques.','Many users found success combining multiple AI tools.'];c.innerHTML+='<div class="chat-msg bot"><div class="bubble">'+r[Math.floor(Math.random()*r.length)]+'</div></div>';c.scrollTop=c.scrollHeight;},1000);}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

document.addEventListener('DOMContentLoaded',function(){const u=localStorage.getItem('whalio_user');if(u){const d=JSON.parse(u);updProfile(d.email||'');showPage('app-dashboard');}else{showPage('app-landing');}});
