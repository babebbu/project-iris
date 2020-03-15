class Carousel {

    constructor() {
        const INITIAL_INDEX = 1;
        this.currentIndex = INITIAL_INDEX;
        this.flickity = new Flickity('.carousel', {
            initialIndex: INITIAL_INDEX,
            pageDots: false,
        });
        this.flickity.on('change', (index) => {
            this.currentIndex = index;
            let cell = $('.carousel').find('.carousel-cell')[index];
            let contentWrapper = $(cell).children('.content-wrapper');
            this.deactivateContentWrapper();
            this.activateContentWrapper(contentWrapper);
            //this.hideOverflow();
        })
    }

    activateContentWrapper(contentWrapper) {

        console.debug(contentWrapper.html());

        contentWrapper.addClass('active');

        contentWrapper.find('.cell-content-inactive')
            .removeClass('d-block')
            .addClass('d-none');

        contentWrapper.find('.cell-content-active')
            .removeClass('d-none')
            .addClass('d-block')

    }

    deactivateContentWrapper() {
        for(let i = 0; i < this.getCells().length; i++) {
            let cell = $(this.getCell(i));
            let wrapper = cell.children('.content-wrapper');

            $('.content-wrapper').removeClass('active');

            cell.find('.cell-content-inactive')
                .removeClass('d-none')
                .addClass('d-block')
                .css('width', '350px');

            cell.find('.cell-content-active')
                .removeClass('d-block')
                .addClass('d-none');

            //console.debug(`currentIndex = ${this.currentIndex}, i = ${i}, diff = ${this.currentIndex - i}`);

            if(this.isLeftHandSide(i)) {
                cell.find('.cell-content-inactive').css('margin-left', 'auto');
                cell.find('.cell-content-inactive').css('margin-right', '-45px');
            }
            else if(this.isRightHandSide(i)) {
                cell.find('.cell-content-inactive').css('margin-left', '-45px');
                cell.find('.cell-content-inactive').css('margin-right', 'auto');
            }

            if(this.isOverflow(i)) {
                cell.css('opacity', '0');
            }
            else {
                cell.css('opacity', '1');
            }

        }
    }

    hideOverflow() {
        console.debug(`currentCell = ${this.currentIndex}`)
    }

    getCell(index) {
        return this.getCells()[index];
    }

    getCells() {
        return $('.carousel').find('.carousel-cell');
    }

    getIndexDifference(index) {
        return this.currentIndex - index;
    }

    isLeftHandSide(index) {
        return this.getIndexDifference(index) > 0;
    }

    isRightHandSide(index) {
        return this.getIndexDifference(index) < 0;
    }

    isOverflow(index) {
        return this.getIndexDifference(index) < -1 || this.getIndexDifference(index) > 1
    }
}

// STATE
let selectedCellIndex = 1;
let previousCellIndex = 0;

initialize();
adjustOnResize();

function initialize() {
    initializeCarousel();
    initializeAnimateOnScroll();
    initializeParallaxBackgrounds();
    initializeParallaxElements();
}

function getParallaxElementsConfig() {
    if($(window).width() <= 1200) {
        return {
            direction: {
                vision: 'horizontal'
            }
        }
    } else {
        return {
            direction: {
                vision: 'vertical'
            }
        }
    }
}

function adjustOnResize() {
    $(window).resize(() => {
        adjustParallaxElements();
    });
}

function adjustParallaxElements() {
    initializeParallaxElements({
        direction: {
            vision: 'vertical'
        }
    })
}

function initializeCarousel() {
    new Carousel();
}

function initializeAnimateOnScroll() {
    AOS.init();
}

function initializeParallaxBackgrounds() {
    $('section#intro').parallax({src: 'assets/images/bg-intro.jpg', speed: 0.3,});
    $('section#about').parallax({src: 'assets/images/bg-about.jpg', speed: 0.3,});
    $('section#solution').parallax({src: 'assets/images/bg-solution.jpg', posY: 'top', speed: 0.8,});
    $('section#equipment').parallax({src: 'assets/images/bg-equipment.jpg', posY: 'bottom', speed: 0.8,});
    $('section#contact').parallax({src: 'assets/images/bg-contact.jpg',posY: 'bottom',speed: 0.8,});
}

function initializeParallaxElements() {
    $("#featured-text-wrapper").paroller({factor: -0.3, type: 'foreground', direction: 'vertical'});
    $("#slideshow-wrapper").paroller({factor: -0.1, type: 'foreground', direction: 'vertical'});

    if($(window).width() <= 1200) {
        //$("#article-about").paroller({ factor: 0.2, type: 'foreground', direction: 'vertical' });

        $(".card-vision#icon-1").paroller({factor: 0, type: 'foreground', direction: 'vertical'});
        $(".card-vision#icon-2").paroller({factor: 0, type: 'foreground', direction: 'vertical'});
        $(".card-vision#icon-3").paroller({factor: 0, type: 'foreground', direction: 'vertical'});
    }
    else {
        //$("#article-about").paroller({ factor: 0.2, type: 'foreground', direction: 'vertical' });

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
