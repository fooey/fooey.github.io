'use strict';

const _ = require('lodash');


module.exports = function(scrollListeners) {
    // let $nav2 = $('#navbar2');

    const navHeight = 60;
    const minWidth  = 768;

    let $win       = $(window);
    let $hamburger = $('#hamburger');
    let $toggle    = $hamburger.find('.toggle');
    let $menu      = $hamburger.find('.menu');

    let winWidth  = window.innerWidth;
    let isVisible = false;

    $toggle.find('.open').on('click', toggleToggler.bind($toggle, true));
    $toggle.find('.close').on('click', toggleToggler.bind($toggle, false));
    $menu.on('click', toggleToggler.bind($toggle, false));


    function enableToggler(winScroll) {
        const smallWindow = winWidth < minWidth;
        const winScrolled = winScroll > navHeight;
        const shouldShow  = smallWindow || winScrolled;

        if (!isVisible && shouldShow) {
            $toggle.addClass('enabled');
            isVisible = true;
        }
        else if (isVisible && !shouldShow) {
            $toggle.removeClass('enabled');
            isVisible = false;
        }
    }


    let toggleIsOpen = false;
    function toggleToggler(enable, e) {
        enable = enable || !toggleIsOpen;


        if (enable) {
            $toggle.addClass('active');
            $menu.addClass('enabled');
        }
        else {
            $toggle.removeClass('active');
            $menu.removeClass('enabled');
        }

        toggleIsOpen = enable;
    }



    function navSlider() {
        const winScroll = window.pageYOffset || document.body.scrollTop;

        enableToggler(winScroll);
    }




    $win.resize(_.throttle(function(){
        winWidth = window.innerWidth;

        navSlider();
    }, 1000 / 60));

    navSlider();


    scrollListeners.push(navSlider);
};