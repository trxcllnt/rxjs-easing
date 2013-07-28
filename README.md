rx-js-easing
============

Robert Penner's easing functions as Observables.

```javascript

// All easing functions take a begin value, end value, and duration (in ms).
// A few take extra arguments, which I've documented

Observable.backIn       = function(begin, end, duration, overshoot) {};
Observable.backOut      = function(begin, end, duration, overshoot) {};
Observable.backInOut    = function(begin, end, duration, overshoot) {};
Observable.bounceIn     = function(begin, end, duration) {};
Observable.bounceOut    = function(begin, end, duration) {};
Observable.bounceInOut  = function(begin, end, duration) {};
Observable.circIn       = function(begin, end, duration) {};
Observable.circOut      = function(begin, end, duration) {};
Observable.circInOut    = function(begin, end, duration) {};
Observable.cubicIn      = function(begin, end, duration) {};
Observable.cubicOut     = function(begin, end, duration) {};
Observable.cubicInOut   = function(begin, end, duration) {};
Observable.elasticOut   = function(begin, end, duration, amplitude, period) {};
Observable.elasticIn    = function(begin, end, duration, amplitude, period) {};
Observable.elasticInOut = function(begin, end, duration, amplitude, period) {};
Observable.expoIn       = function(begin, end, duration) {};
Observable.expoOut      = function(begin, end, duration) {};
Observable.expoInOut    = function(begin, end, duration) {};
Observable.linear       = function(begin, end, duration) {};
Observable.quadIn       = function(begin, end, duration) {};
Observable.quadOut      = function(begin, end, duration) {};
Observable.quadInOut    = function(begin, end, duration) {};
Observable.quartIn      = function(begin, end, duration) {};
Observable.quartOut     = function(begin, end, duration) {};
Observable.quartInOut   = function(begin, end, duration) {};
Observable.quintIn      = function(begin, end, duration) {};
Observable.quintOut     = function(begin, end, duration) {};
Observable.quintInOut   = function(begin, end, duration) {};
Observable.sineIn       = function(begin, end, duration) {};
Observable.sineOut      = function(begin, end, duration) {};
Observable.sineInOut    = function(begin, end, duration) {};
Observable.circleIn     = function(begin, end, duration) {};
Observable.circleOut    = function(begin, end, duration) {};
Observable.circleInOut  = function(begin, end, duration) {};
Observable.linearNone   = function(begin, end, duration) {};
Observable.linearIn     = function(begin, end, duration) {};
Observable.linearOut    = function(begin, end, duration) {};
Observable.linearInOut  = function(begin, end, duration) {};

```
