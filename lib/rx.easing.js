var _  = require('underscore');
var Rx = require('rx');

var Observable = Rx.Observable;
var observableProto = Rx.Observable.prototype;

var frame_rate = 30;
var interval_len = 1000/frame_rate;

var timer = Observable
	.timer(0, interval_len)
	.select(function(i) {
		return i * interval_len;
	});

Observable.backIn       = make_ease_observable(curry_ease_time(backIn));
Observable.backOut      = make_ease_observable(curry_ease_time(backOut));
Observable.backInOut    = make_ease_observable(curry_ease_time(backInOut));
Observable.bounceOut    = make_ease_observable(curry_ease_time(bounceOut));
Observable.bounceIn     = make_ease_observable(curry_ease_time(bounceIn));
Observable.bounceInOut  = make_ease_observable(curry_ease_time(bounceInOut));
Observable.circIn       = make_ease_observable(curry_ease_time(circIn));
Observable.circOut      = make_ease_observable(curry_ease_time(circOut));
Observable.circInOut    = make_ease_observable(curry_ease_time(circInOut));
Observable.cubicIn      = make_ease_observable(curry_ease_time(cubicIn));
Observable.cubicOut     = make_ease_observable(curry_ease_time(cubicOut));
Observable.cubicInOut   = make_ease_observable(curry_ease_time(cubicInOut));
Observable.elasticOut   = make_ease_observable(curry_ease_time(elasticOut));
Observable.elasticIn    = make_ease_observable(curry_ease_time(elasticIn));
Observable.elasticInOut = make_ease_observable(curry_ease_time(elasticInOut));
Observable.expoIn       = make_ease_observable(curry_ease_time(expoIn));
Observable.expoOut      = make_ease_observable(curry_ease_time(expoOut));
Observable.expoInOut    = make_ease_observable(curry_ease_time(expoInOut));
Observable.linear       = make_ease_observable(curry_ease_time(linear));
Observable.quadIn       = make_ease_observable(curry_ease_time(quadIn));
Observable.quadOut      = make_ease_observable(curry_ease_time(quadOut));
Observable.quadInOut    = make_ease_observable(curry_ease_time(quadInOut));
Observable.quartIn      = make_ease_observable(curry_ease_time(quartIn));
Observable.quartOut     = make_ease_observable(curry_ease_time(quartOut));
Observable.quartInOut   = make_ease_observable(curry_ease_time(quartInOut));
Observable.quintIn      = make_ease_observable(curry_ease_time(quintIn));
Observable.quintOut     = make_ease_observable(curry_ease_time(quintOut));
Observable.quintInOut   = make_ease_observable(curry_ease_time(quintInOut));
Observable.sineIn       = make_ease_observable(curry_ease_time(sineIn));
Observable.sineOut      = make_ease_observable(curry_ease_time(sineOut));
Observable.sineInOut    = make_ease_observable(curry_ease_time(sineInOut));
Observable.circleIn     = Observable.circIn;
Observable.circleOut    = Observable.circOut;
Observable.circleInOut  = Observable.circInOut;
Observable.linearNone   = Observable.linear;
Observable.linearIn     = Observable.linear;
Observable.linearOut    = Observable.linear;
Observable.linearInOut  = Observable.linear;

module.exports = Rx;

function make_ease_observable(easing_func) {
	
	return function(begin, end, duration) {
		
		var args = _.toArray(arguments);
		
		// The easing functions use the difference
		// between the start and end values.
		args[1] = end - begin;
		
		return timer
			.takeWithTime(duration)
			.select(easing_func.apply(null, args))
			.concat(Observable.returnValue(end));
	}
}

function curry_ease_time(easing_func) {
	
	return function() {
		
		var args = _.toArray(arguments);
		
		return function(time) {
			return easing_func.apply(null, [time].concat(args));
		}
	}
}

// Shamlessly pulled from Jim Jeffers's Easie: https://github.com/jimjeffers/Easie
// who in turn pulled it from Robert Penner's easing equations: http://robertpenner.com/easing/
// Thanks you guys <3.

function backIn(time, begin, change, duration, overshoot) {
	if (overshoot == null)  overshoot = 1.70158;
	
	return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
}

function backOut(time, begin, change, duration, overshoot) {
	if (overshoot == null) overshoot = 1.70158;
	
	return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
}

function backInOut(time, begin, change, duration, overshoot) {
	if (overshoot == null) overshoot = 1.70158;
	
	if ((time = time / (duration / 2)) < 1) {
		return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
	} else {
		return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
	}
}

function bounceOut(time, begin, change, duration) {
	if ((time /= duration) < 1 / 2.75) {
		return change * (7.5625 * time * time) + begin;
	} else if (time < 2 / 2.75) {
		return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
	} else if (time < 2.5 / 2.75) {
		return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
	} else {
		return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
	}
}

function bounceIn(time, begin, change, duration) {
	return change - bounceOut(duration - time, 0, change, duration) + begin;
}

function bounceInOut(time, begin, change, duration) {
	if (time < duration / 2) {
		return bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
	} else {
		return bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
	}
}

function circIn(time, begin, change, duration) {
	return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
}

function circOut(time, begin, change, duration) {
	return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
}

function circInOut(time, begin, change, duration) {
	if ((time = time / (duration / 2)) < 1) {
		return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
	} else {
		return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
	}
}

function cubicIn(time, begin, change, duration) {
	return change * (time /= duration) * time * time + begin;
}

function cubicOut(time, begin, change, duration) {
	return change * ((time = time / duration - 1) * time * time + 1) + begin;
}

function cubicInOut(time, begin, change, duration) {
	if ((time = time / (duration / 2)) < 1) {
		return change / 2 * time * time * time + begin;
	} else {
		return change / 2 * ((time -= 2) * time * time + 2) + begin;
	}
}

function elasticOut(time, begin, change, duration, amplitude, period) {
	var overshoot;
	if (amplitude == null) {
		amplitude = null;
	}
	if (period == null) {
		period = null;
	}
	if (time === 0) {
		return begin;
	} else if ((time = time / duration) === 1) {
		return begin + change;
	} else {
		if (!(period != null)) {
			period = duration * 0.3;
		}
		if (!(amplitude != null) || amplitude < Math.abs(change)) {
			amplitude = change;
			overshoot = period / 4;
		} else {
			overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
		}
		return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
	}
}

function elasticIn(time, begin, change, duration, amplitude, period) {
	var overshoot;
	if (amplitude == null) {
		amplitude = null;
	}
	if (period == null) {
		period = null;
	}
	if (time === 0) {
		return begin;
	} else if ((time = time / duration) === 1) {
		return begin + change;
	} else {
		if (!(period != null)) {
			period = duration * 0.3;
		}
		if (!(amplitude != null) || amplitude < Math.abs(change)) {
			amplitude = change;
			overshoot = period / 4;
		} else {
			overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
		}
		time -= 1;
		return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
	}
}

function elasticInOut(time, begin, change, duration, amplitude, period) {
	var overshoot;
	if (amplitude == null) {
		amplitude = null;
	}
	if (period == null) {
		period = null;
	}
	if (time === 0) {
		return begin;
	} else if ((time = time / (duration / 2)) === 2) {
		return begin + change;
	} else {
		if (!(period != null)) {
			period = duration * (0.3 * 1.5);
		}
		if (!(amplitude != null) || amplitude < Math.abs(change)) {
			amplitude = change;
			overshoot = period / 4;
		} else {
			overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
		}
		if (time < 1) {
			return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
		} else {
			return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
		}
	}
}

function expoIn(time, begin, change, duration) {
	if (time === 0) {
		return begin;
	}
	return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
}


function expoOut(time, begin, change, duration) {
	if (time === duration) {
		return begin + change;
	}
	return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
}

function expoInOut(time, begin, change, duration) {
	if (time === 0) {
		return begin;
	} else if (time === duration) {
		return begin + change;
	} else if ((time = time / (duration / 2)) < 1) {
		return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
	} else {
		return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
	}
}

function linear(time, begin, change, duration) {
	return change * time / duration + begin;
}

function quadIn(time, begin, change, duration) {
	return change * (time = time / duration) * time + begin;
}

function quadOut(time, begin, change, duration) {
	return -change * (time = time / duration) * (time - 2) + begin;
}

function quadInOut(time, begin, change, duration) {
	if ((time = time / (duration / 2)) < 1) {
		return change / 2 * time * time + begin;
	} else {
		return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
	}
}

function quartIn(time, begin, change, duration) {
	return change * (time = time / duration) * time * time * time + begin;
}

function quartOut(time, begin, change, duration) {
	return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
}

function quartInOut(time, begin, change, duration) {
	if ((time = time / (duration / 2)) < 1) {
		return change / 2 * time * time * time * time + begin;
	} else {
		return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
	}
}

function quintIn(time, begin, change, duration) {
	return change * (time = time / duration) * time * time * time * time + begin;
}

function quintOut(time, begin, change, duration) {
	return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
}

function quintInOut(time, begin, change, duration) {
	if ((time = time / (duration / 2)) < 1) {
		return change / 2 * time * time * time * time * time + begin;
	} else {
		return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
	}
}

function sineIn(time, begin, change, duration) {
	return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
}

function sineOut(time, begin, change, duration) {
	return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
}

function sineInOut(time, begin, change, duration) {
	return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
}

