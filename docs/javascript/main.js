$(function () {

	let curr_scroll_top;
	// update user scroll top
	$(window).scroll(function () {
		curr_scroll_top = $(this).scrollTop();

		// index.html headerのmenuかぶりを修正
		if (curr_scroll_top <= $(".header").find(".menu").offset().top) {
			$(".header").find(".menu").removeClass("hidden");
			$(".header").removeClass("zindex-back");
		} else if (curr_scroll_top > $(".header").find(".menu").offset().top) {
			$(".header").find(".menu").addClass("hidden");
			$(".header").addClass("zindex-back");
		}
	})
});

document.addEventListener("DOMContentLoaded", init);

function init() {

	console.log("init");
	var lineDrawing = anime({
		targets: '#lineDrawing .lines path',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function (el, i) {
			return i * 250
		},
		direction: 'alternate',
		loop: false
	});

	lineDrawing;
}