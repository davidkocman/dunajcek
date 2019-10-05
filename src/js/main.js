var icons = document.querySelectorAll('.icon');
var grahics = document.querySelectorAll('.graphic');
var navToggle = document.querySelectorAll('.nav-toggle');
var mobileNodes = document.querySelectorAll('.mobile-nav__items ul li a');

/*
//	Adds event listener to nodeList
*/
function addEventListenerList(list, event, fn) {
	for (var i = 0, len = list.length; i < len; i++) {
		list[i].addEventListener(event, fn, false);
	}
}

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

var mySwiper = new Swiper('.swiper-container', {
	autoplay: {
		delay: 5000,
	},
	direction: 'horizontal',
	// effect: 'fade',
	// fadeEffect: {
	// 	crossFade: true
	// },
	loop: true,
	navigation: {
		nextEl: '.next',
		prevEl: '.prev',
	},
	// on: {
	// 	transitionEnd: function () {
	// 		this.params.speed = 2000;
	// 	},
	// 	transitionStart: function () {
	// 		this.params.speed = 2000;
	// 	},
	// 	touchStart: function () {
	// 		this.params.speed = 400;
	// 	}
	// },
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction'
	},
	speed: 400
});

addEventListenerList(navToggle, 'click', function (e) {
	e.preventDefault();
	document.body.classList.toggle('menu-visible');
});

addEventListenerList(mobileNodes, 'click', function (e) {
	e.preventDefault();
	document.body.classList.remove('menu-visible');
});