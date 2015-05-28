'use strict';

const _ = require('lodash');


module.exports = function($win) {
    // let $nav2 = $('#navbar2');

    const navHeight = 60;
    const minWidth  = 768;

    let $hamburger = $('#hamburger');
    let $toggle    = $hamburger.find('.toggle');
    let $menu      = $hamburger.find('.menu');

    let winWidth     = window.innerWidth;
    let isVisible    = false;

    $toggle.on('click', toggleToggler);
    $menu.on('click', hideMenu);


    function enableToggler(winScroll) {
        const isSmallWindow = winWidth < minWidth;
        const isWinScrolled = winScroll > navHeight;
        const shouldShow  = isSmallWindow || isWinScrolled;

        if (!isVisible && shouldShow) {
            $toggle.addClass('enabled');
            isVisible = true;
        }
        else if (isVisible && !shouldShow) {
            $toggle.removeClass('enabled');
            isVisible = false;
        }
    }


    function toggleToggler() {
        const isEnabled = $menu.hasClass('enabled');

        if (isEnabled) {
            hideMenu();
        }
        else {
            showMenu();
        }
    }

    function showMenu() {
        $toggle.addClass('active');
        $menu.addClass('enabled');
    }

    function hideMenu() {
        $toggle.removeClass('active');
        $menu.removeClass('enabled');
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

    $win.on('throttledScroll', navSlider);
};