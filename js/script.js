function init() {
    let productDetail = { title: "", img: "", price: 0, qty: 0, newPrice: 0 };
    let chart = { items: [] }
    const swup = new Swup();

    function updateBucket() {
        let q = JSON.parse(localStorage.chart);
        return (
            $("#bucket").find("span").text(
                q.items
                .map(prod => prod.qty)
                .reduce((prevQty, qty) => prevQty + qty, 0))
        );
    }
    $(window).on("load", function() {
        try {
            let q = JSON.parse(localStorage.chart);
            $("#bucket").find("span").text(q.items.map(prod => prod.qty)
                .reduce((prevQty, qty) => prevQty + qty, 0));
        } catch {
            return false;
        }
    })
    $(function() {
        $(".menu-items .items a").on("click", function(evt) {
            evt.stopPropagation();
            $(".menu-container").slideUp();
            console.log('hello')
        })
    })
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
            try {
                let Jchart = "";
                product = JSON.parse(localStorage.getItem("product"));
                getChart = JSON.parse(localStorage.getItem("chart"));
                if (getChart === null) {
                    product.qty = parseInt($(this).find(".input-qty").prop("value"));
                    chart.items.push(product);
                    Jchart = JSON.stringify(chart);
                    localStorage.setItem("chart", Jchart);
                } else {
                    chart = JSON.parse(localStorage.chart);
                    if (!chart.items.find(prod => prod.title === product.title)) {
                        product.qty = parseInt($(this).find(".input-qty").prop("value"));
                        chart.items.push(product);
                        Jchart = JSON.stringify(chart);
                        localStorage.setItem("chart", Jchart);
                    } else {
                        let qty = parseInt($(this).find(".input-qty").prop("value"));
                        chart.items.map(prod => {
                            if (prod.title === product.title) {
                                prod.qty += qty;
                                prod.newPrice = parseInt(prod.price * prod.qty);
                            }
                        })
                        Jchart = JSON.stringify(chart);
                        localStorage.setItem("chart", Jchart);
                    }
                }
                updateBucket();
                $("#bucket").addClass('animated bounce');
                $("#bucket a  path.cls-1")[0].classList.add("active-path");
                setTimeout(x => {
                    $("#bucket").removeClass('animated bounce');
                    $("#bucket a  path.cls-1")[0].classList.remove("active-path");
                }, 900)
            } catch {
                return false;
            }
        });
    })
    $(function() {
        $(".box").on("click", function(evt) {
            evt.preventDefault();
            productDetail.title = $(this).find(".title-info").text();
            productDetail.price = parseInt($(this).find(".price-info").text().substring(1));
            productDetail.img = $(this).find('img.img-responsive').prop("src");
            localStorage.setItem("product", JSON.stringify(productDetail));
        })
    })

    function templateIntem(data, num) {
        // debugger;
        result = "";
        num = 1;
        data.items.map(data => {
            result += `
            <tr class="row">
                <td>${num}</td>
                <td>
                    <img src="${data.img}" alt="red seat" class="img-responsive" width="70px" height="70px">
                    <p class="title">${data.title}</p>
                </td>
                <td>
                    <p id="price-item">$${data.qty === 1 ? data.price : data.newPrice}</p>
                </td>
                <td>
                    <p id="qty-item">${data.qty}</p>X
                </td>
                <td>
                    <div class="action-bucket">
                        <i class="fa fa-plus-circle"></i>
                        <i class="fa fa-minus-circle"></i>
                    </div>
                </td>
            </tr>
            `;
            num++;
        })
        return result;
    }

    function renderTemplate() {
        try {
            let data = JSON.parse(localStorage.chart);
            updateTotal()
            var ea = templateIntem(data);
            $("#ea").html(ea);
        } catch {
            return false;
        }
    }

    function updateTotal() {
        let data = JSON.parse(localStorage.chart);
        const total = data.items.map(x => { return x.price * x.qty })
            .reduce((x, y) => x + y, 0);
        $("#total").html(`<i class="fa fa-usd"></i>${total}`);
    }
    $(function() {
        $(".action-bucket > .fa.fa-minus-circle").on("click", function() {

        })
        const table = document.querySelector(".table-bucket");
        if (table !== null) {
            table.addEventListener("click", (evt) => {
                if (evt.target.classList[1] === "fa-minus-circle") {
                    const getName = evt.target.parentElement.parentElement.parentElement
                                    .children[1].children[1].textContent;
                    let data = JSON.parse(localStorage.chart);
                    let dataLen = data.items.length;
                    data.items.map(prod => {
                        if (prod.title === getName) {
                            prod.qty--;
                            prod.newPrice -= prod.price;
                            evt.target.parentElement.parentElement.parentElement
                                .children[3].textContent = `${prod.qty}X`;
                            evt.target.parentElement.parentElement.parentElement
                                .children[2].children[0].textContent = `$${prod.newPrice}`;
                        }
                    })
                    data.items = data.items.filter(x => x.qty !== 0);
                    localStorage.setItem("chart", JSON.stringify(data));
                    if (dataLen !== data.items.length){ evt.target.parentElement.parentElement.parentElement.remove()};
                    updateBucket();
                    updateTotal();
                }else if(evt.target.classList[1] === "fa-plus-circle"){
                    console.log('comming soon ea :)');
                }
            })
        } else {
            return false;
        };
    })
    renderTemplate();
}
$(function() {
    $("#menu").on("click", function(evt) {
        $(".menu-container").slideToggle().css("display", "flex");
    });
})
init();
document.addEventListener('swup:contentReplaced', init);