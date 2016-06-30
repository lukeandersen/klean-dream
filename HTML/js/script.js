var EMBARK = EMBARK || {};

$(function(){
    EMBARK.modernizr();
    EMBARK.init();
    EMBARK.tabs();
    EMBARK.toggle();
    EMBARK.lightbox();
    EMBARK.tweet();
    EMBARK.video();
    EMBARK.slider();
    EMBARK.contact();
    EMBARK.flickr();
    EMBARK.map();
});


EMBARK.modernizr = function() {
    //load scripts for <= IE8 - :nth-child
    Modernizr.load({
        test: Modernizr.borderradius,
        nope: ['js/libs/selectivizr-min.js']
    });
    Modernizr.load({
        test: Modernizr.input.placeholder,
        nope: ['js/libs/placeholder.min.js']
    });
};



// Scripts loaded for all pages
EMBARK.init = function() {

    // mobile navigation
    $('.site-navigation > ul').tinyNav({
        active: 'active',
        header: 'Navigation'
    });

    // Custom select styling
    $('select').wrap('<label class="select-wrapper"></label>');

    var slideImg = $('.full-slider li img').attr('src');

    $('.full-slider li img').each(function() {
        var slideImg = $(this).attr('src');
        $(this).parent().css('background-image', 'url('+slideImg+')');
    });

};


// Scripts only loaded on pages that require them
EMBARK.tabs = function() {
    // Check to see if class exists on page
    $tabs = $('.tab-nav');
    if (!$tabs.length) return;

    // Tabs
    // Hide all tab-content
    $('.tab-content').hide();
    // Tabs function
    $('.tab-nav a').on('click', function(e) {
        e.preventDefault();
        // Active class to tav nav
        $('.tab-nav li').removeClass('active');
        $(this).parent().addClass('active');
        // Get tab ID
        var tabID = $(this).attr('href');
        // Display selected tab
        $('.tab-content').hide();
        $(tabID).fadeIn('fast');
    });
    // Activate first tab
    $('.tab-nav .active a').click();

};

EMBARK.toggle = function() {
    $toggle = $('.toggle-content');
    if (!$toggle.length) return;

    // Toggle
    $('.toggle-content').hide();
    $('.toggle-handle').on('click', function(e) {
        e.preventDefault(); 
        if($(this).hasClass('expanded')) {
            $(this).removeClass('expanded').next('.toggle-content').hide();
            $(this).children('span').attr('data-icon', 'a');
        } else {
            $(this).addClass('expanded').next('.toggle-content').fadeIn();
            $(this).children('span').attr('data-icon', 's');
        }
    });

};

EMBARK.lightbox = function() {
    $lightbox = $('a[rel=lightbox], .lightbox');
    if (!$lightbox.length) return;

    // Lightbox
    $('a[rel=lightbox], .lightbox').fancybox({
        overlayColor: '#000',
        overlayOpacity: 0.55,
        padding: 0,
        titlePosition: 'inside'
    });

};

EMBARK.tweet = function() {
    $tweet = $('.tweets');
    if (!$tweet.length) return;

    $('.tweets').tweet({
        username: "lawebdesignau",
        join_text: "",
        avatar_size: 32,
        count: 2,
        loading_text: "loading tweets..."
    });

};

EMBARK.video = function() {
    $video = $('.video');
    if (!$video.length) return;

    // Fit videos
    $('.video').fitVids();

};

EMBARK.slider = function() {
    $slider = $('.flexslider');
    if (!$slider.length) return;

    // Carousel
    $('.flexslider').flexslider({
        // animation: "slide",
        // slideshowSpeed: 7000, 
        nextText: "8",
        prevText: "9"
    });

};

EMBARK.contact = function() {
    $contact = $('.contact-form');
    if (!$contact.length) return;

    // Contact form
    $('#contact-submit').click(function(e){
        e.preventDefault();
        
        var error = false;
        var name = $('#contact-name').val();
        var email = $('#contact-email').val();
        var message = $('#contact-message').val();
        
        if(name.length == 0){
            var error = true;
            $('#contact-name-error').fadeIn(500);
        }else{
            $('#contact-name-error').fadeOut(500);
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            var error = true;
            $('#contact-email-error').fadeIn(500);
        }else{
            $('#contact-email-error').fadeOut(500);
        }
        if(message.length == 0){
            var error = true;
            $('#contact-message-error').fadeIn(500);
        }else{
            $('#contact-message-error').fadeOut(500);
        }
        
        if(error == false){
            $('#contact-submit').attr({'disabled' : 'true', 'value' : 'Sending...' });
            
            $.post("send-email.php", $(".contact-form").serialize(),function(result){
                if(result == 'sent'){
                    $('#contact-submit').remove();
                    $('#mail-success').fadeIn(500);
                }else{
                    //show the mail failed div
                    $('#mail-fail').fadeIn(500);
                    $('#contact-submit').removeAttr('disabled').attr('value', 'Submit');
                }
            });
        }
    }); 

};

EMBARK.flickr = function() {
    $flickr = $('.flickr-feed');
    if (!$flickr.length) return;

    // Flickr feed
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url:  "http://api.flickr.com/services/feeds/photos_public.gne?id=53358796@N05&format=json&jsoncallback=?",
        // Use http://idgettr.com/ to get user ID
        success: function(data) {
            console.log('success');
            for (var i = 0; i < 9; i++) {
                // get large image for lightbox
                var linkSrc = data.items[i].media.m.replace("_m.jpg", "_b.jpg");
                // get 150x150 images
                var imgSrc = data.items[i].media.m.replace("_m.jpg", "_q.jpg");
                var liNumber = i + 1; // Add class to each LI (1-10)
                $(".flickr-feed").append("<li class='flickr-image no-" + liNumber + "'><a title='" + data.items[i].title + "' rel='lightbox' href='" + linkSrc + "'><img src='" + imgSrc + "' /></a></li>");
            }
            $('a[rel=lightbox]').fancybox({
                overlayColor: '#000',
                overlayOpacity: 0.55,
                padding: 0,
                titlePosition: 'inside'
            });
        },
        error: function (xhr) {  
            $(".flickr-feed").append("<p>Sorry, could not load images right now :(</p>"); 
        } 
    }); 

};

EMBARK.map = function() {
    $map = $('.map');
    if (!$map.length) return;

    // Google maps
    $('.map').gMap({
        markers: [
            {
                // Get position here: http://itouchmap.com/latlong.html
                latitude: -33.870344,
                longitude: 151.210370,
            }
        ],
        // address: 'sydney, nsw',
        zoom: 15,
        streetViewControl: false,
        mapTypeControl: false
    });

};