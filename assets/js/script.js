'use strict';

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cell = /*#__PURE__*/function () {
    function Cell(cell) {
        _classCallCheck(this, Cell);

        _defineProperty(this, "cell", void 0);

        _defineProperty(this, "slide", void 0);

        _defineProperty(this, "wrapper", {
            image: null,
            description: null
        });

        _defineProperty(this, "index", void 0);

        this.cell = $(cell);
        this.slide = this.cell.children('.slide');
        this.wrapper.image = this.slide.find('.slide-image-wrapper');
        this.wrapper.description = this.slide.find('.slide-description-wrapper');
        this.index = Cell.counter++;
    }

    _createClass(Cell, [{
        key: "activate",
        value: function activate() {}
    }, {
        key: "deactivate",
        value: function deactivate() {
            if (this.isLeftHandSide()) {
                this.slide.removeClass('right').addClass('left');
            } else if (this.isRightHandSide()) {
                this.slide.removeClass('left').addClass('right');
            } else {
                this.slide.removeClass('left').removeClass('right');
            }

            if (this.isOverflow()) {
                this.cell.css('opacity', '0');
            } else {
                this.cell.css('opacity', '1');
            }
        }
    }, {
        key: "isLeftHandSide",
        value: function isLeftHandSide() {
            return this.getCarouselIndexDifference() > 0;
        }
    }, {
        key: "isRightHandSide",
        value: function isRightHandSide() {
            return this.getCarouselIndexDifference() < 0;
        }
    }, {
        key: "isOverflow",
        value: function isOverflow(index) {
            return this.getCarouselIndexDifference() < -1 || this.getCarouselIndexDifference() > 1;
        }
    }, {
        key: "getCarouselIndexDifference",
        value: function getCarouselIndexDifference() {
            return Carousel.getIndexDifference(this.index);
        }
    }]);

    return Cell;
}();

_defineProperty(Cell, "counter", 0);

var Carousel = /*#__PURE__*/function () {
    function Carousel(selector, wrapAround) {
        _classCallCheck(this, Carousel);

        _defineProperty(this, "INITIAL_INDEX", 1);

        _defineProperty(this, "carousel", void 0);

        _defineProperty(this, "cells", []);

        this.carousel = new Flickity(selector, {
            initialIndex: this.INITIAL_INDEX,
            pageDots: false,
            wrapAround: wrapAround
        });
        this.setCurrentIndex(this.INITIAL_INDEX);
        this.setCells();
        this.bindCarouselEvents();
    }

    _createClass(Carousel, [{
        key: "setCurrentIndex",
        value: function setCurrentIndex(index) {
            Carousel.currentIndex = index;
        }
    }, {
        key: "setCells",
        value: function setCells() {
            var _this = this;

            $('.carousel').find('.carousel-cell').toArray().forEach(function (carouselCell) {
                _this.cells.push(new Cell(carouselCell));
            });
        }
    }, {
        key: "bindCarouselEvents",
        value: function bindCarouselEvents() {
            var _this2 = this;

            this.carousel.on('change', function (index) {
                Carousel.currentIndex = index;

                _this2.cells.forEach(function (cell) {
                    return cell.deactivate();
                });

                _this2.cells[index].activate();
            });
        }
    }], [{
        key: "getIndexDifference",
        value: function getIndexDifference(index) {
            return Carousel.currentIndex - index;
        }
    }]);

    return Carousel;
}();
/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!                                                             !!!!
 * !!!!                         FINE TUNING                         !!!!
 * !!!!                                                             !!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
// STATE


_defineProperty(Carousel, "currentIndex", void 0);

var selectedCellIndex = 1;
var previousCellIndex = 0;
var isCardVisionInitialized = false;
var isCardVisionSmallInitialized = false;
var cardVisionParollerDirection;
initialize();
adjustOnResize();

function initialize() {
    smoothScroll();
    initializeCarousel();
    initializeAnimateOnScroll();
    initializeParallaxBackgrounds();
    initializeParallaxElements();

    window.onscroll = function () {
        scrollFunction();
    };
}

var hamburgerActive = false;
var hamburgerMenuHeight = '275px';
var startPosition = 150;
var onScroll = false;

function scrollFunction() {
    if (document.body.scrollTop > startPosition || document.documentElement.scrollTop > startPosition) {
        hamburgerActive = true;
        onScroll = true;
        toggleHamburgerMenu(true);

        $("#main-navigation").addClass('scroll').addClass('bg-dark-transparent');
    } else {
        onScroll = false;
        $("#main-navigation").removeClass('scroll').removeClass('bg-dark-transparent');
    }
}

function toggleHamburgerMenu(expected) {
    if (hamburgerActive) {
        hamburgerActive = false;

        if (!onScroll) {
            $("#main-navigation").removeClass('bg-dark-transparent');
        }

        $('#hamburger').css('margin-top', '-' + hamburgerMenuHeight);
    } else if (expected || hamburgerActive === false) {
        hamburgerActive = true;
        $("#main-navigation").addClass('bg-dark-transparent');
        $('#hamburger').css('margin-top', '0px');
    }
}

function smoothScroll() {
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 69
        }, 500, 'linear');
    });
}

function adjustOnResize() {
    $(window).resize(function () {
        var width = $(window).width();

        if (width <= 768 && isCardVisionSmallInitialized === false) {
            isCardVisionSmallInitialized = true;
            console.log($(window).width());
            $(".card-vision#icon-1-sm").paroller({
                factor: -0.0,
                type: 'foreground',
                direction: 'horizontal'
            });
            $(".card-vision#icon-2-sm").paroller({
                factor: 0.0,
                type: 'foreground',
                direction: 'horizontal'
            });
            $(".card-vision#icon-3-sm").paroller({
                factor: -0.0,
                type: 'foreground',
                direction: 'horizontal'
            });
        }

        if (width > 768 && isCardVisionInitialized === false) {
            isCardVisionInitialized = true;
            console.log($(window).width());
            $(".card-vision#icon-1").paroller({
                factor: -0.1,
                type: 'foreground',
                direction: 'vertical'
            });
            $(".card-vision#icon-2").paroller({
                factor: 0.15,
                type: 'foreground',
                direction: 'vertical'
            });
            $(".card-vision#icon-3").paroller({
                factor: -0.1,
                type: 'foreground',
                direction: 'vertical'
            });
        }
    });
}

function initializeCarousel() {
    new Carousel('.carousel', false);
    new Carousel('.carousel-vertical', true);
}

function initializeAnimateOnScroll() {
    AOS.init();
}

function initializeParallaxBackgrounds() {
    $('section#intro').parallax({
        src: 'assets/images/bg-intro.jpg',
        speed: 0.3,
        iosFix: true,
        androidFix: true
    });
    $('section#about').parallax({
        src: 'assets/images/bg-about.jpg',
        speed: 0.3,
        iosFix: true,
        androidFix: true
    });
    $('section#solution').parallax({
        src: 'assets/images/bg-solution.jpg',
        posY: 'top',
        speed: 0.8,
        iosFix: true,
        androidFix: true
    });
    $('section#equipment').parallax({
        src: 'assets/images/bg-equipment.jpg',
        posY: 'bottom',
        speed: 0.8,
        iosFix: true,
        androidFix: true
    });
    $('section#contact').parallax({
        src: 'assets/images/bg-contact.jpg',
        posY: 'bottom',
        speed: 0.8,
        iosFix: true,
        androidFix: true
    });
}

function initializeParallaxElements() {
    var width = $(window).width();

    if (width <= 768) {
        isCardVisionSmallInitialized = true;
        $(".card-vision#icon-1-sm").paroller({
            factor: -0.0,
            type: 'foreground',
            direction: 'horizontal'
        });
        $(".card-vision#icon-2-sm").paroller({
            factor: -0.0,
            type: 'foreground',
            direction: 'horizontal'
        });
        $(".card-vision#icon-3-sm").paroller({
            factor: -0.0,
            type: 'foreground',
            direction: 'horizontal'
        });
    }

    if (width > 768) {
        isCardVisionInitialized = true;
        $(".card-vision#icon-1").paroller({
            factor: -0.1,
            type: 'foreground',
            direction: 'vertical'
        });
        $(".card-vision#icon-2").paroller({
            factor: 0.15,
            type: 'foreground',
            direction: 'vertical'
        });
        $(".card-vision#icon-3").paroller({
            factor: -0.1,
            type: 'foreground',
            direction: 'vertical'
        });
    }

}

function toggleProductList(icon, listId) {
    var element = $("#".concat(listId));
    var state = element.css('opacity');

    if (state === '0') {
        $(icon).addClass('active');
        element.css('opacity', 1);
    }

    if (state === '1') {
        $(icon).removeClass('active');
        element.css('opacity', 0);
    }
}

function toggleHamburgerScroll() {
    if (hamburgerActive) {
        hamburgerActive = false;
        document.getElementById("main-navigation-scroll").style.top = "-284px";
    } else {
        hamburgerActive = true;
        document.getElementById("main-navigation-scroll").style.top = "0px";
    }
}
