var $ = require("jquery"),
    transform_property = require("transform-property"),
    translate = function(el, x, y, z) {
        el.style[transform_property] = "translate3d(" +
            (x || 0) + "px, " +
            (y || 0) + "px, " +
            (z || 0) + "px)";
        return el;
    },
    Rx = require("rx") &&
        require("rx-dom") &&
        require("rx-jquery") &&
        require("rxjs-gestures") &&
        require("../lib/rx.easing"),
    
    animationTime = 650 /*ms*/;

$(window)
    .loadAsObservable()
    .map(function() {
        
        $("body").append("<p>tap anywhere to animate the box</p>");
        
        return $("<div class='box'></div>").css({
            "width": "200px",
            "height": "200px",
            "border": "1px solid #333",
            "border-radius": "5px",
            "position": "absolute",
            "top": "50%",
            "left": "50%",
            "margin-top": "-100px",
            "margin-left": "-100px"
        }).appendTo("body");
    })
    .flatMap(function(box) {
        return $(window)
            .tapAsObservable()
            .repeat()
            .flatMapLatest(function(tap) {
                
                var boxW = box.width(),
                    boxH = box.height(),
                    offsetX = (($(window).width() - boxW) * 0.5),
                    offsetY = (($(window).height() - boxH) * 0.5),
                    coords  = box.offset(),
                    startX = coords.left - offsetX,
                    startY = coords.top - offsetY,
                    endX = tap.global.x - offsetX - (boxW * 0.5),
                    endY = tap.global.y - offsetY - (boxH * 0.5);
                
                // Animate the box coordinates in parallel:
                return Rx.Observable.zip(
                    Rx.Observable.quadOut(startX, endX, animationTime),
                    Rx.Observable.quadOut(startY, endY, animationTime),
                    translate.bind(null, box[0])
                );
                
                // Animate the box coordinates in series:
                return Rx.Observable.concat(
                    Rx.Observable
                        .quadOut(startX, endX, animationTime * 0.5)
                        .map(function(x) { return { x: x } }),
                    Rx.Observable
                        .quadOut(startY, endY, animationTime * 0.5)
                        .map(function(y) { return { y: y }; })
                ).scan({x: startX, y: startY}, function(coords, newCoords) {
                    for(var prop in newCoords) {
                        coords[prop] = newCoords[prop];
                    }
                    translate(box[0], coords.x, coords.y);
                    return coords;
                });
            });
    })
    .publish().connect();
