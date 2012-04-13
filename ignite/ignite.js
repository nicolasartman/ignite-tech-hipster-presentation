/*
  Ignite Specific Additions - 
  this should not be taken an example of good code by anyone
*/
(function($, deck, undefined) {
	var $d = $(document)
	
	// TODO: change to false to enable auto-advance
	var autoAdvancing = true
	
	var timers = {}
	
	// Toggle timers for fadein/fadeout
	var enableTimer = true
	
	$d.bind('deck.change', function (event, from, to) {
    // console.log("from " + from + " to " + to)
	  var $subs = $.deck('getSlide', to).find('.sub')
    timers[to] = timers[to] || []
	  if (timers[to].length) {
	    // if no timers for that slide, make an array for them
	    // clear any existing timers
	    _.each(timers[to], function (timer) {
	      clearInterval(timer)
	    })
	    timers[to] = []
	  }
    $.each($subs, function(index, sub) {
      // fade in
      if (enableTimer && $(sub).attr('in')) {
        $(sub).hide()
        // show after the specified time
        timers[to].push(setTimeout(function () {
          $(sub).fadeIn(200)
        }, $(sub).attr('in') * 1000))
      }
      // fade out
      if (enableTimer && $(sub).attr('out')) {
        $(sub).show()
        timers[to].push(setTimeout(function () {
          $(sub).fadeOut(200)
        }, $(sub).attr('out') * 1000))
      }
    })
	  
	  // Enable autoadvance once we reach slide 1
    if (!autoAdvancing && to === 1) {
      // $.deck('enableScale')
      console.log("Auto-Advance Enabled")
      autoAdvancing = true
      // Autoadvance every 15 seconds
      var autoAdvance = setInterval(function () {
          $.deck('next')
      }, 15000)
    }
	})
})(jQuery, 'deck');