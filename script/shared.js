$(document).ready(function () {

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
    content: function () {
      return $('#cartPopoverContainer').html();
    }
  });

  
  
  $('#welcomeUserContainer').popover({
    html: true,
    content: '<a id="logoutBtn" class="text-dark font-weight-bold">Log out</a>'
  });

  $('#welcomeUserContainer').on('shown.bs.popover', function() {
    $("#logoutBtn").click(logout);
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