'use strict';

class Cell {

    cell;
    slide;
    wrapper = {
        image: null,
        description: null
    };
    index;

    static counter = 0;

    constructor(cell) {
        this.cell = $(cell);
        this.slide = this.cell.children('.slide');
        this.wrapper.image = this.slide.find('.slide-image-wrapper');
        this.wrapper.description = this.slide.find('.slide-description-wrapper');
        this.index = Cell.counter++;
    }

    activate() {

    }

    deactivate() {
        if (this.isLeftHandSide()) {
            this.slide.removeClass('right').addClass('left');
        } else if (this.isRightHandSide()) {
            this.slide.removeClass('left').addClass('right');
        } else {
            this.slide.removeClass('left').removeClass('right');
        }

        if(this.isOverflow()) {
            this.cell.css('opacity', '0');
        } else {
            this.cell.css('opacity', '1');
        }
    }

    isLeftHandSide() {
        return this.getCarouselIndexDifference() > 0;
    }

    isRightHandSide() {
        return this.getCarouselIndexDifference() < 0;
    }

    isOverflow(index) {
        return this.getCarouselIndexDifference() < -1 || this.getCarouselIndexDifference() > 1;
    }

    getCarouselIndexDifference() {
        return Carousel.getIndexDifference(this.index);
    }
}

class Carousel {

    INITIAL_INDEX = 1;

    carousel;

    cells = [];
    static currentIndex;

    constructor(selector, wrapAround) {

        this.carousel = new Flickity(selector, {
            initialIndex: this.INITIAL_INDEX,
            pageDots: false,
            wrapAround: wrapAround
        });

        this.setCurrentIndex(this.INITIAL_INDEX);
        this.setCells();
        this.bindCarouselEvents()
    }

    setCurrentIndex(index) {
        Carousel.currentIndex = index;
    }

    setCells() {
        $('.carousel').find('.carousel-cell').toArray().forEach(carouselCell => {
            this.cells.push(new Cell(carouselCell));
        });
    }

    bindCarouselEvents() {
        this.carousel.on('change', (index) => {
            Carousel.currentIndex = index;
            this.cells.forEach(cell => cell.deactivate());
            this.cells[index].activate();
        });
    }

    static getIndexDifference(index) {
        return Carousel.currentIndex - index;
    }
}

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
let selectedCellIndex = 1;
let previousCellIndex = 0;

let isCardVisionInitialized = false;
let isCardVisionSmallInitialized = false;
let cardVisionParollerDirection;

initialize();
adjustOnResize();

function initialize() {
    smoothScroll();
    initializeCarousel();
    initializeAnimateOnScroll();
    initializeParallaxBackgrounds();
    initializeParallaxElements();

    window.onscroll = function() {scrollFunction()};
}

let hamburgerActive = false;
let hamburgerMenuHeight = '275px';
const startPosition = 150;
let onScroll = false;

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
        $('#hamburger').css('margin-top', '-'+hamburgerMenuHeight);
    } else if (expected || hamburgerActive === false) {
        hamburgerActive = true;
        $("#main-navigation").addClass('bg-dark-transparent');
        $('#hamburger').css('margin-top', '0px');
    }
}

function smoothScroll() {
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 69,
            },
            500,
            'linear'
        );
    });
}

function adjustOnResize() {
    $(window).resize(() => {
        let width = $(window).width();
        if (width <= 768 && isCardVisionSmallInitialized === false) {
            isCardVisionSmallInitialized = true;
            console.log($(window).width());
            $(".card-vision#icon-1-sm").paroller({factor: -0.0, type: 'foreground', direction: 'horizontal'});
            $(".card-vision#icon-2-sm").paroller({factor: 0.0, type: 'foreground', direction: 'horizontal'});
            $(".card-vision#icon-3-sm").paroller({factor: -0.0, type: 'foreground', direction: 'horizontal'});
        }
        if (width > 768 && isCardVisionInitialized === false) {
            isCardVisionInitialized = true;
            console.log($(window).width());
            $(".card-vision#icon-1").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});
            $(".card-vision#icon-2").paroller({factor: 0.15, type: 'foreground', direction: 'vertical'});
            $(".card-vision#icon-3").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});
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
    $('section#intro').parallax({src: 'assets/images/bg-intro.jpg', speed: 0.3, iosFix: true, androidFix: true});
    $('section#about').parallax({src: 'assets/images/bg-about.jpg', speed: 0.3, iosFix: true, androidFix: true});
    $('section#solution').parallax({src: 'assets/images/bg-solution.jpg', posY: 'top', speed: 0.8, iosFix: true, androidFix: true});
    $('section#equipment').parallax({src: 'assets/images/bg-equipment.jpg', posY: 'bottom', speed: 0.8, iosFix: true, androidFix: true});
    $('section#contact').parallax({src: 'assets/images/bg-contact.jpg',posY: 'bottom',speed: 0.8, iosFix: true, androidFix: true});
}

function initializeParallaxElements() {

    let width = $(window).width();

    if (width <= 768) {
        isCardVisionSmallInitialized = true;
        $(".card-vision#icon-1-sm").paroller({factor: -0.0, type: 'foreground', direction: 'horizontal'});
        $(".card-vision#icon-2-sm").paroller({factor: -0.0, type: 'foreground', direction: 'horizontal'});
        $(".card-vision#icon-3-sm").paroller({factor: -0.0, type: 'foreground', direction: 'horizontal'});
    }
    if (width > 768) {
        isCardVisionInitialized = true;
        $(".card-vision#icon-1").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});
        $(".card-vision#icon-2").paroller({factor: 0.15, type: 'foreground', direction: 'vertical'});
        $(".card-vision#icon-3").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});
    }
}

function toggleProductList(icon, listId) {
    let element = $(`#${listId}`);
    let state = element.css('opacity');
    if(state === '0') {
        $(icon).addClass('active');
        element.css('opacity', 1);
    }
    if(state === '1') {
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
