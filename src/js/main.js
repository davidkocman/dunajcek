var icons = document.querySelectorAll('.icon');
var grahics = document.querySelectorAll('.graphic');

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
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	loop: true,
	navigation: {
		nextEl: '.next',
		prevEl: '.prev',
	},
	pagination: {
		el: '.swiper-pagination',
		type: 'fraction'
	},
	speed: 2000
});