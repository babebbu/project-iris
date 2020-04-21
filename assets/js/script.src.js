'use strict';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!                                                             !!!!
 * !!!!  DO NOT TOUCH ANY LINES OF CLASS 'CELL' AND 'CAROUSEL'      !!!!
 * !!!!  IF YOU ARE NOT SURE OF WHAT ARE YOU GOING TO DO.           !!!!
 * !!!!  WHILE I WROTE, ONLY GOD AND I KNOW,                        !!!!
 * !!!!  NOW, ONLY GOD KNOWS.                                       !!!!
 * !!!!                                                             !!!!
 * !!!!  GOD BLESS YOU.                                             !!!!
 * !!!!                                                             !!!!
 * !!!!  PLEASE ALSO INCREASE THE TIME YOU HAVE WASTED ON EDITING.  !!!!
 * !!!!  TOTAL_HOURS_WASTED = 12                                    !!!!
 * !!!!                                                             !!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

/*
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
        this.wrapper.image = this.slide.find('.slideshow-card-image-wrapper');
        this.wrapper.description = this.slide.find('.slideshow-card-description-wrapper');
        this.index = Cell.counter++;
    }

    activate() {
        this.slide.removeClass('inactive').addClass('active');
        this.wrapper.image.removeClass('col-12').addClass('col-8');
        this.wrapper.description.css('opacity', '0');
        setTimeout(() => {
            this.wrapper.description.removeClass('col-12').addClass('col-4').addClass('active');
            this.wrapper.description.css('opacity', '1');
            this.wrapper.description.find('h3').addClass('active');
        }, 300);
    }

    deactivate() {
        this.wrapper.description.css('opacity', '0');
        this.slide.removeClass('active').addClass('inactive');
        this.wrapper.image.removeClass('col-8').addClass('col-12');
        setTimeout(() => {
            this.wrapper.description.removeClass('col-4').addClass('col-12').removeClass('active');
            this.wrapper.description.css('opacity', '1');
            this.wrapper.description.find('h3').removeClass('active');
        }, 300);

        if (this.isLeftHandSide())
            this.slide.removeClass('right').addClass('left');
        else if (this.isRightHandSide())
            this.slide.removeClass('left').addClass('right');
        else
            this.slide.removeClass('left').removeClass('right');

        if (this.isOverflow())
            this.cell.css('opacity', '0');
        else
            this.cell.css('opacity', '1');
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

    carousel = new Flickity('.carousel', {
        initialIndex: this.INITIAL_INDEX,
        pageDots: false
    });

    cells = [];
    static currentIndex;

    constructor() {
        this.setCurrentIndex(this.INITIAL_INDEX);
        this.setCells();
        this.bindCarouselEvents();
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

*/

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

    carousel = new Flickity('.carousel', {
        initialIndex: this.INITIAL_INDEX,
        pageDots: false
    });

    cells = [];
    static currentIndex;

    constructor() {
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
//adjustOnResize();

function initialize() {
    //initializeCarousel();
    initializeAnimateOnScroll();
    //initializeParallaxBackgrounds();
    //initializeParallaxElements();

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
    //new Carousel();
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

    $("#featured-text-wrapper").paroller({factor: -0.3, type: 'foreground', direction: 'vertical'});
    $("#slideshow-wrapper").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});

        //$("#article-about").paroller({ factor: 0.2, type: 'foreground', direction: 'vertical' });

    //if ($(window).width() <= 768) {
    //} else {
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
    //}

        //$("#article-about").paroller({ factor: 0.2, type: 'foreground', direction: 'vertical' });
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
