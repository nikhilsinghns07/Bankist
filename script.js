const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close--modal')
const btnOpenModal = document.querySelectorAll('.btn--show--modal')

const openModal = function(e) {
    e.preventdefault();
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
const closeModal = function() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
btnOpenModal.forEach(btn => btn.addEventListener('click',openModal));

const header = document.querySelector('.header')
const allsections = document.querySelectorAll('.section')

document.getElementById('section--1')

const allButtons = document.getElementsByTagName('button')


const message = document.createElement('div')
message.classList.add('cookie-message');
message.textContent = 'we use cookies to improve functionality and analytics.'
message.innerHTML = 'we use cookies to improve functionality and analytics.<button class ="btn btn--close-cookie">Got it</button>';

header.append(message)

document.querySelector('.btn--close-cookie').addEventListener('click',function() {
    message.parentElement.removeChild(message)
})


message.style.backgroundColor = '#37383d'
message.style.width =  '120%'

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 +'px'

document.documentElement.style.setProperty('--color-primary','orangered')

const logo = document.querySelector('.nav__logo')

logo.alt="A logo"
logo.setAttribute('company','Bankist')

const link = document.querySelector('.nav__link--btn')


logo.classList.add('c','j')
logo.classList.remove('c','j')
logo.classList.toggle('c','j')
logo.classList.contains('c','j')

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click',function(e) {
    const s1Coords = section1.getBoundingClientRect();


    section1.scrollIntoView({behavior:'smooth'})  // this simple method can be used to implement scroll view
})

const h1 = document.querySelector('h1')

const alertH1 = function(e){
    alert('onmouseenter: Great! You are reading the heading')
    h1.removeEventListener('mouseenter',alertH1)  
}
h1.addEventListener('mouseenter',alertH1)
setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000) 

const randomInt = (min,max) =>Math.floor(Math.random()*(max - min +1)+min);
const randomColor = () => `rgb(${randomInt(0,255)})`;

document.querySelector('.nav__link').addEventListener('click',function(e){
    this.style.backgroundColor = randomColor()
    e.stopPropagation()   
})

document.querySelector('.nav__links').addEventListener('click',function(e){
    this.style.backgroundColor = randomColor()
})
document.querySelector('.nav').addEventListener('click',function(e){
    this.style.backgroundColor = randomColor()
},true)

document.querySelector('.nav__links').addEventListener('click',function(e){
    
    if(e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'})
    }
})

//DOM Traversing
//through dom we can select an element based on other element
//Going Downward

h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

//going upwards

const spread = [...h1.parentElement.children]
spread.forEach(function(el) {
    if(el !== h1){
        el.style.transform = 'scale(0.5)';
    }
})

//Building a tabbed component

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

tabsContainer.addEventListener('click',function(e){
    const clicked =e.target.closest('.operations__tab')
    if(!clicked) return ;  // this is called guard clause.
    //remove active classes 
    tabs.forEach(t=> t.classList.remove('operations__tab--active'))
    tabsContent.forEach(c=> c.classList.remove('operations__content--active'))
    //Activate Tab
    clicked.classList.add('operations__tab--active')
    //Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})


const nav = document.querySelector('.nav')
const handleHover = function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this;
        })
        logo.style.opacity = this;
    }
}

nav.addEventListener('mouseover',handleHover.bind(0.5))
nav.addEventListener('mouseout',handleHover.bind(1))

const initialCoords = section1.getBoundingClientRect()

window.addEventListener('scroll',function(){
    if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
})


const naveHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries){
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0,
    rootMargin: `-${naveHeight}px`
});
headerObserver.observe(header)


const allSections = document.querySelectorAll('.section')
const revealSection = function(entries,observer) {
    const [entry] = entries;
    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
    root:null,
    threshold:0.15,
})
allSections.forEach(function(section){
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})


const imgTargets = document.querySelectorAll('img[data-src]')
const loadImg = function(entries,observer) {
    const [entry] = entries
    if(!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load',function(){
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg,{
    root:null,
    threshold:0,
    rootMargin:'200px'
})
imgTargets.forEach(img => imgObserver.observe(img))


const slider = function(){
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
let curSlide = 0;
const maxSlide = slides.length
const dotContainer = document.querySelector('.dots')
dotContainer.addEventListener('click',function(e){

    if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset;
        goToSlide(slide)
        activateDot(Slide)
    }
})

const createDots = function(){
    slides.forEach(function(_,i){
        dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot"data-slide="${i}"></button>`)
    })
}
const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
const goToSlide = function(slide) {
    slides.forEach((s,i)=>(s.style.transform = `translateX(${100*(i-slide)}%)`))
}
const nextSlide = function() {
    if(curSlide === maxSlide - 1){
        curSlide = 0;
    }else{
        curSlide++;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
}
const prevSlide = function(){
    if(curSlide === 0){
        curSlide = maxSlide - 1;
    }else{
        curSlide--;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
}
const init = function(){
    goToSlide(0)
    createDots()
    activateDot(0)
}
init()
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)
document.addEventListener('keydown',function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();  //here we are using short circuting instead of if-else statement
})
createDots();
}
slider()

window.addEventListener('load',function(e){
    console.log('page fully loaded',e)
})

