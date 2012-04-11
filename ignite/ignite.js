/*
  Ignite Specific Additions
*/
(function($, deck, undefined) {
	var $d = $(document)
	
	var autoAdvancing = false
	
	
	$d.bind('deck.change', function (event, from, to) {
	  $subs = $.deck('getSlide', to).find('.sub')
	  $.each($subs, function(index, sub) {
	    if ($(sub).attr('delay')) {
	      $(sub).hide()
	      // show after the specified time
	      setTimeout(function () {
	        $(sub).show()
	      }, $(sub).attr('delay') * 1000)
	    }
	  })
	  
	  // Enable autoadvance once we reach slide 1
    if (!autoAdvancing && to === 1) {
      $.deck('enableScale')
      console.log("auto-advancing")
      autoAdvancing = true
      // Autoadvance every 15 seconds
      var autoAdvance = setInterval(function () {
          $.deck('next')
      }, 15000)

      clearInterval(autoAdvance)
    }
	})
})(jQuery, 'deck');