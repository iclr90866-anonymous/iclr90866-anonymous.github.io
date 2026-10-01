window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();

})

// TLDR panel: loop the selected speedup clip (5x by default); a speed button switches clips.
$(document).ready(function() {
    var $stack = $(".tldr-speed-stack");
    if (!$stack.length) return;
    var videos = $stack.find("video").get();
    var $buttons = $stack.find(".tldr-speeds button");
    var $label = $stack.find(".tldr-speed-label");
    var current = videos.length - 1;

    function show(i) {
        videos[current].pause();
        $(videos[current]).removeClass("is-active");
        current = i;
        var v = videos[i];
        $(v).addClass("is-active");
        v.currentTime = 0;
        var p = v.play();
        if (p && p.catch) p.catch(function() {});
        $buttons.removeClass("is-active").eq(i).addClass("is-active");
        var speed = i + 1;
        var rate = speed === 1 ? "Demo rate" : speed + "&times; faster";
        $label.html(rate + " &middot; " + (50 * speed) + "&nbsp;Hz &middot; Real time");
    }

    videos.forEach(function(v) { v.loop = true; });
    $buttons.each(function(i) {
        $(this).on("click", function() { show(i); });
    });
    show(current);
});
