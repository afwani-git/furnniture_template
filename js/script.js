$(function() {
    $("#coursel-container").owlCarousel({
        items: 1
    });
})
$(function() {
    $(".list-item .item").on("mouseenter", function() {
        $(".recomended-heading h5").css('color', 'var(--dark-blue)');
    });
    $(".list-item .item").on("mouseleave", function() {
        $(".recomended-heading h5").css('color', '#dbdbdb');
    });
    $(".heart").on("mouseenter", function() {
        $(".heart i").removeClass('fa fa-heart-o');
        $(".heart i").addClass('fa fa-heart animated  infinite bounce');
    });
    $(".heart").on("mouseleave", function() {
        $(".heart i").removeClass('fa fa-heart').addClass('fa fa-heart-o');
        $(".heart i").removeClass('animated infinite bounce');
    });
})
$(function() {
    $(".menu-container").hide();
    let hidden = true;
    $("#menu").on("click", function() {
        if (hidden) {
            $(".menu-container").slideToggle();
        } else {
            $(".menu-container").slideToggle();
        }
        hidden = !hidden;
    });
})
$(function() {
    let hidden = true;
    $("#search").on("click", function(e) {
        e.preventDefault();
        if (hidden) {
            $("#coursel-container").slideUp("1000");
        } else {
            $("#coursel-container").slideDown('1000');
        }
        hidden = !hidden;
    })
})