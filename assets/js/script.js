
initialize();

function initialize() {
    initializeCarousel();
    initializeAnimateOnScroll();
    initializeParallaxBackgrounds();
    initializeParallaxElements();
}

function initializeCarousel() {
    let carousel = $('.carousel').flickity({
        // options
        initialIndex: 1,
        pageDots: false
    });

    carousel.on( 'settle.flickity', function( event, index ) {
        console.log( 'Flickity settled at ' + index );
        const cells = $('.carousel').find('.carousel-cell');

        const previousIndex = index - 1;
        const nextIndex = index + 1;

        const previousCell = cells[previousIndex];
        const currentCell = cells[index];
        const nextCell = cells[nextIndex];

        if(previousIndex >= 0) {
            deactivateSlideshowCell(previousCell);
            carousel.flickity('resize');
        }

        if(nextIndex < cells.length) {
            deactivateSlideshowCell(nextCell);
            carousel.flickity('resize');
        }

        activateSlideshowCell(currentCell);
        carousel.flickity('resize');
    });
}

function activateSlideshowCell(cell) {
    $(cell)
        .find('.cell-content-inactive')
        .removeClass('d-block')
        .addClass('d-none');

    $(cell)
        .find('.cell-content-active')
        .removeClass('d-none')
        .addClass('d-block');

    $(cell).css('width', '700px');
    $(cell).css('z-index', '5');
}

function deactivateSlideshowCell(cell) {
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
    $("#featured-text-wrapper").paroller({ factor: -0.3, type: 'foreground', direction: 'vertical' });
    $("#slideshow-wrapper").paroller({ factor: -0.1, type: 'foreground', direction: 'vertical' });
    $("#article-about").paroller({ factor: 0.2, type: 'foreground', direction: 'vertical' });

    $(".card-vision#icon-1").paroller({ factor: -0.1, type: 'foreground', direction: 'vertical' });
    $(".card-vision#icon-2").paroller({ factor: 0.15, type: 'foreground', direction: 'vertical' });
    $(".card-vision#icon-3").paroller({ factor: -0.1, type: 'foreground', direction: 'vertical' });
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
