// =================================
// Global variables (jshint):

/*global touchSupport*/
/*global isAndroid*/
///*global isIOS*/
// =================================

jQuery(function($) {
    // Caching variables
    var $html = $('html');
    var $mainNavigation = $('.js__main-navigation');
    var $openSubMenuLink = $('.js__main-navigation__open-sub-menu-link');
    var $mainNavigationItemsList = $mainNavigation.find('.js__main-navigation__items-list').children('li');

    //var $mainNavigationItemsListSub = ('.main-navigation__item._sub');
    var $dropdownMenuWithColumns = $('.js__dropdown-menu-with-columns .js__main-navigation__item._sub');
    if (!touchSupport) {
        $dropdownMenuWithColumns.hover(function() {
            $(this).toggleClass('open');
        });
    }

    // Cleanup function to clean unneeded classes
    var cleanup = function() {
        $mainNavigationItemsList.removeClass('_open-mobile-dropdown _open-tablet-dropdown');
        $html.removeClass('mobile-menu-opened');

        if (window.matchMedia('(min-width: 992px)').matches) {
            $('.js__navigation__items-wrp').show();
        } else {
            $('.js__navigation__items-wrp').hide();
        }
    };

    // Add click event to dropdown link on mobile devices.
    $openSubMenuLink.on('click', function(e) {
        e.preventDefault();
        // if (touchSupport && $(window).width() > 992) {
        if (window.matchMedia('(min-width: 992px)').matches) {
            $mainNavigationItemsList.not($(this).parents()).removeClass('_open-tablet-dropdown');
            $(this).parents('.main-navigation__item').toggleClass('_open-tablet-dropdown');
        } else {
            $(this).parents('.main-navigation__item').toggleClass('_open-mobile-dropdown');
        }
    });

    $(window).on('orientationchange',function() {
        cleanup();
    });

    var mobileMenuAnimationComplete = true;
    $('.js__main-navigation__toggle-btn').on('click', function(e) {
        e.preventDefault();
        if (mobileMenuAnimationComplete) {
            mobileMenuAnimationComplete = false;
            $html.toggleClass('mobile-menu-opened');
        }
        $('.js__navigation__items-wrp').not(':animated').slideToggle(300, function() {
            mobileMenuAnimationComplete = true;
        });
    });

});

// ====== class fo fixed main navigation bar   =======
jQuery(function($) {
    var navbar = $('.js__main-navigation');

    if (navbar.length) {
        var offsetTop = navbar.offset().top;

        // function that calculates offsetTop-value.
        var calcOffsetTop = function() {
            if (window.matchMedia('(min-width: 992px)').matches) {
                var navbarPos = navbar.css('position');
                offsetTop = $('header').height() - (navbarPos === 'fixed' ? 0 : navbar.outerHeight());
            }
        };

        $(window).on('orientationchange',function() {
            calcOffsetTop();
        });

        $(window).on('load scroll', function() {
            var scrollPos = $(window).scrollTop();
            if (scrollPos > offsetTop) {
                $('body').addClass('main-navigation-fixed');
            } else {
                $('body').removeClass('main-navigation-fixed');
            }
        });
    }
});

jQuery(function($) {
    var $mainNavigationSearchBtn = $('.js__main-navigation__search-btn');
    var $mainNavigationSearchBox = $('.js__main-navigation__search-box');
    var $mainNavigationSearchBoxOverlay = $('.js__main-navigation__search-box-overlay');

    var $languageMenuOverlay = $('.js__header-top__language-menu-overlay');
    var $languageMenuBtn = $('.js__header-top__language-menu-btn');
    var $languageMenuBox = $('.js__header-top__language-menu-box');
    var $languageMenuBoxCloseBtn = $('.js__header-top__language-menu-box-close-btn');

    $mainNavigationSearchBtn.on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('_search-close-btn');
        $mainNavigationSearchBox.toggleClass('_search-box-visible');
        if ($mainNavigationSearchBox.hasClass('_search-box-visible')) {
            $mainNavigationSearchBox.find('input[type="search"]').focus();
        }
        $mainNavigationSearchBoxOverlay.toggleClass('_search-box-overlay-visible');
    });
    $mainNavigationSearchBoxOverlay.on('click', function() {
        $(this).toggleClass('_search-box-overlay-visible');
        $mainNavigationSearchBtn.toggleClass('_search-close-btn');
        $mainNavigationSearchBox.toggleClass('_search-box-visible');
    });

    $languageMenuBtn.on('click', function(e) {
        e.preventDefault();
        $languageMenuBox.addClass('_language-menu-box-visible');
        $languageMenuOverlay.toggleClass('_language-menu-box-overlay-visible');
    });
    $languageMenuOverlay.on('click', function() {
        $(this).toggleClass('_language-menu-box-overlay-visible');
        $languageMenuBox.removeClass('_language-menu-box-visible');
    });
    $languageMenuBoxCloseBtn.on('click', function() {
        $languageMenuOverlay.toggleClass('_language-menu-box-overlay-visible');
        $languageMenuBox.removeClass('_language-menu-box-visible');
    });

});
