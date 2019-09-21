function init(){
    let productDetail = {title: "",img: "",price: 0,qty:0};let chart = {items:[]}
    $(window).on("load",function(){
        try{
            let q = JSON.parse(localStorage.chart);
            $("#bucket").find("span").text(q.items.map(prod => prod.qty).reduce((prevQty,qty) => prevQty + qty,0));
        }catch{
            return false;
        }
    })
    $(function(){
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
        $("#menu").on("click", function() {
            $(".menu-container").slideToggle().css("display", "flex");
        });
    })
    $(function() {
        $("#search").on("click", function(e) {
            e.preventDefault();
            $(".search").slideToggle().css("display", "flex");
        })
    })
    $(function() {
        $(".all-items > a").on("click", function(e) {
            e.preventDefault();
            $(this).removeClass('transition-fade').addClass('transition-item');
        });
    });
    $(function() {
        $(".form-qty").on("submit", function(evt) {
            evt.preventDefault();
            try{
                let Jchart = "";
                product = JSON.parse(localStorage.getItem("product"));
                getChart = JSON.parse(localStorage.getItem("chart"));
                if(getChart === null){
                    product.qty = parseInt($(this).find(".input-qty").prop("value"));
                    chart.items.push(product);
                    Jchart  = JSON.stringify(chart);
                    localStorage.setItem("chart",Jchart);
                }else{
                    chart =  JSON.parse(localStorage.chart);
                    if(!chart.items.find(prod => prod.title === product.title)){
                        product.qty = parseInt($(this).find(".input-qty").prop("value"));
                        chart.items.push(product);
                        Jchart = JSON.stringify(chart);
                        localStorage.setItem("chart",Jchart);
                    }else{
                        let qty = parseInt($(this).find(".input-qty").prop("value"));
                        chart.items.map(prod => {
                            if(prod.title === product.title){
                                prod.qty += qty
                            }
                        })
                        Jchart = JSON.stringify(chart);
                        localStorage.setItem("chart",Jchart);
                    }
                }
                let q = JSON.parse(localStorage.chart);
                $("#bucket").find("span").text(q.items.map(prod => prod.qty).reduce((prevQty,qty) => prevQty + qty,0));
                $("#bucket").addClass('animated bounce');$("#bucket a  path.cls-1")[0].classList.add("active-path");
                setTimeout(x => {
                    $("#bucket").removeClass('animated bounce');
                    $("#bucket a  path.cls-1")[0].classList.remove("active-path");
                },900)
            }catch{
                return false;
            }
        });
    })
    $(function() {
        $(".box").on("click",function(evt){
            evt.preventDefault();
            productDetail.title  = $(this).find(".title-info").text();
            productDetail.price = parseInt($(this).find(".price-info").text().substring(1));
            productDetail.img = $(this).find('img.img-responsive').prop("src");
            localStorage.setItem("product",JSON.stringify(productDetail));
        })
    })
}
init();
document.addEventListener('swup:contentReplaced', init);
