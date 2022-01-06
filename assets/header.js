
$(document).ready(function () {
  Header.onLoad();
  HeaderSearch.onLoad();
  MobileHeaderMyAccount.onLoad();
  HeaderMyAccount.onLoad();
});

const Header = {
  onLoad: function() {
    $("#logo").click(() => {
      $("#subNavs").toggleClass("hideContent");
    });
  
    $(".nav-link-has-children").mouseenter(function () {
      const menuItem = $(this);
      $(".nav-child-content").each(function () {
        if (menuItem.data('child') !== $(this).attr('id')) {
          if (!$(this).hasClass("hideContent")) {
            $(this).toggleClass("hideContent");
          }
        }
      });
  
      $('#' + menuItem.data('child')).removeClass('hideContent');
      $('.nav-child-content:not(.hideContent) .nav-image').each(function() {
        HeaderUtils.rescaleAspectRatio($(this), 1, 1);
      });

      HeaderSearch.close($('#searchBar'), $('#searchButton'));
      $('#myAccount').addClass('hideContent');
    });
  
    $('.nav-child-content').mouseleave(function () {
      $(this).addClass('hideContent');
    });
  

  },
};

const HeaderSearch = {
  onLoad: function() {
    const searchBtn = $('#searchButton');
    const searchBar = $('#searchBar');
    const myAccount = $('#myAccount');
    this.onToggle(searchBtn, searchBar, myAccount);
    this.onDocumentClick(searchBtn, searchBar);
  },
  onToggle: function (searchBtn, searchBar, myAccount) {
    searchBtn.click(() => {
      searchBar.toggleClass('hideContent');
      $('.searchBar__input').focus();
      if (!searchBar.hasClass('hideContent')) {
        $('.nav-child-content:not(.hideContent)').addClass('hideContent'); // hide all open menus
        searchBtn.find('.fa').show();
      } else {
        searchBtn.find('.fa').hide();
      }
      if (!myAccount.hasClass('hideContent')) myAccount.toggleClass('hideContent')
    })
  },
  onDocumentClick: function(searchBtn, searchBar) {
    $(document).click(function() {
      // if open then close
      if (event.target.id !== 'searchButton' && !searchBar.hasClass('hideContent') && !searchBar.is(event.target) && !searchBar.has(event.target).length) {
        // searchBar.addClass('hideContent');
        // searchBtn.find('.fa').hide();
        HeaderSearch.close(searchBar, searchBtn);
      }
    });
  },
  close: function(searchBar, searchBtn) {
    searchBar.addClass('hideContent');
    searchBtn.find('.fa').hide();
  }
};

const MobileHeaderMyAccount = {
  onLoad: function() {
    this.onToggleMyAccount();
    this.onListenNavbarToggle();
  },
  onToggleMyAccount: function() {
    $('[data-myaccount-toggle]').on('click', function() {
      $('.mobileNav__innerMain').hide();
      $('.mobileNav__innerMyAccount').show();
    });
  },
  onListenNavbarToggle: function() {
    $('#mobileNav__navLinksCarousel').on('slid.bs.carousel', function () {
      $('#mobileNav__navLinksCarousel .carousel-item.active .navLinksCarousel__subNav--image .nav-image').each(function() {
        HeaderUtils.rescaleAspectRatio($(this), 1, 1);
      });
    })
    $('#navbarToggler').on('hidden.bs.collapse', function () {
      $('.mobileNav__subNav').hide();
      $('.mobileNav__innerMain').show();
    })
  },
};

const HeaderMyAccount = {
  onLoad: function() {
    const myAccountBtn = $('#myAccountBtn');
    const myAccount = $('#myAccount');
    const searchBar = $('#searchBar');
    this.onToggle(myAccountBtn, myAccount, searchBar);
    this.onDocumentClick(myAccount);
  },
  onToggle: function (myAccountBtn, myAccount, searchBar) {
    myAccountBtn.click(() => {
      myAccount.toggleClass('hideContent');
      $('.nav-child-content:not(.hideContent)').addClass('hideContent'); // hide all open menus
  
      if (!searchBar.hasClass('hideContent')) {
        searchBar.toggleClass('hideContent');
        $('#searchButton').find('.fa').hide();
      }
    })
  },
  onDocumentClick: function(myAccount) {
    $(document).click(function() {
      if (event.target.id !== 'myAccountBtn' && !myAccount.hasClass('hideContent') && !myAccount.is(event.target) && !myAccount.has(event.target).length) {
        myAccount.addClass('hideContent');
      }
    });
  },
};

const HeaderUtils = {
  rescaleAspectRatio: function( $this, aspect_ratio_width, aspect_ratio_height ) {
    $this.attr('width', '100%');
    const this_width = $this.width();
    const this_new_height = (this_width * aspect_ratio_height) / aspect_ratio_width;
    $this.height(this_new_height);
  },
};
