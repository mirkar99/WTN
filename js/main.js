const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav')


navToggle.addEventListener('click',()=>{
    [...navToggle.children].forEach(el => el.classList.toggle('hamburger'))
    nav.classList.toggle('hidden');
})