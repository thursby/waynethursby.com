if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}


function positionColumns(scroll_pos) {
  if (window.innerWidth >= 600) {
    var leftCol = document.getElementById("left-col");
    var rightCol = document.getElementById("right-col");
    if (scroll_pos >= 100) {
      leftCol.classList.add("left-col-smaller");
      rightCol.classList.add("right-col-smaller");
    } else {
      rightCol.classList.remove("right-col-smaller");
      leftCol.classList.remove("left-col-smaller");
    }
  }
}


let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      positionColumns(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});

