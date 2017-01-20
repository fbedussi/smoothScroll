(function() {
    var end = null;
    var scrollingElement = document.scrollingElement || document.documentElement;
    var initialScrollStepWidth = 60;
    var multiplier = 3;
    var delta;
    var step;
    var scrollStepWidth;
    
    /**
     * @desc normalize the wheel deltaY
     * @param {event} e
     * @returns {}
     */
    function wheelDistance(e) {
        switch (e.deltaMode) {
            case 0:
                return e.deltaY;
            case 1:
                return e.deltaY * 30;
            case 2:
                return e.deltaY / 30;
            default:
                return e.deltaY;
        }
    }
    
    /**
     * @desc returns true if the page has scrolled past the end value
     * @param {number} scrollTop
     * @param {number} end
     * @param {number} step
     * @returns {bool}
     */
    function endReached(scrollTop, end, step) {
        if (!end) {
            return true;
        }
    
        if (step > 0) {
            return scrollTop > end;
        } else {
            return scrollTop < end;
        }
    }
    
    /**
     * @desc smoth page scroll when scrolling with mousewheel/touchpad
     * @param {event} e
     * @returns {}
     */
    function smoothScroll(e) {
        /**
         * @desc execute the scroll
         * @returns {}
         */
        function scroll() {
            var scrollTop = scrollingElement.scrollTop;
            step = delta / scrollStepWidth++;
    
            //console.log("scrollTop", scrollTop, "prevScrollTop", prevScrollTop, "end", end, "step", step, "delta", delta, "scrollStepWidth", scrollStepWidth);
    
            if (!endReached(scrollTop, end, step) && step !== 0) {
                scrollingElement.scrollTop = scrollTop + step;
                window.requestAnimationFrame(scroll);
            }
        }
    
        scrollStepWidth = initialScrollStepWidth;
        delta = wheelDistance(e) * multiplier;
    
        end = scrollingElement.scrollTop + delta;
        //console.log('delta', delta);
        window.requestAnimationFrame(scroll);
    }
    
    scrollingElement.addEventListener('wheel', (e) => {
        e.preventDefault();
        window.requestAnimationFrame(() => smoothScroll(e));
    });
})();