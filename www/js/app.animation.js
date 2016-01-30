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
});