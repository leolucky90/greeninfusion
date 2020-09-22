$(function() {
  checkLoggedIn();
  setUpPopOver();

  $("#loginForm").submit(function(e) {
    e.preventDefault();
    login();
  });
});

function checkLoggedIn() {
  let username = getCookie("username");

  if (username.length > 0) {
    welcomeUser(username);
  }
}

function setUpPopOver() {
  $('#cartBtn').popover({
    html: true,
    template: `
    <div class="popover cart-popover shadow" role="tooltip">
      <div class="arrow"></div>
      <h3 class="popover-header"></h3>
      <div class="popover-body"></div>
    </div>`,
    content: `<div id="cartPopoverContainer"></div>`
  });

  $('#cartBtn').on('shown.bs.popover', function() {
    $('#cartPopoverContainer').html(displayCart());
  }); 
  
  $('#welcomeUserContainer').popover({
    html: true,
    content: `<a id="logoutBtn" class="text-dark font-weight-bold">Log out</a>`
  });

  $('#welcomeUserContainer').on('shown.bs.popover', function() {
    $('#logoutBtn').click(logout);
  });
}


function login() {
  let username = $("#inputUsername").val();
  let pwd = $("#inputPassword").val(); 

  if (username.length < 4 || pwd.length < 4) {
    alert("Username and Password must be at least 4 characters");
    return;
  }
  
  $("#loginModal").modal('toggle');

  setCookie("username", username);
  welcomeUser(username);
}

function welcomeUser(username) {
  $("#loginBtn").toggleClass("d-none");
  $("#welcomeUserContainer").toggleClass("d-none");
  $("#welcomeUserDetail").text(username);
}


function logout() {
  removeCookie("username");
  location.reload();
}


function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function removeCookie(cname) {
  document.cookie = cname + "=";
}



function displayCart() {
  let cartListObject = localStorage.getItem('cartList');
  let cartList = JSON.parse(cartListObject)

  if (jQuery.isEmptyObject(cartList)) {
    return $('#cartContentEmptyWrapper').html();
  } else {
    reloadCart();
    return $('#cartContentWrapper').html()
  }
}

function addToCartTable(addedProductId, quantity) {
  // { prod1: 1, prod2: 5, prod3: 4 }

  let cartListObject = localStorage.getItem('cartList');
  let cartList = JSON.parse(cartListObject)

  if (!cartList) {
    cartList = {};
  }

  let quantityNum = parseInt(quantity);
  
  if (cartList.hasOwnProperty(addedProductId)) {
    let currentQty = parseInt(cartList[addedProductId]) 
    cartList[addedProductId] = currentQty + (quantityNum || 1);
  } else {
    cartList[addedProductId] = quantityNum || 1;
  }

  localStorage.setItem('cartList', JSON.stringify(cartList));
  reloadCart();
}

function reloadCart(cartList) {
  if (!cartList) {
    let cartListObject = localStorage.getItem('cartList');
    cartList = JSON.parse(cartListObject)
  }

  let rows = "";
  let totalPrice = 0;

  for (const [prodId, qty] of Object.entries(cartList)) {
    let product = coffeeProds.find( ({ id }) => id === prodId );

    if (!product) {
      continue;
    }
    let price = product.price * qty
    totalPrice += price
    rows += `
    <tr>
      <td>${product.name}</td>
      <td>${qty}</td>
      <td>$${price}</td>
      <td><a href="#" class="text-danger" onclick="return removeFromCart('${prodId}')">X</a></td>
    </tr>
    `;
  }

  rows += `
  <tr>
    <td></td>
    <td class="font-weight-bolder text-success">Total</td>
    <td class="font-weight-bolder text-success">$${totalPrice}</td>
    <td></td>
  </tr>
  `

  $(".cart-table tbody").empty();
  $(".cart-table tbody").html(rows);
}

function removeFromCart(prodId) {
  let cartListObject = localStorage.getItem('cartList');
  let cartList = JSON.parse(cartListObject)

  if (!cartList || !cartList.hasOwnProperty(prodId)) { return false; }

  delete cartList[prodId];  
  localStorage.setItem('cartList', JSON.stringify(cartList));
  reloadCart();

  return false;
}

function checkout() {
  localStorage.removeItem('cartList');
  $('#cartBtn').popover('hide');
}