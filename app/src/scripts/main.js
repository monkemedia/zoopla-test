'use strict';

(function() {

	// Accordion
	var initAccordion = function() {
		var showHide = document.getElementsByClassName('accordion__header--link'),
				deletePanel = document.getElementsByClassName('accordion__header--delete');

		function accordionShowHide(e) {
			e.preventDefault();

			var currentTarget = e.target,
					accordion = currentTarget.closest('.accordion');

			function showPanel(currentTarget) {
				var openPanels = accordion.getElementsByClassName('is-active')[0],
					panel = currentTarget.parentNode.parentNode,
					content = panel.getElementsByClassName('accordion__content')[0],
					ariaExpandedAll = accordion.querySelectorAll('[aria-expanded="true"]'),
					ariaHiddenAll = accordion.querySelectorAll('[aria-hidden="false"]');

				// Hide open panels first
				if (openPanels) {
					openPanels.classList.remove('is-active');
					ariaExpandedAll[0].setAttribute('aria-expanded', false);
					ariaHiddenAll[0].setAttribute('aria-hidden', true);
				}

				// Show panel
				panel.className += ' is-active';
				currentTarget.setAttribute('aria-expanded', true);
				content.setAttribute('aria-hidden', false);
			}
			showPanel(e.currentTarget);
		}

		function accordionDeletePanel(e) {
			e.preventDefault();

			var panel = e.currentTarget.closest('.accordion__article');
			panel.remove();
		}

		// Add event listeners to accordion headers
		if (showHide) {
			for(var i = 0; i < showHide.length; i++) {
				showHide[i].addEventListener('click', accordionShowHide);
			}
		}

		// Add event listeners to remove panel buttons
		if (deletePanel) {
			for(var j = 0; j < deletePanel.length; j++) {
				deletePanel[j].addEventListener('click', accordionDeletePanel);
			}
		}
		
	};

	// View port sizes
	var initViewPorts = function() {// Would usually use mediaqueries for viewport size.
		var resizeTimer;

		function viewPortResize() {
			var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
				body = document.body;
			
			if (w <= 980) {
				body.className = 'screen-medium';
			} else if (w >= 1200) {
				body.className = 'screen-large';
			}
		}

		window.addEventListener('resize', function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(viewPortResize, 250);
		});

		viewPortResize();
		
	};

	var initMobileMenu = function() {
		var button = document.getElementsByClassName('burger-icon')[0];

		function toggleMenu(e) {
			e.preventDefault();

			var mainNav = document.getElementsByClassName('main-nav')[0],
				currentTarget = e.target;

			if (mainNav.classList.contains('is-active')) {
				mainNav.classList.remove('is-active');
				currentTarget.classList.remove('is-open');
			} else {
				mainNav.className += ' is-active';
				currentTarget.className += ' is-open';
			}
		}

		button.addEventListener('click', toggleMenu);
	};

	initAccordion();
	initViewPorts();
	initMobileMenu();
})();

