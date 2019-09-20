let product = {
    img:""
}
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
    $(".all-items > a").on("click", function(e) {
        e.preventDefault();
        $(this).removeClass('transition-fade').addClass('transition-item');
    });
});
// $(".box.s > .row > .column")
//     .children("info")
//         .attr('src')
//         .split("/")
//         .pop() get img
// $(".box.s > .row > .column").children(".info").children().text() get text
$(function(){
    $(".box").on("click",function(evt){
        evt.preventDefault()
        let img = $(this).children().children(".column").children('img').prop("src");
        product.img = img;
    })
})
// cuma contoh ea
$(function(){
    $(".form-qty").on("submit",function(evt){
        evt.preventDefault();
        const qty = $(".form-control.input-qty")[0].value
        let total =  parseInt($("#bucket a span").text()) + parseInt(qty);
            $("#bucket a span").text(total);
    });
})