const icons = document.querySelectorAll('.icon');
const grahics = document.querySelectorAll('.graphic');
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