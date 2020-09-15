$(function() {
  $(".item-container").each(function(i, el ) {
    let prod = coffeeProds[i];

    $(this).find("input[type=hidden].product-id").val(prod.id);
    $(this).find("h4.product-title").html(prod.name);
    $(this).find("img.product-thumbnail").attr("src", prod.image);
    $(this).find("span.product-price").html(`$${prod.price.toFixed(2)}`);
  });
});

function addToCart(btn) {
  btn.addClass('btn-outline-success');
  btn.removeClass('btn-dark');
  btn.html("Added");
  
  let prodId = btn.siblings("input[type=hidden].product-id").val();
  addToCartTable(prodId);
}