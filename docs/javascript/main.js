$(function () {

	// drawer open
	const bar = document.querySelector(".header-mobile__menu-icon");
	if (bar != null) {
		bar.addEventListener("click", () => {
			console.log("click done.");
			$("header").find(".menu").toggleClass("open");
			$(".header-mobile__mat").toggleClass("fading");

		});
	}
	// draw close
	const mat = document.querySelector(".header-mobile__mat");
	if (mat != null) {
		mat.addEventListener("click", () => {
			$("header").find(".menu").toggleClass("open");
			$(".header-mobile__mat").toggleClass("fading");
		});
	}

	let curr_scroll_top;
	// update user scroll top
	$(window).scroll(function () {
		curr_scroll_top = $(this).scrollTop();

		// index.html headerのmenuかぶりを修正
		if (document.querySelector(".header") != null) {
			// console.log("exist .header class.");
			if (curr_scroll_top <= $(".header").find(".menu").offset().top) {
				$(".header").find(".menu").removeClass("hidden");
				$(".header").removeClass("zindex-back");
			} else if (curr_scroll_top > $(".header").find(".menu").offset().top) {
				$(".header").find(".menu").addClass("hidden");
				$(".header").addClass("zindex-back");
			}
		}

		// scroll animation exsample
		// if (curr_scroll_top >= $(".about").offset().top) {
		// 	console.log("ok");
		// 	var cssSelector = anime({
		// 		targets: '.about',
		// 		translateY: 100,
		// 		opacity: 1,
		// 		easing: 'easeInOutQuad',
		// 		duration: 500,
		// 	});
		// 	cssSelector;
		// }
	})
});

document.addEventListener("DOMContentLoaded", init);

function init() {
	// var updateLogEl = document.querySelector('#update .current-time-log');
	// var progressLogEl = document.querySelector('#update .progress-log');
	// var update = anime({
	// 	targets: '#callbacks .el',
	// 	translateX: 250,
	// 	delay: 1000,
	// 	update: function (anim) {
	// 		updateLogEl.value = 'current time : ' + Math.round(anim.currentTime) + 'ms';
	// 		progressLogEl.value = 'progress : ' + Math.round(anim.progress) + '%';
	// 	},
	// 	complete: function (anim) {
	// 		// completedLogEl.value = 'completed : ' + anim.completed;
	// 		const scroll = $(".noScroll");
	// 		scroll.removeClass("noScroll");
	// 		const loading = $(".loading");
	// 		loading.css("display", "none");
	// 		console.log("animation complete!");
	// 	}
	// });
	// update;

	// contactのLogoAnimation
	var lineDrawing = anime({
		targets: '#lineDrawing .lines path',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 3000,
		delay: function (el, i) {
			return i * 250
		},
		direction: 'alternate',
		loop: false
	});
	lineDrawing;
}