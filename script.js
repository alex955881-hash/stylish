// Slider
const slides=document.querySelectorAll('.slide');
let index=0;
function nextSlide(){
  slides[index].classList.remove('active');
  index=(index+1)%slides.length;
  slides[index].classList.add('active');
}
setInterval(nextSlide,2000);

// Swipe
let startX=0;
const slider=document.getElementById('slider');
slider.addEventListener('touchstart',e=>startX=e.touches[0].clientX);
slider.addEventListener('touchend',e=>{
  let endX=e.changedTouches[0].clientX;
  if(startX-endX>50)nextSlide();
  if(endX-startX>50){
    slides[index].classList.remove('active');
    index=(index-1+slides.length)%slides.length;
    slides[index].classList.add('active');
  }
});

// Theme
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.documentElement.dataset.theme='dark';
}

const savedTheme=localStorage.getItem('theme');
if(savedTheme)document.documentElement.dataset.theme=savedTheme;

document.getElementById('toggleTheme').onclick=()=>{
  const current=document.documentElement.dataset.theme;
  const newTheme=current==='dark'?'light':'dark';
  document.documentElement.dataset.theme=newTheme;
  localStorage.setItem('theme',newTheme);
};

// Accent
document.querySelectorAll('.color').forEach(c=>{
  c.onclick=()=>{
    document.documentElement.style.setProperty('--accent',c.dataset.color);
    localStorage.setItem('accent',c.dataset.color);
  };
});

const savedAccent=localStorage.getItem('accent');
if(savedAccent)
  document.documentElement.style.setProperty('--accent',savedAccent);

// Audio
const audio=document.getElementById('quran');
document.getElementById('playAudio').onclick=()=>{
  audio.paused?audio.play():audio.pause();
};

// Reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)entry.target.classList.add('show');
  });
},{threshold:.15});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Contact
const contact={
  email:'mdabutalhaalif375@gmail.com',
  instagram:'https://www.instagram.com/___blue__blooded___?igsh=OGQ5ZDc2ODk2ZA==',
  location:'Bangladesh'
};

const card=document.getElementById('contactCard');
card.innerHTML=`
<p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
<p><strong>Instagram:</strong> <a target="_blank" href="${contact.instagram}">Open Profile</a></p>
<p><strong>Location:</strong> ${contact.location}</p>
`;