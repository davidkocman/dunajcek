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
	document.getElementById(hash).scrollIntoView({
		behavior: 'smooth',
		block: 'center'
	});
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
sr.reveal(certs, {
	delay: 500,
	duration: 1500,
	interval: 200,
	distance: '40px'
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

addEventListenerList(ids, 'click', function (e) {
	var hash = e.target.hash.substr(1);
	e.preventDefault();
	addActiveClass(ids, e.target);
	scrollToHash(hash, e.target);
});