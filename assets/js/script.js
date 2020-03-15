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
    let carousel = $('.carousel').flickity({
        // options
        initialIndex: 1,
        pageDots: false
    });

    carousel.on( 'select.flickity', function( event, index ) {
        console.log( 'Flickity selected cell ' + index );

        previousCellIndex = selectedCellIndex;
        selectedCellIndex = index;

        //const cells = $('.carousel').find('.carousel-cell');

        const previous = index - 1;
        const next = index + 1;

        //const previousCell = cells[previousIndex];
        //const currentCell = cells[index];
        //const nextCell = cells[nextIndex];

        if(previous >= 0) {
            deactivateCarouselCell(getCell(previous));
            //carousel.flickity('reposition');
        }

        if(next < getCells().length) {
            deactivateCarouselCell(getCell(next));
            //carousel.flickity('reposition');
        }

        if(selectedCellIndex - previousCellIndex > 0) {
            showCell(getCell(next));
            hideCell(getCell(previous - 1))
        } else if (selectedCellIndex - previousCellIndex < 0) {
            showCell(getCell(previous));
            hideCell(getCell(next + 1))
        }

        activateCarouselCell(getCell(index));
        //carousel.flickity('reposition');
    });

    carousel.on('change.flickity', function(event, index) {
        console.log('changing');
    })
}

function getCells() {
    return $('.carousel').find('.carousel-cell');
}

function getCell(index) {
    return getCells()[index];
}

function showCell(cell) {
    $(cell).removeClass('d-none').addClass('d-block')
}

function hideCell(cell) {
    $(cell).removeClass('d-block').addClass('d-none')
}

function activateCarouselCell(cell) {
    $(cell)
        .find('.cell-content-inactive')
        .removeClass('d-block')
        .addClass('d-none');
        //.css('height', '0')
        //.css('margin-top', '0')
        //.css('opacity', '0');

    $(cell)
        .find('.cell-content-active')
        .removeClass('d-none')
        .addClass('d-block')
        //.css('opacity', '1');

    $(cell).css('width', '700px');
    $(cell).css('z-index', '5');
}

function deactivateCarouselCell(cell) {
    $(cell)
        .find('.cell-content-inactive')
        .removeClass('d-none')
        .addClass('d-block');

    $(cell)
        .find('.cell-content-active')
        .removeClass('d-block')
        .addClass('d-none');

    $(cell).css('width', '350px');
    $(cell).css('z-index', '0');
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
