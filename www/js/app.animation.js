angular.module('app.animations', [])

.animation('.my-show-hide-animation', function() {
  return {
    beforeAddClass : function(element, className, done) {
      if(className == 'ng-hide') {
        jQuery(element).animate({
          opacity:0
        }, done);
      }
      else {
        done();
      }
    },
    removeClass : function(element, className, done) {
      if(className == 'ng-hide') {
        element.css('opacity',0);
        jQuery(element).animate({
          opacity:1
        }, done);
      }
      else {
        done();
      }
    }
  };
})

.animation('.my-toggle-animation', function() {
  return {
    beforeAddClass : function(element, className, done) {
      if(className == 'disabled') {
        jQuery(element).animate({
          'color':'#666666',
          'background':'#AAAAAA'
        }, done);
      }
      else {
        done();
      }
    },

    beforeRemoveClass : function(element, className, done) {
      if(className == 'disabled') {
        jQuery(element).animate({
          'color':'#000000',
          'background':'#FFFFFF'
        }, done);
      }
      else {
        done();
      }
    }
  };
})

.animation('.my-switch-animation', function() {
  return {
    enter : function(element, done) {
      element = jQuery(element);
      element.css({
        position:'absolute',
        height:500,
        right:element.parent().width()
      });
      element.animate({
        right:0
      }, done);
    },

    leave : function(element, done) {
      element = jQuery(element);
      element.css({
        position:'absolute',
        height:500,
        right:0
      });
      element.animate({
        right:-element.parent().width()
      }, done);
    }
  };
})

.animation('.my-slide-animation', function() {
  return {
    enter : function(element, done) {
      jQuery(element).css({
        position:'absolute',
        'z-index':100,
        top:600,
        opacity:0
      });
      jQuery(element).animate({
        top:0,
        opacity:1
      }, done);
    },

    leave : function(element, done) {
      jQuery(element).css({
        position:'absolute',
        'z-index':101,
        top:0,
        opacity:1
      });
      jQuery(element).animate({
        top:-600,
        opacity:0
      }, done);
    }
  };
})



.animation('.slide-right-to-left', function() {
  return {
    enter : function(element, done) {
      jQuery(element).css({
        position:'absolute',
        'z-index':100,
        left:600,
        opacity:1
      });
      jQuery(element).animate({
        left:0,
        opacity:1
      }, done);
    },

    leave : function(element, done) {
      jQuery(element).css({
        position:'absolute',
        'z-index':101,
        left:0,
        opacity:1
      });
      jQuery(element).animate({
        left:-600,
        opacity:0
      }, done);
    }
  };
})



.animation('.my-repeat-animation', function() {
  return {
    enter : function(element, done) {
      jQuery(element).css({
        position:'relative',
        left:-10,
        opacity:0
      });
      jQuery(element).animate({
        left:0,
        opacity:1
      }, done);
    },

    leave : function(element, done) {
      jQuery(element).css({
        position:'relative',
        left:0,
        opacity:1
      });
      jQuery(element).animate({
        left:-10,
        opacity:0
      }, done);
    },

    move : function(element, done) {
      jQuery(element).css({
        opacity:0.5
      });
      jQuery(element).animate({
        opacity:1
      }, done);
    }
  };
})

.animation('.my-special-animation', function() {
  return {
    enter : function(element, done) {
      jQuery(element).css({
        color:'#FF0000'
      });

      //node the done method here as the 2nd param
      jQuery(element).animate({
        color:'#0000FF'
      }, done);

      return function(cancelled) {
        /* this (optional) function is called when the animation is complete
           or when the animation has been cancelled (which is when
           another animation is started on the same element while the
           current animation is still in progress). */
        if(cancelled) {
          jQuery(element).stop();
        }
      }
    },

    leave : function(element, done) { done(); },
    move : function(element, done) { done(); },

    beforeAddClass : function(element, className, done) { done(); },
    addClass : function(element, className, done) { done(); },

    beforeRemoveClass : function(element, className, done) { done(); },
    removeClass : function(element, className, done) { done(); },

    allowCancel : function(element, event, className) {}
  };
})

.animation('.repeat-animation',
  ['$timeout', function($timeout) {

  var queue = {
    enter : [], leave : []
  };
  function queueAnimation(event, delay, fn) {
    var timeouts = [];
    var index = queue[event].length;
    queue[event].push(fn);
    queue[event].timer && $timeout.cancel(queue[event].timer);
    queue[event].timer = $timeout(function() {
      angular.forEach(queue[event], function(fn, index) {
        timeouts[index] = $timeout(fn, index * delay * 1000, false);
      });
      queue[event] = [];
    }, 10, false);

    return function() {
      if(timeouts[index]) {
        $timeout.cancel(timeouts[index]);
      } else {
        queue[index] = angular.noop;
      }
    }
  };

  return {
    enter : function(element, done) {
      element = $(element[0]);
      var cancel = queueAnimation('enter', 0.2, function() {
        element.css({ top : -20 });
        element.animate({ top : 0 }, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          element.css({ top : 0 });
        };
      });
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    },
    leave : function(element, done) {
      element = $(element[0]);
      var cancel = queueAnimation('leave', 0.2, function() {
        element.css({ top : 0 });
        element.animate({ top : -20 }, done);
        var cancelFn = cancel;
        cancel = function() {
          cancelFn();
          element.stop();
          //no point in animating a removed element
        };
      });
      return function onClose(cancelled) {
        cancelled && cancel();
      };
    }
  }
}]);