import weatherEventListner from "./weather.js";
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const section = document.querySelectorAll('.section');


navToggle.addEventListener('click',()=>{
    [...navToggle.children].forEach(el => el.classList.toggle('hamburger'))
    nav.classList.toggle('hidden-nav');
});
const changeSection = ()=>{
    [...nav.children].forEach(el => {
        el.addEventListener('click',function(){
            if(el.classList.contains('nav__button--weather')){
                section[0].classList.remove('hidden-section');
                section[1].classList.add('hidden-section');
            }
            if(el.classList.contains('nav__button--timer')){
                section[1].classList.remove('hidden-section');
                section[0].classList.add('hidden-section');
            }
        })
    })
}
changeSection();
weatherEventListner();