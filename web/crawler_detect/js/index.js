(function(){
    function videoSuport(){
        let v = document.createElement("video");
        if(v.canPlayType){
            return v.canPlayType("video/mp4");
        }
        return "Not suport video/mp4";
    }
    function origin() {
        if (typeof window.orientation !== "undefined") {
            return window.orientation;
        }
        return "undefined";
    }
    function touchDevice() {
        let touchDevice = ("ontouchstart" in document.documentElement);
        return touchDevice;
    }
    function mediaFeatures() {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features
        let match = window.matchMedia || window.msMatchMedia;
        if(match) {
            var mq = match("(pointer:coarse)");
            return mq.matches;
        }
        return false;
    }
    function touchEvent() {
        try {
            document.createEvent("TouchEvent");
            return true;
        }
        catch(e){
            return false;
        }
    }

    function buildTable(data) {
        let keys = [];
        let values = [];
        for(let key in data) {
            keys.push(key);
            values.push("" + data[key]);
        }
        new gridjs.Grid({
            columns: keys,
            data: [
                values,
            ]
        }).render(document.getElementById("data"));
    }
    function main(){
        let info = {
            videoSuport: videoSuport(),
            origin: origin(),
            touchDevice: touchDevice(),
            mediaFeatures: mediaFeatures(),
            maxTouchPoint: window.navigator.maxTouchPoints,
            touchEvent: touchEvent(),
        }
        buildTable(info);
    }
    main();
})()
