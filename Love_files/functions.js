/*
 * Helper functions for the Valentines web app.
 * Handles window resizing, typewriter effect, and time elapsed calculation.
 */

// Variables to store the initial window dimensions
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

/**
 * Event listener for window resize.
 * Reloads the page if the window dimensions change, ensuring the canvas and elements are correctly sized.
 */


$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location);
    }
});

(function($) {
    /**
     * jQuery plugin: typewriter
     * Simulates a typewriter effect for HTML content.
     * Iterates through the element's text content and reveals it character by character.
     * Handles HTML tags (like <br> or <span>) by skipping over them to avoid breaking the markup during typing.
     */
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html(''); // Clear the content initially
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				// If the current character is the start of an HTML tag, skip to the end of the tag
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
                // Update the HTML with the substring up to the current progress
                // Adds a blinking cursor effect ('_') for odd progress values
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer); // Stop the timer when done
				}
			}, 75); // Typing speed in milliseconds
		});
		return this;
	};
})(jQuery);

/**
 * Calculates and displays the time elapsed since a specific date.
 * Updates the #clock element with days, hours, minutes, and seconds.
 * 
 * @param {Date} date - The starting date to calculate time from.
 */
function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "Days <span class=\"digit\">" + days + "</span> Hours <span class=\"digit\">" + hours + "</span> Minutes <span class=\"digit\">" + minutes + "</span> Seconds <span class=\"digit\">" + seconds + "</span>"; 
	$("#clock").html(result);
}
