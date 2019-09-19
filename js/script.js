$("#coursel-container").owlCarousel({
    items: 1
});
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
    $("#menu").on("click", function() {
            $(".menu-container").slideToggle().css("display","flex");
    });
})
$(function() {
    $("#search").on("click", function(e) {
        e.preventDefault();
        $(".search").slideToggle().css("display","flex");
    })
})
$(function() {
    $(".all-items > div").on("click", function(e) {
        e.preventDefault();
        $(this).removeClass('transition-fade').addClass('transition-item');
    });
});
