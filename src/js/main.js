var icons = document.querySelectorAll('.icon'),
	grahics = document.querySelectorAll('.graphic'),
	certs = document.querySelectorAll('.cert'),
	navToggle = document.querySelectorAll('.nav-toggle'),
	mobileNodes = document.querySelectorAll('.mobile-nav__items ul li a'),
	ids = document.querySelectorAll('a[href^="#"]');

/*
//	Adds event listener to nodeList
*/
function addEventListenerList(list, event, fn) {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, fn, true);
	}
}

/*
//	Adds active class after click on nav item
*/
function addActiveClass(nodeList, target) {
	for (var i = 0, len = nodeList.length; i < len; i++) {
		if (target == nodeList[i]) {
			nodeList[i].classList.add('active');
		} else {
			nodeList[i].classList.remove('active');
		}
	}
}

/*
//	Scrolls to nav item corresponding element
*/
function scrollToHash(hash) {
	var position = document.querySelector(hash).getBoundingClientRect().top;
	window.scrollBy({
		top: position - 90,
		left: 0,
		behavior: "smooth"
	});
}

/*
//	Reveal elements when in viewport
*/
window.sr = ScrollReveal();
sr.reveal(icons, {
	delay: 500,
	duration: 1500,
	interval: 200,
	distance: '40px'
});
sr.reveal(grahics, {
	delay: 100,
	duration: 1500
});
sr.reveal(certs, {
	delay: 500,
	duration: 1500,
	interval: 200,
	distance: '40px'
});

var mySwiper = new Swiper('.swiper-container', {
	autoplay: {
		delay: 3000,
	},
	direction: 'horizontal',
	loop: true,
	navigation: {
		nextEl: '.next',
		prevEl: '.prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction'
	},
	speed: 400
});

/*
//	Adds click event for navigation toggle
*/
addEventListenerList(navToggle, 'click', function (e) {
	e.preventDefault();
	document.getElementsByTagName('html')[0].classList.toggle('menu-visible');
});

/*
//	Adds click event for mobile menu links
*/
addEventListenerList(mobileNodes, 'click', function (e) {
	e.preventDefault();
	document.getElementsByTagName('html')[0].classList.remove('menu-visible');
});

/*
//	Adds click event for href="#xyz" atribute elements
//	sets active class
*/
addEventListenerList(ids, 'click', function (e) {
	var hash = e.target.getAttribute("href");
	e.preventDefault();
	addActiveClass(ids, e.target);
	scrollToHash(hash, e.target);
});