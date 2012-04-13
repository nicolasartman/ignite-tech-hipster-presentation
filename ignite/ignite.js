/*
  Ignite Specific Additions - 
  this should not be taken an example of good code by anyone
*/
(function($, deck, undefined) {
	var $d = $(document)
	
	// TODO: change to false to enable auto-advance
	var autoAdvancing = false
	
	var timers = {}
	
	// interval timer for auto-advance
	var autoAdvanceTimer
	
	// Toggle timers for fadein/fadeout
	var enableTimer = true
	
	// Enable/disable timers for transitions and builds
  $d.bind('deck.init', function () {
    $d.bind('keydown', function(event) {
      if (event.which === 84) {
        // disable timers
        if (enableTimer) {
          console.log("transition timing disabled")
          enableTimer = false
        }
        else {
          enableTimer = true
          console.log("transition timing enabled")
        }
      }
      if (event.which === 65) {
        // reset current autoadvance timer
        clearInterval(autoAdvanceTimer)
        if (autoAdvanceTimer === null) {
          console.log("autoadvance disabled")
          // true makes it not start the autoadvance timer again
          autoAdvancing = true
          // clears the timer so it can be reenabled
          autoAdvanceTimer = null
        }
        else {
          console.log("autoadvance enabled - will start on next slide change")
          // will restart auto-advance on next slide transition
          autoAdvancing = false
        }
      }
    })
  })
	
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
      autoAdvanceTimer = setInterval(function () {
          $.deck('next')
      }, 15000)
    }
	})
})(jQuery, 'deck');