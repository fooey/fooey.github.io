'use strict';

const _ = require('lodash');


module.exports = function($win) {
    // let $nav2 = $('#navbar2');

    const navHeight = 60;
    const minWidth  = 768;

    let $hamburger  = $('#hamburger');
    let $toggle     = $hamburger.find('.toggle');
    let $menu       = $hamburger.find('.menu');

    let winWidth    = $win.width();
    let isVisible   = false;

    $toggle.find('.open').on('click', toggleToggler.bind($toggle, true));
    $toggle.find('.close').on('click', toggleToggler.bind($toggle, false));
    $menu.on('click', toggleToggler.bind($toggle, false));


    function enableToggler(winScroll) {
        const smallWindow = winWidth <= minWidth;
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



    const navSlider = _.throttle(function() {
        const winScroll = $win.scrollTop();

        enableToggler(winScroll);

    }, 1000 / 60);




    $win.resize(function(){
        winWidth = $win.width();

        navSlider();
    });

    $win.scroll(navSlider);
    navSlider();



};