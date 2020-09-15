$(function() {
  $(".item-container").each(function(i, el ) {
    let prod = coffeeProds[i];

    $(this).find("input[type=hidden].item-id").val(prod.id);
    $(this).find("h4.item-title").html(prod.name);
    $(this).find("img.item-image").attr("src", prod.image);
    $(this).find("span.item-price").html(`$${prod.price.toFixed(2)}`);
  });
});

function addToCart(btn) {
  btn.addClass('btn-outline-success');
  btn.removeClass('btn-dark');
  btn.html("Added");
  
  let prodId = btn.siblings("input[type=hidden].item-id").val();
  addToCartTable(prodId);
}