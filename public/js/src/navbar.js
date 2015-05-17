'use strict';

const _ = require('lodash');


module.exports = function($win) {
    // let $nav2 = $('#navbar2');
    let $hamburger = $('#hamburger');

    const navHeight = 60;
    const hbBaseOffset = -50;
    const minWidth = 768;

    let winWidth = $win.width();

    let curNavTop;
    // setNavTop(-50);


    const navSlider = _.throttle(function() {
        const winScroll = $win.scrollTop();

        if (winWidth <= minWidth || winScroll > navHeight) {
            setNavTop(10);
        }
        else {
            setNavTop(hbBaseOffset + winScroll);
        }

    }, 1000 / 60);



    function setNavTop(navTop) {
        if (curNavTop !== navTop) {
            $hamburger.css({
                top: `${navTop}px`
            });

            curNavTop = navTop;
        }
    }


    $win.resize(function(){
        winWidth = $win.width();

        navSlider();
    });



    $win.scroll(navSlider);

};