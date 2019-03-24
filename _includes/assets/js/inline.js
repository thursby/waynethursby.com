if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}


function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function positionColumns(scroll_pos) {
    var leftCol = document.getElementById("left-col");
    var rightCol = document.getElementById("right-col");
    if (window.innerWidth >= 600 && scroll_pos >= 100) {
      leftCol.classList.add("left-col-smaller");
      rightCol.classList.add("right-col-smaller");
      
      var leftColWidth = convertRemToPixels(13);
      var rightColMargin = convertRemToPixels(4);
      var rightColWidth = window.innerWidth - leftColWidth - rightColMargin;
      
      rightCol.style.width = rightColWidth + "px";
    } else if (scroll_pos == 0) {
      rightCol.classList.remove("right-col-smaller");
      leftCol.classList.remove("left-col-smaller");
      if (window.innerWidth >= 600) {
        rightCol.style.width = "60%";
      } else {
        rightCol.style.width = "100%";
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

