/* Whalio Platform - App Logic v2.0 */
/* Firebase Auth + Firestore + Lessons + Paywall */

let tg = window.Telegram && window.Telegram.WebApp;
if(tg){tg.ready();tg.expand();}

let currentUser = null;
let userProfile = null;
let currentModule = null;
let currentLesson = null;
let currentStep = 0;
let selectedPlan = 'yearly';

// ===== PAGE NAVIGATION =====
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(id);
  if(el) { el.classList.add('active'); window.scrollTo(0,0); }
}

function toggleMobileMenu() { document.getElementById('mobileMenu').classList.toggle('open'); }
function toggleFaq(btn) { btn.parentElement.classList.toggle('open'); }
function togglePw(b) { const i = b.previousElementSibling; i.type = i.type === 'password' ? 'text' : 'password'; }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ===== QUIZ =====
const quizData = [
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
let qs = 0, qa = {};

function startQuiz() { qs = 0; qa = {}; showPage('app-quiz'); renderQ(); }

function renderQ() {
  const b = document.getElementById('quizBody'), bar = document.getElementById('quizProgressBar'), st = document.getElementById('quizStep');
  const d = quizData[qs], tot = quizData.length;
  st.textContent = (qs+1)+'/'+tot; bar.style.width = ((qs+1)/tot*100)+'%';
  if(d.type === 'gender') {
    b.innerHTML = '<div class="quiz-image">🐳</div><h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p><div class="quiz-gender-grid">'+d.opts.map(o=>'<div class="quiz-gender-card" onclick="pickQ(this,\''+o.t+'\')"><div class="gender-icon">'+o.i+'</div><div>'+o.t+'</div></div>').join('')+'</div>';
  } else if(d.type === 'sel') {
    b.innerHTML = '<h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p><div class="quiz-options">'+d.opts.map(o=>'<button class="quiz-option" onclick="pickQ(this,\''+o.replace(/'/g,"\\\'")+'\')">'+o+'</button>').join('')+'</div>';
  } else if(d.type === 'load') {
    b.innerHTML = '<div class="quiz-loading"><div class="spinner"></div><h2>'+d.q+'</h2><p class="quiz-sub">'+d.sub+'</p></div>';
    setTimeout(() => { qs++; renderQ(); }, 2500);
  } else if(d.type === 'done') {
    b.innerHTML = '<div class="quiz-result"><h2>'+d.q+'</h2><p>'+d.sub+'</p><button class="btn-primary btn-large" onclick="finishQ()">Start Learning ›</button></div>';
  }
}

function pickQ(el, v) {
  qa[qs] = v;
  el.parentElement.querySelectorAll('.quiz-option,.quiz-gender-card').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => { qs++; renderQ(); }, 400);
}

function quizBack() { if(qs > 0) { qs--; renderQ(); } else showPage('app-landing'); }

function finishQ() {
  localStorage.setItem('whalio_quiz', '1');
  localStorage.setItem('whalio_qa', JSON.stringify(qa));
  showPage('app-paywall');
}

// ===== PAYWALL =====
function selectPlan(plan) {
  selectedPlan = plan;
  document.getElementById('planMonthly').classList.toggle('selected', plan === 'monthly');
  document.getElementById('planYearly').classList.toggle('selected', plan === 'yearly');
}

function handlePayment() {
  alert('Payment integration coming soon! For now, enjoy free access to introductory lessons.');
  showPage('app-register');
}

function skipPaywall() {
  showPage('app-register');
}

// ===== AUTH - FIREBASE =====
function showAuthError(elemId, msg) {
  const el = document.getElementById(elemId);
  el.textContent = msg; el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const btn = document.getElementById('regBtn');
  btn.textContent = 'Creating...'; btn.disabled = true;

  if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return cred.user.updateProfile({ displayName: name }).then(() => {
          return db.collection('users').doc(cred.user.uid).set({
            name: name, email: email, plan: 'free',
            progress: {}, streak: { current: 0, longest: 0 },
            quizAnswers: qa, createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
      })
      .then(() => { btn.textContent = 'Create Account'; btn.disabled = false; })
      .catch(err => { showAuthError('regError', err.message); btn.textContent = 'Create Account'; btn.disabled = false; });
  } else {
    localStorage.setItem('whalio_user', JSON.stringify({ email, name, plan: 'free', progress: {} }));
    setTimeout(() => { btn.textContent = 'Create Account'; btn.disabled = false; onUserLogin({ email, name }); }, 500);
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const btn = document.getElementById('loginBtn');
  btn.textContent = 'Signing in...'; btn.disabled = true;

  if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => { btn.textContent = 'Sign in'; btn.disabled = false; })
      .catch(err => { showAuthError('authError', err.message); btn.textContent = 'Sign in'; btn.disabled = false; });
  } else {
    localStorage.setItem('whalio_user', JSON.stringify({ email, name: email.split('@')[0], plan: 'free', progress: {} }));
    setTimeout(() => { btn.textContent = 'Sign in'; btn.disabled = false; onUserLogin({ email, name: email.split('@')[0] }); }, 500);
  }
}

function handleForgotPassword(e) {
  e.preventDefault();
  const email = document.getElementById('forgotEmail').value;
  const btn = document.getElementById('forgotBtn');
  const msg = document.getElementById('forgotMsg');
  btn.textContent = 'Sending...'; btn.disabled = true;

  if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    auth.sendPasswordResetEmail(email)
      .then(() => {
        msg.textContent = 'Reset link sent! Check your email.';
        msg.className = 'auth-msg success'; msg.style.display = 'block';
        btn.textContent = 'Send Reset Link'; btn.disabled = false;
      })
      .catch(err => {
        msg.textContent = err.message;
        msg.className = 'auth-msg error'; msg.style.display = 'block';
        btn.textContent = 'Send Reset Link'; btn.disabled = false;
      });
  } else {
    setTimeout(() => {
      msg.textContent = 'Demo mode: In production, a reset email would be sent to ' + email;
      msg.className = 'auth-msg success'; msg.style.display = 'block';
      btn.textContent = 'Send Reset Link'; btn.disabled = false;
    }, 1000);
  }
}

function handleLogout() {
  if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    auth.signOut();
  }
  localStorage.removeItem('whalio_user');
  currentUser = null; userProfile = null;
  showPage('app-landing');
}

// ===== USER SESSION =====
function onUserLogin(profile) {
  userProfile = profile;
  updateDashboard();
  updateProfile();
  showPage('app-dashboard');
}

function updateDashboard() {
  if(!userProfile) return;
  const prog = userProfile.progress || {};
  ['chatgpt','midjourney','jasper','dalle'].forEach(mod => {
    const pct = calcModuleProgress(mod, prog);
    const el = document.getElementById('prog-' + mod);
    if(el) el.textContent = pct + '%';
  });
  const mainProg = calcModuleProgress('chatgpt', prog);
  const dp = document.getElementById('dashProgress');
  if(dp) dp.style.width = mainProg + '%';
}

function updateProfile() {
  if(!userProfile) return;
  const n = document.getElementById('pName');
  const e = document.getElementById('pEmail');
  if(n) n.textContent = userProfile.name || userProfile.email.split('@')[0];
  if(e) e.textContent = userProfile.email;
  const badge = document.getElementById('subscriptionBadge');
  if(badge) {
    if(userProfile.plan === 'premium') {
      badge.textContent = '⭐ Premium'; badge.className = 'sub-badge sub-premium';
    } else {
      badge.textContent = 'Free Plan'; badge.className = 'sub-badge sub-free';
    }
  }
  const prog = userProfile.progress || {};
  ['chatgpt','midjourney','jasper','dalle'].forEach(mod => {
    const pct = calcModuleProgress(mod, prog);
    const el = document.getElementById('cert-' + mod);
    if(el) {
      el.textContent = pct + '%';
      el.className = 'cert-pct' + (pct >= 100 ? ' green' : pct > 0 ? ' blue' : '');
    }
  });
}

function calcModuleProgress(modKey, progress) {
  const modData = LESSONS_DATA[modKey];
  if(!modData) return 0;
  const total = modData.lessons.length;
  let completed = 0;
  modData.lessons.forEach(lesson => {
    if(progress[lesson.id] && progress[lesson.id].completed) completed++;
  });
  return Math.round((completed / total) * 100);
}

// ===== MODULE & LESSONS =====
function openModule(modKey) {
  currentModule = modKey;
  const mod = LESSONS_DATA[modKey];
  if(!mod) return;
  document.getElementById('modTitle').textContent = mod.name;
  const prog = (userProfile && userProfile.progress) || {};
  const completed = mod.lessons.filter(l => prog[l.id] && prog[l.id].completed).length;
  document.getElementById('modProgressText').textContent = completed + '/' + mod.lessons.length;
  const list = document.getElementById('moduleLessonsList');
  list.innerHTML = mod.lessons.map((lesson, i) => {
    const done = prog[lesson.id] && prog[lesson.id].completed;
    const locked = !lesson.free && (!userProfile || userProfile.plan !== 'premium');
    return '<div class="lesson-card' + (done ? ' done' : '') + (locked ? ' locked' : '') + '" onclick="openLesson(\''+lesson.id+'\', '+i+')">' +
      '<div class="lesson-num">' + (done ? '✓' : locked ? '🔒' : (i+1)) + '</div>' +
      '<div class="lesson-info"><h3>' + lesson.title + '</h3><p>' + lesson.steps.length + ' steps</p></div>' +
      '<div class="lesson-arrow">→</div></div>';
  }).join('');
  showPage('app-module');
}

function openLesson(lessonId, index) {
  const mod = LESSONS_DATA[currentModule];
  const lesson = mod.lessons[index];
  if(!lesson.free && (!userProfile || userProfile.plan !== 'premium')) {
    showPage('app-paywall');
    return;
  }
  currentLesson = lesson;
  currentStep = 0;
  renderLessonStep();
  showPage('app-lesson');
}

function renderLessonStep() {
  if(!currentLesson) return;
  const step = currentLesson.steps[currentStep];
  const total = currentLesson.steps.length;
  document.getElementById('lessonTitle').textContent = currentLesson.title;
  document.getElementById('lessonStep').textContent = (currentStep+1) + '/' + total;
  document.getElementById('lessonProgressBar').style.width = ((currentStep+1)/total*100) + '%';
  const content = document.getElementById('lessonContent');
  if(step.type === 'quiz') {
    content.innerHTML = step.content + '<div class="quiz-options">' +
      step.options.map((o, i) => '<button class="quiz-option" onclick="answerQuiz('+i+','+step.correct+',this)">'+o+'</button>').join('') +
      '</div><div id="quizFeedback"></div>';
  } else {
    content.innerHTML = step.content;
  }
  document.getElementById('lessonPrev').style.display = currentStep > 0 ? 'block' : 'none';
  document.getElementById('lessonNext').textContent = currentStep >= total - 1 ? 'Complete ✓' : 'Next →';
}

function answerQuiz(selected, correct, el) {
  const options = el.parentElement.querySelectorAll('.quiz-option');
  options.forEach((o, i) => {
    o.classList.remove('correct', 'wrong');
    if(i === correct) o.classList.add('correct');
    if(i === selected && selected !== correct) o.classList.add('wrong');
    o.onclick = null;
  });
  const fb = document.getElementById('quizFeedback');
  fb.innerHTML = selected === correct ?
    '<p class="feedback-correct">✓ Correct! Great job!</p>' :
    '<p class="feedback-wrong">✗ Not quite. The correct answer is highlighted.</p>';
}

function nextLessonStep() {
  if(currentStep >= currentLesson.steps.length - 1) {
    completeLesson();
    return;
  }
  currentStep++;
  renderLessonStep();
}

function prevLessonStep() {
  if(currentStep > 0) { currentStep--; renderLessonStep(); }
}

function backToModule() { openModule(currentModule); }

function completeLesson() {
  if(!userProfile) userProfile = {};
  if(!userProfile.progress) userProfile.progress = {};
  userProfile.progress[currentLesson.id] = { completed: true, completedAt: new Date().toISOString() };
  if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured && currentUser) {
    db.collection('users').doc(currentUser.uid).update({
      ['progress.' + currentLesson.id]: { completed: true, completedAt: firebase.firestore.FieldValue.serverTimestamp() }
    });
  } else {
    const stored = JSON.parse(localStorage.getItem('whalio_user') || '{}');
    stored.progress = userProfile.progress;
    localStorage.setItem('whalio_user', JSON.stringify(stored));
  }
  openModule(currentModule);
}

function continueLearning() { openModule('chatgpt'); }

// ===== FIREBASE AUTH LISTENER =====
if(typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
  auth.onAuthStateChanged(user => {
    if(user) {
      currentUser = user;
      db.collection('users').doc(user.uid).get().then(doc => {
        if(doc.exists) {
          userProfile = doc.data();
          userProfile.email = user.email;
          userProfile.name = user.displayName || user.email.split('@')[0];
        } else {
          userProfile = { email: user.email, name: user.displayName || '', plan: 'free', progress: {} };
        }
        onUserLogin(userProfile);
      });
    } else {
      currentUser = null; userProfile = null;
      showPage('app-landing');
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  if(typeof isFirebaseConfigured === 'undefined' || !isFirebaseConfigured) {
    const u = localStorage.getItem('whalio_user');
    if(u) {
      try {
        const d = JSON.parse(u);
        userProfile = d;
        onUserLogin(d);
      } catch(e) { showPage('app-landing'); }
    } else {
      showPage('app-landing');
    }
  }
});
