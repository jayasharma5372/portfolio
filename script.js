document.querySelectorAll('a[href^="#"]').forEach(link=>{link.addEventListener('click',e=>{const target=document.querySelector(link.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}})});
const dot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',e=>{if(dot){dot.style.right='';dot.style.bottom='';dot.style.left=(e.clientX-4)+'px';dot.style.top=(e.clientY-4)+'px'}});
