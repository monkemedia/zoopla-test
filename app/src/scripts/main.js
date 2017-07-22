'use strict';

(function() {

	// Accordion
	var initAccordion = function() {
		var button = document.getElementsByClassName('accordion__header--link');

		function accordionEvents(e) {
			e.preventDefault();

			var accordion = e.currentTarget.closest('.accordion');

			function showPanel(currentTarget) {
				var openedPanel = accordion.querySelector('.is-active'),
					panel = currentTarget.parentNode.parentNode;
				// Hide open panels first
				if (openedPanel) {
					openedPanel.classList.remove('is-active')
				}

				// Show panel
				panel.className += ' is-active';
			}
			showPanel(e.currentTarget)
		}

		//
		for(var i = 0; i < button.length; i++) {
			button[i].addEventListener('click', accordionEvents);
		}
	};

	initAccordion();
})();

