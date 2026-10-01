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

// TLDR panel: one speed stack per robot, switched by the robot tabs. Each stack
// loops the selected speedup clip (fastest by default); speed buttons switch clips.
$(document).ready(function() {
    var stacks = $(".tldr-speed-stack").map(function() {
        var $stack = $(this);
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
            var speed = parseFloat(v.dataset.speed);
            var rate = speed === 1 ? "Demo rate" : speed + "&times; faster";
            $label.html(rate + " &middot; " + (50 * speed) + "&nbsp;Hz &middot; Real time");
        }

        videos.forEach(function(v) { v.loop = true; });
        $buttons.each(function(i) {
            $(this).on("click", function() { show(i); });
        });

        return {
            robot: $stack.data("robot"),
            el: this,
            start: function() { show(current); },
            stop: function() { videos[current].pause(); }
        };
    }).get();
    if (!stacks.length) return;

    var $tabs = $(".tldr-robot-tabs button");
    function selectRobot(robot) {
        stacks.forEach(function(st) {
            var on = st.robot === robot;
            st.el.hidden = !on;
            if (on) st.start(); else st.stop();
        });
        $tabs.each(function() {
            var on = $(this).data("robot") === robot;
            $(this).toggleClass("is-active", on).attr("aria-selected", on);
        });
    }
    $tabs.on("click", function() { selectRobot($(this).data("robot")); });
    selectRobot(stacks[0].robot);
});
