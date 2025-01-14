function makeSectionNav() {
  if (doesSideNavExist()) {
    var $navList = $("<ul>");
    $("header").attr("id", "top");
    $navList.append("<li><a href='#top'>Top</a>");
    $("section").each(function(index, section) {
      var title = $(section).attr("title");
      var id = "#" + $(section).attr("id");
      if (typeof title !== "undefined") {
        $navList.append("<li><a href='" + id + "'>" + title + "</a></li>");
      }
    });
    $("#sectionNav").append($navList)
    $("#sectionNav").addClass("vertNav");
    $("main > div").addClass("padLeft");
    $("#sectionNav").prependTo("main");
    handleWindowWidth();
  }
}

function doesSideNavExist() {
  return ($("nav#sectionNav").length > 0);
}

function isSideNavVisible() {
  var width = $(window).width();
  return width > 900;
}

function handleWindowWidth() {
  var amountScrolled = 150;
  
  $("main").css("width", Math.min(900, $(window).width()));
  $("main > div").css("width", Math.min(720, $(window).width()));
  if (isSideNavVisible() && doesSideNavExist()) {
    if ($(window).scrollTop() > amountScrolled) {
      $('#topButton').fadeIn('slow');
    }
    $("#topButton").css("left", ($(window).width() - 900) / 2 + 90 - 60 / 2);
    $("#sectionNav").removeClass("hide");
    $("main > div").removeClass("cenDiv")
    $("main > div").addClass("padLeft")
  } else {
    $('#topButton').fadeOut('slow');
    $("#sectionNav").addClass("hide");
    $("main > div").removeClass("padLeft")
    $("main > div").addClass("cenDiv")
  }
}

function makeSiteNav() {
  if ($("#siteNav").length > 0 && typeof getTopNavList == "function") {
    $navList = getTopNavList();
    $("#siteNav").append($navList);
    $("#siteNav").addClass("horizNav");
  }
}

function makeFooter() {
  if ($("footer").length > 0 && typeof getFooterContent == "function") {
    var $footerContent = getFooterContent();
    $("footer").append($footerContent);
  }
}

function makeBackToTopButton() {
    $("main").prepend('<a href="#" id="topButton">Back to Top</a>');
    $("#topButton").click(function() {
      	$('html, body').animate({
  	    	scrollTop: 0
      	}, 700);
  	    return false;
    });
    $("#topButton").css("left", ($(window).width() - 900) / 2 + 90 - 60 / 2);

  var amountScrolled = 150;

  $(window).scroll(function() {
  	if ( $(window).scrollTop() > amountScrolled ) {
  		if (isSideNavVisible() && doesSideNavExist()) {
            $('#topButton').fadeIn('slow');
        }
  	} else {
  		$('#topButton').fadeOut('slow');
  	}
  });
}

function makeStandardStuff() {
  // makes the section nav list
  // if a nav#sectionNav exists
  makeSectionNav();
  
  // this function calls 
  makeBackToTopButton();

  // imports a couple of functions to customize the stuff on your website
  $.getScript("/scripts/makeMyStuff.js").done(function() {
    // makeOtherStuff();
    makeSiteNav();
    makeFooter();
  }).fail(function( jqxhr, settings, exception ) {
    console.log(jqxhr);
    console.log(settings);
    console.log(exception);
  });

  // this handles the section nav and "to top" button showing up 
  // and being in the right place
  handleWindowWidth();
  window.onresize = handleWindowWidth;
}

(function(i,s,o,g,r,a,m) { 
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r] || function() {
        (i[r].q=i[r].q||[]).push(arguments)
    }, i[r].l=1*new Date();
    a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m)
})
(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-92960895-1', 'auto');
ga('send', 'pageview');

