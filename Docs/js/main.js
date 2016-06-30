//load scripts for <= IE8 - :nth-child
Modernizr.load({
    test: Modernizr.borderradius,
    nope: ['js/libs/selectivizr-min.js']
});
Modernizr.load({
    test: Modernizr.input.placeholder,
    nope: ['js/libs/placeholder.min.js']
});


// as the page loads, call these scripts
$(document).ready(function() {
	
	$('.site-navigation a, .scroll').on('click', function(e) {
        e.preventDefault();

        // Get href of link
        var scrollTarget = $(this).attr('href');

        // Get target position from top of the page
        var targetPosition = $(scrollTarget).offset().top;

        $('html,body').animate({scrollTop: targetPosition}, 800);

    });

    
}); /* end of as page load scripts */
