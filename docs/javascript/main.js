// service worker
window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		// github pages version
		navigator.serviceWorker.register('/tokyo-underground-stadium-demo/serviceWorker.js', {
				scope: '/tokyo-underground-stadium-demo/'
			})
			.then((registration) => {
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}).catch((err) => {
				console.log('ServiceWorker registration failed: ', err);
			});
	}
});


$(function () {

	var $win = $(window);
	$win.on('load resize', function () {
		// 画面サイズによって画像を差し替える
		var windowWidth = window.innerWidth;
		const aboutImage = $(".about__right").find("img");
		if (windowWidth > 1000) {
			// PCの処理
			aboutImage.attr("src", "./assets/image/Desktop/home-about.jpg");

			// slideshowの削除
			const slideshow = document.querySelector(".event");
			if (slideshow != null) {
				document.querySelector("#mobile").classList.add("displayNone");
				document.querySelector("#desktop").classList.remove("displayNone");

			}
		} else {
			// Mobileの処理
			aboutImage.attr("src", "./assets/image/Mobile/home-about.jpg");

			// slideshowの追加
			const slideshow = document.querySelector(".event");
			if (slideshow != null) {
				document.querySelector("#mobile").classList.remove("displayNone");
				document.querySelector("#desktop").classList.add("displayNone");

			}
		}
	});

	// drawer open
	const bar = document.querySelector(".header-mobile__menu-icon");
	if (bar != null) {
		bar.addEventListener("click", () => {
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

		// scroll animation exsample:
		let offsetY = 300; 
		// index
		// about
		if(document.querySelector('.about') != null) {
			if (curr_scroll_top + offsetY >= $(".about").offset().top) {
				var cssSelector = anime({
					targets: '.about',
					translateX: '100px',
					opacity: 1,
					easing: 'easeOutExpo',
					duration: 1000,
				});
			}
			// event
			if($('#desktop').css('display') != 'none'){
				if (curr_scroll_top + offsetY  >= $('#desktop').find(".event").offset().top) {
					var cssSelector = anime({
						targets: '.event',
						translateX: '100px',
						opacity: 1,
						easing: 'easeOutExpo',
						duration: 1000,
					});
				}
			}
			if($('#mobile').css('display') != 'none'){
				if (curr_scroll_top + offsetY  >= $('#mobile').find(".event").offset().top) {
					var cssSelector = anime({
						targets: '.event',
						translateX: '100px',
						opacity: 1,
						easing: 'easeOutExpo',
						duration: 1000,
					});
				}
			}
			// news
			if (curr_scroll_top + offsetY  >= $(".news").offset().top) {
				var cssSelector = anime({
					targets: '.news',
					translateX: '100px',
					opacity: 1,
					easing: 'easeOutExpo',
					duration: 1000,
				});
			}
		}
		// information
		if(document.querySelector('.open') != null) {
			if (curr_scroll_top + offsetY >= $(".attention").offset().top) {
				var cssSelector = anime({
					targets: '.attention',
					translateX: '100px',
					opacity: 1,
					easing: 'easeOutExpo',
					duration: 1000,
				});
			}
			if (curr_scroll_top + offsetY >= $(".link").offset().top) {
				var cssSelector = anime({
					targets: '.link',
					translateX: '100px',
					opacity: 1,
					easing: 'easeOutExpo',
					duration: 1000,
				});
			}
		}
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

	// indexのSlideShow
	var elem = document.querySelector('.main-carousel');
	if (elem != null) {
		var flicky = new Flickity(elem, {
			cellAlign: 'right',
			contain: true,
			autoPlay: true
		});
	}

	// index more viewのモーフィング
	const about = document.querySelector('.about');
	if( about != null){
		const button = document.querySelectorAll(".button");
		const path = document.querySelectorAll(".polymorph");
		for(let i = 0; i < button.length; i++){

			button[i].addEventListener('mouseover', () => {
				anime.remove(path[i]);
				var hover = anime({
					targets: path[i],
					d: 'M10,10 C10,10 50,7 90,7 C130,7 170,10 170,10 C170,10 172,20 172,30 C172,40 170,50 170,50 C170,50 130,53 90,53 C50,53 10,50 10,50 C10,50 8,40 8,30 C8,20 10,10 10,10 Z',
					duration: 700,
					elasticity: 500,
					offset: 0
				});
			});
			button[i].addEventListener('mouseout', () => {
				anime.remove(path[i]);
				var down = anime({
					targets: path[i],
					d: 'M10,10 C10,10 50,9.98999977 90,9.98999977 C130,9.98999977 170,10 170,10 C170,10 170.009995,20 170.009995,30 C170.009995,40 170,50 170,50 C170,50 130,50.0099983 90,50.0099983 C50,50.0099983 10,50 10,50 C10,50 9.98999977,40 9.98999977,30 C9.98999977,20 10,10 10,10 Z',
					duration: 800,
					elasticity: 700,
					offset: 0
				});
			});
			button[i].addEventListener('mousedown', () => {
				anime.remove(path[i]);
				var down = anime({
					targets: path[i],
					d: 'M10,10 C10,10 50,9.98999977 90,9.98999977 C130,9.98999977 170,10 170,10 C170,10 170.009995,20 170.009995,30 C170.009995,40 170,50 170,50 C170,50 130,50.0099983 90,50.0099983 C50,50.0099983 10,50 10,50 C10,50 9.98999977,40 9.98999977,30 C9.98999977,20 10,10 10,10 Z',
					duration: 800,
					elasticity: 700,
					offset: 0
				});
			});
		}
	}
	
}