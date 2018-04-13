/*
Cache: Utils, Navigation, Home, Scroll, Single, Parallax, CopyToClipboard, Alphabet, scope
*/
/* Utils: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Utils.js) */
var Utils = (function() {
	var transitionSupports = function() {
		var b = document.body || document.documentElement;
		var s = b.style;
		var t = 'transition';
		if (typeof s[t] === "string") {
			return true
		}
		var browsers = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
			t = t.charAt(0)
			.toUpperCase() + t.substr(1);
		for (var i = 0, n = browsers.length; i < n; i++) {
			if (typeof s[browsers[i] + t] === "string") {
				return true
			}
		}
		return false
	};
	var touchSupport = function() {
		return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
	};
	return {
		touchSupport: touchSupport,
		transitionSupports: transitionSupports
	}
})();;;
/* Navigation: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Navigation.js) */
var Navigation = (function() {
	var dom = {
		masthead: '',
		siteNavigation: '',
		switchButton: '',
		body: ''
	};
	var timer;
	var lastX;
	var _checkScrollLeft = function() {
		if (dom.masthead.scrollLeft() > dom.masthead.innerWidth() / 4) {
			_closeMasthead()
		} else {
			_openMasthead()
		}
	};
	var _checkTimer = function() {
		var currentX = dom.masthead.scrollLeft();
		if (currentX === lastX) {
			_checkScrollLeft();
			clearInterval(timer)
		} else {
			lastX = currentX
		}
	};
	var _closeMasthead = function() {
		dom.masthead.stop(true, false)
			.animate({
				scrollLeft: dom.masthead.innerWidth()
			}, _onMastheadClosed);
		$.event.trigger({
			type: "navigation.switchButton.click",
			arguments: {
				isOpen: false
			}
		})
	};
	var _openMasthead = function() {
		dom.masthead.stop(true, false)
			.animate({
				scrollLeft: 0
			}, _onMastheadOpened)
	};
	var _onMastheadClick = function(event) {
		event.preventDefault()
	};
	var _onMastheadClosed = function() {
		dom.body.removeClass('nav-opened')
	};
	var _onMastheadOpened = function() {
		dom.siteNavigation.one('touchend', _onMastheadTouchend)
	};
	var _onMastheadTouchend = function() {
		clearInterval(timer);
		timer = setInterval(_checkTimer, 100)
	};
	var _onSwitchButtonClick = function(event) {
		event.preventDefault();
		dom.body.toggleClass('nav-opened');
		if (Utils.touchSupport()) {
			_openMasthead()
		}
		$.event.trigger({
			type: "navigation.switchButton.click",
			arguments: {
				isOpen: dom.body.is('.nav-opened')
			}
		})
	};
	var _setEvents = function() {
		dom.switchButton.on('click', _onSwitchButtonClick)
	};
	var _setGAQ = function() {
		$('a[href*="download"]')
			.on('click', function() {
				_gaq.push(['_trackEvent', 'Downlaod', 'Click', 'ok'])
			})
	};
	var init = function(value) {
		dom.masthead = $('#masthead');
		dom.siteNavigation = $('#site-navigation');
		dom.switchButton = $('.switchButton');
		dom.body = $('body');
		dom.masthead.scrollLeft(dom.masthead.innerWidth());
		_setGAQ();
		_setEvents()
	};
	return {
		init: init
	}
})();;;
/* Home: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Home.js) */
var Home = (function() {
	var dom = {
		background: '',
		body: '',
		links: '',
		slideshow: {
			container: '',
			slideme: '',
			slides: ''
		}
	};
	var timeout;
	var _getSlideIndex = function(url) {
		var index;
		$.each(dom.slideshow.slides, function(i) {
			if ($(this)
				.data('url') === url) {
				index = $(this)
					.index();
				return false
			}
		});
		return index
	};
	var _loadBackground = function() {
		var src = dom.background.data('src');
		var img = new Image();
		img.onload = function() {
			dom.background.css({
					'background-image': 'url(' + src + ')'
				})
				.addClass('loaded')
				.removeData('src')
		};
		img.src = src
	};
	var _onLinksMouseenter = function(event) {
		var url = $(this)
			.attr('href');
		var index = _getSlideIndex(url);
		if (typeof index !== 'undefined') {
			_setSlide(index);
			dom.slideshow.container.addClass('working');
			if (dom.slideshow.slideme.is('.prevClicked, .nextClicked')) {
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					dom.slideshow.container.slideme('playTo', index)
				}, 1000)
			} else {
				dom.slideshow.container.slideme('playTo', index)
			}
		}
	};
	var _onLinksMouseout = function(event) {
		var url = $(this)
			.attr('href');
		var index = _getSlideIndex(url);
		dom.slideshow.container.removeClass('working');
		if (typeof index !== 'undefined') {
			_setSlide(index);
			dom.slideshow.container.slideme('playTo', index)
		}
	};
	var _onNavigationSwitchButton = function() {
		dom.body.removeClass('nav-opened');
		$('html, body')
			.stop(true, false)
			.animate({
				scrollTop: 0
			})
	};
	var _setEvents = function() {
		dom.links.on('mouseenter', _onLinksMouseenter);
		dom.links.on('mouseout', _onLinksMouseout)
	};
	var _setEventListeners = function() {
		$(document)
			.on("navigation.switchButton.click", _onNavigationSwitchButton)
	};
	var _setSlide = function(index) {
		var slide = dom.slideshow.slides.eq(index);
		var src = slide.data('src');
		if (typeof src !== 'undefined') {
			slide.css({
					'background-image': 'url(' + src + ')'
				})
				.addClass('loaded')
				.removeData('src')
		}
	};
	var _preloadImage = function(i) {
		var target = dom.slideshow.slides.eq(i);
		var src = target.data('src');
		if (typeof src !== 'undefined') {
			var img = new Image();
			img.onload = function() {
				target.css({
						'background-image': 'url(' + src + ')'
					})
					.addClass('loaded')
					.removeData('src');
				_preloadSlides(i + 1)
			};
			img.src = src
		}
	};
	var _preloadSlides = function(i) {
		if (i !== dom.slideshow.slides.length - 1) {
			_preloadImage(i)
		} else {
			return false
		}
	};
	var init = function() {
		dom.background = $('.background', '#main');
		dom.body = $('body');
		dom.body.addClass('loaded');
		dom.links = $('li a', '#site-navigation');
		dom.slideshow.container = $('.slideshow', '#main');
		dom.slideshow.container.slideme({
			'css3': true,
			'transition': 'zoom'
		});
		dom.slideshow.slideme = $('.slideme', '#main');
		dom.slideshow.slides = $('.slideme li', '#main');
		if (!Utils.touchSupport()) {
			_setEvents()
		}
		_setEventListeners();
		_loadBackground();
		_preloadSlides(0)
	};
	return {
		init: init
	}
})();;;
/* Scroll: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Scroll.js) */
var Scroll = (function() {
	var dom = {
		html: '',
		title: '',
		window: ''
	};
	var title_height;
	var title_top;
	var _onWindowScroll = function(event) {
		var scrollTop = dom.window.scrollTop();
		var height = dom.window.innerHeight();
		if (scrollTop >= height - title_top - title_height) {
			dom.html.addClass('home-intro')
		} else {
			dom.html.removeClass('home-intro')
		}
	};
	var _setEvents = function() {
		dom.window.on('scroll.parallax', _onWindowScroll)
			.trigger('scroll.parallax')
	};
	var init = function() {
		dom.html = $('html');
		dom.title = $('.site-title');
		title_height = dom.title.innerHeight();
		title_top = dom.title.position()
			.top;
		dom.window = $(window);
		_setEvents()
	};
	return {
		init: init
	}
})();;;
/* Single: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Single.js) */
var Single = (function() {
	var dom = {
		slideshow: {
			container: ''
		}
	};
	var createSlideShow = function() {
		var object = {};
		if (Utils.touchSupport()) {
			object = {
				css3: true,
				transition: 'slide',
				nativeTouchScroll: true,
				loop: true,
				pagination: 'numbers'
			}
		} else {
			object = {
				css3: true,
				transition: 'zoom',
				arrows: true,
				loop: true,
				pagination: 'numbers'
			}
		}
		dom.slideshow.container.slideme(object)
	};
	var init = function(value) {
		dom.slideshow.container = $('#parallax');
		createSlideShow()
	};
	return {
		init: init
	}
})();;;
/* Parallax: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Parallax.js) */
var Parallax = (function() {
	var dom = {
		parallax: '',
		window: '',
		body: ''
	};
	var gap = 90;
	var _onWindowScroll = function(event) {
		var scrollTop = dom.window.scrollTop();
		var y = Math.round(scrollTop / 2);
		dom.parallax.css({
			'top': y
		});
		if (scrollTop > gap + y) {
			dom.body.addClass('parallaxOutScreen')
		} else {
			dom.body.removeClass('parallaxOutScreen')
		}
	};
	var _setEvents = function() {
		dom.window.on('scroll.parallax', _onWindowScroll)
			.trigger('scroll.parallax')
	};
	var init = function() {
		dom.parallax = $('#parallax');
		dom.body = $('body');
		dom.window = $(window);
		_setEvents()
	};
	return {
		init: init
	}
})();;;
/* CopyToClipboard: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/CopyToClipboard.js) */
var CopyToClipboard = (function() {
	var dom = {
		apis: ''
	};
	var _copyToClipboard = function(text) {
		window.prompt("Copy to clipboard: Ctrl+C, Enter", text)
	};
	var _onApisClick = function(event) {
		var target = $(event.target);
		var text = '';
		if (target.is('.copyToClipboard')) {
			text = $(this)
				.find('.codeToClipboard')
				.text();
			_copyToClipboard(text)
		}
	};
	var _setEvents = function() {
		dom.apis.on('click', _onApisClick)
	};
	var init = function(value) {
		dom.apis = $('.api');
		_setEvents()
	};
	return {
		init: init
	}
})();;;
/* Alphabet: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/modules/Alphabet.js) */
var Alphabet = (function() {
	var dom = {
		alphabet: {
			container: '',
			letters: ''
		},
		api: '',
		document: '',
		letters: '',
		tabs: '',
		window: ''
	};
	var current;
	var distance = 60;
	var gap = 0;
	var _onLettersClick = function(event) {
		var id = $(this)
			.attr('href');
		var y = ($(id)
			.offset()
			.top) - gap;
		dom.document.animate({
			scrollTop: y
		});
		event.preventDefault()
	};
	var _onNavigationSwitchButton = function(event) {
		var isOpen = event.arguments.isOpen;
		if (isOpen) {
			dom.tabs.attr({
				'disabled': 'disabled'
			});
			if (dom.window.innerWidth() >= 720) {
				current.removeClass('opened')
			}
		} else {
			dom.tabs.removeAttr('disabled');
			if (dom.window.innerWidth() >= 720) {
				current.addClass('opened')
			}
		}
	};
	var _onTabClick = function(event) {
		var target = $(this);
		if (dom.window.innerWidth() >= 720) {
			_openTab(target)
		} else {
			_scrollTab(target)
		}
		event.preventDefault()
	};
	var _openTab = function(target) {
		var rel = target.data('rel');
		var targetRel = dom.alphabet.container.filter(rel);
		if (!target.is('.opened')) {
			dom.tabs.removeClass('opened');
			target.addClass('opened');
			dom.alphabet.container.removeClass('opened');
			current = targetRel.addClass('opened')
		} else {
			current = null;
			dom.alphabet.container.removeClass('opened');
			dom.tabs.removeClass('opened')
		}
	};
	var _onWindowResize = function() {
		var target = dom.tabs.filter('.opened');
		_scrollTab(target)
	};
	var _onWindowScroll = function() {
		if (dom.window.innerWidth() >= 720) {
			var y = Math.round(dom.window.scrollTop());
			$.each(dom.letters, function(i) {
				var target = $(this);
				var yStart = target.offset()
					.top - distance - gap;
				var yEnd = yStart + target.innerHeight() - distance;
				if (y < 600) {
					dom.alphabet.container.removeClass('opened')
				} else if (y >= yStart && y <= yEnd) {
					var letter = '.' + target.attr('id');
					var target = dom.alphabet.letters.filter(letter);
					var parent = target.parents('.alphabet');
					dom.alphabet.letters.removeClass('current');
					target.addClass('current');
					if (parent.is(':not(".opened")')) {
						var id = '#' + parent.attr('id');
						dom.tabs.filter('[data-rel*="' + id + '"]')
							.trigger('click')
					}
					return false
				}
			})
		}
	};
	var _setEvents = function() {
		dom.tabs.on('click', _onTabClick);
		dom.alphabet.letters.on('click', _onLettersClick);
		dom.window.on('scroll.alphabet', _onWindowScroll)
			.trigger('scroll.alphabet');
		dom.window.on("resize.alphabet", _onWindowResize)
	};
	var _setEventListeners = function() {
		$(document)
			.on("navigation.switchButton.click", _onNavigationSwitchButton)
	};
	var _scrollTab = function(target) {
		var section = target.data('section');
		var targetSection = dom.api.find('.' + section);
		if (!target.is('.opened')) {
			dom.tabs.removeClass('opened');
			target.addClass('opened')
		}
		dom.api.stop(true, false)
			.animate({
				scrollLeft: dom.api.scrollLeft() + targetSection.position()
					.left
			})
	};
	var init = function(value) {
		dom.alphabet.container = $('.alphabet');
		dom.alphabet.letters = $('a', '.alphabet');
		dom.api = $('#main');
		dom.document = $('html, body');
		dom.letters = $('.letter', '#main');
		dom.tabs = $('button', '.tabs');
		dom.window = $(window);
		if (value) {
			gap = value
		};
		_setEvents();
		_setEventListeners();
		if (dom.window.innerWidth() < 720) {
			dom.tabs.eq(0)
				.trigger('click')
		}
	};
	return {
		init: init
	}
})();;;
/* scope: (http://slideme.luigiferraresi.it/wp-content/themes/slideme/js/scope.js) */
$(document)
	.ready(function() {
		var template = $('*[data-role="main"]')
			.eq(0)
			.data('template');
		switch (template) {
			case 'home':
				Home.init();
				Scroll.init();
				break;
			case 'single':
				Parallax.init();
				Single.init();
				break;
			case 'api':
				Alphabet.init(150);
				Parallax.init();
				CopyToClipboard.init();
				break;
			default:
		}
		Navigation.init()
	});;;