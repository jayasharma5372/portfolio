const progress = document.querySelector('.progress');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
window.addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const value=max>0?(window.scrollY/max)*100:0;if(progress)progress.style.width=`${value}%`;});
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});}
document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{nav?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false');menuToggle?.setAttribute('aria-label','Open navigation');}));
const revealItems=document.querySelectorAll('.reveal');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
revealItems.forEach(item=>observer.observe(item));
const resumeStyle=document.createElement('style');
resumeStyle.textContent=`.resume-section{padding-bottom:130px}.resume-card{margin-top:70px;border:1px solid rgba(0,0,0,.16);padding:45px;display:grid;grid-template-columns:1fr .55fr;gap:70px;align-items:end;background:rgba(255,255,255,.18)}.resume-card h2{font-size:clamp(48px,5.5vw,78px);line-height:.86;letter-spacing:-.07em;font-weight:500;margin:22px 0 25px}.resume-card>div:first-child>p:last-child{font-size:13px;line-height:1.8;color:#5f5d58;max-width:560px;margin:0}.resume-actions{display:flex;flex-direction:column;align-items:flex-start;gap:12px}.resume-actions small{font-size:8px;line-height:1.5;color:#77756f;margin-top:4px}@media(max-width:850px){.resume-card{grid-template-columns:1fr;gap:35px;padding:30px;margin-top:50px}}@media(max-width:560px){.resume-section{padding-bottom:90px}.resume-card{padding:24px}.resume-card h2{font-size:45px}.resume-card>div:first-child>p:last-child{font-size:12px}.resume-actions .button{width:100%;text-align:center}}`;
document.head.appendChild(resumeStyle);
const resumeDownload=document.querySelector('.resume-actions a[download]');
if(resumeDownload){resumeDownload.href='resume.html';resumeDownload.removeAttribute('download');resumeDownload.textContent='Print / Save PDF ↓';}
