
$(document).ready(function () {
  StickyHeader.onload();
  MobileNav.onLoad();
  BackToTop.onLoad();
  BackToPrevious.onLoad();
  Home.onLoad();
  Collection.onLoad();
  Product.onLoad();
  Cart.onLoad();
  CartSidebar.onLoad();
  Login.onLoad();
  Addresses.onLoad();
  PageWishlist.onLoad();
  Lookbook.onLoad();
  Music.onLoad();
  LiveChat.onLoad();
});

/*
* Make the header sticky 
*/
const StickyHeader = {
  onload: function () {
    const header = $('.header');
    const collection_banner = $('#shopify-section-collection-banner');

    collection_banner_height = 0;
    if (collection_banner.length > 0) {
      collection_banner_height = collection_banner.height();
    }

    $('#MainContent').css({ "margin-top": `${header.height() + collection_banner_height}px` });
    collection_banner.css({ "top": `${header.height()}px` });

    $(window).resize(function () {
      collection_banner_height = 0;
      if (collection_banner.length > 0) {
        collection_banner_height = collection_banner.height();
      }

      $('#MainContent').css({ "margin-top": `${header.height() + collection_banner_height}px` });
      collection_banner.css({ "top": `${header.height()}px` });
    })
  }
}

/*
* Mobile Navigation
*/
const MobileNav = {
  onLoad: function () {
    this.onNavbarHidden();
  },
  onNavbarHidden: function () {
    $('#navbarToggler').on('hidden.bs.collapse', function () {
      MobileNav.resetNavLinksCarousel();
    })
  },
  resetNavLinksCarousel: function () {
    $('#mobileNav__navLinksCarousel').carousel(0);
  },
};

/*
* Back To Top
*/
const BackToTop = {
  onLoad: function () {
    if ($('#btt-btn').length) {
      var bttButton = document.getElementById("btt-btn");
      // When the user scrolls down 20px from the top of the document, show the button
      window.onscroll = function () { BackToTop.scrollFunction(bttButton) };
      bttButton.onclick = function () {
        $('html, body').animate({
          scrollTop: 0
        }, 1000);
      };
    }
  },
  scrollFunction: function (bttButton) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      bttButton.style.display = "block";
    } else {
      bttButton.style.display = "none";
    }
  },
};

/*
* Back to Previous
*/
const BackToPrevious = {
  onLoad: function () {
    $('#back-to-previous').on('click', function () {
      window.history.back()
    })
  },
}

/*
* Footer
*/
const Footer = {
  onLoad: function () {
    this.klaviyo()
  },
  klaviyo: function() {
    if (!$('#klaviyo_subscribe').length) {
      return
    }
    KlaviyoSubscribe.attachToForms('#klaviyo_subscribe', {
      // Hide klaviyo_field_group after submit
      hide_form_on_success: true,
      // redirect to url after success
      // success_url: "http://www.evxample.com/thank-you",
      extra_properties: {
        $source: 'Subscribe Form',
        $method_type: "Custom Klaviyo Form",
        $consent_version: '',
      }
    })
  },
}

const Home = {
  onLoad: function () {
    if ($('.template-index').length) {
      this.setSectionsAspectRatio();
      this.onWindowResize();
    }
  },
  onWindowResize: function () {
    $(window).on('resize', function () {
      Home.setSectionsAspectRatio();
    })
  },
  setSectionsAspectRatio: function () {
    const window_width = $(window).width();
    if (window_width < 992) {
      $('#hero-container_mobile').css('height', 'initial');
      Utils.rescaleAspectRatio($('.hero-container_mobile'), 5, 7); // 5:4
    }
  },
}

/*
* Collection
*/
const Collection = {
  onLoad: function () {
    if ($('.template-collection').length) {
      this.setToggleIcon();
      this.onToggleFilters();
      this.onToggleView();
      this.setupTagFilters();
      CollectionProductCards.onLoad();
      CollectionLoadMore.onLoad();
    }
  },
  setToggleIcon: function () {
    const $toggleIcon = $('#toggle_icon');
    const window_width = $(window).width();
    if (window_width >= 992) {
      $toggleIcon.addClass('fa-th')
    } else {
      $toggleIcon.addClass('fa-square')
    }
  },
  onToggleFilters: function () {
    $('#toggle-filters').on('click', function () {
      if (!$(this).hasClass('toggled')) {
        $('#filters').slideDown();
        $(this).addClass('toggled');
        $('#plus').addClass('d-none');
        $('#plus').removeClass('d-inline-block');
        $('#minus').addClass('d-inline-block');
        $('#minus').removeClass('d-none');
      } else {
        $('#filters').slideUp();
        $(this).removeClass('toggled');
        $('#minus').addClass('d-none');
        $('#minus').removeClass('d-inline-block');
        $('#plus').addClass('d-inline-block');
        $('#plus').removeClass('d-none');
      }
    });
  },
  onToggleView: function () {
    $('#toggle-view').on('click', function () {
      const window_width = $(window).width();
      const $icon = $(this).find('.fa');
      const $collection_product_container = $('#shopify-section-collection-products .collection-products .collection-product-container');

      if ($icon.hasClass('fa-th')) {
        $icon.removeClass('fa-th').addClass('fa-th-large');
        $collection_product_container.removeClass('col-lg-4').addClass('col-lg-6');
      } else if ($icon.hasClass('fa-th-large')) {
        $icon.removeClass('fa-th-large').addClass('fa-square');
        if (window_width >= 992) {
          $collection_product_container.removeClass('col-lg-6').addClass('col-lg-12');
        } else {
          $collection_product_container.removeClass('col-6').removeClass('col-12');
        }
      } else if ($icon.hasClass('fa-square')) {
        $icon.removeClass('fa-square');
        if (window_width >= 992) {
          $icon.addClass('fa-th');
          $collection_product_container.removeClass('col-lg-12').addClass('col-lg-4');
        } else {
          $icon.addClass('fa-th-large');
          $collection_product_container.removeClass('col-12').addClass('col-6');
        }
      }

      CollectionProductCards.setAspectRatio();
    });
  },
  setupTagFilters: function () {
    $('.tags-hidden div.tag-container').each(function () {
      const tag_name = $(this).text();
      const $new = $(this).wrap('<div class="col-6"></div>').parent();

      if (tag_name.indexOf('Category:') !== -1) {
        $('.tags-category .tag-cloud').append($new);
      } else if (tag_name.indexOf('Collections:') !== -1) {
        $('.tags-collection .tag-cloud').append($new);
      } else if (tag_name.indexOf('Material:') !== -1) {
        $('.tags-material .tag-cloud').append($new);
      } else if (tag_name.indexOf('Size:') !== -1) {
        $('.tags-size .tag-cloud').append($new);
      }
    });
    $('.tags-shown a').each(function () {
      const text = $(this).text().replace('Category:', '').replace('Collections:', '').replace('Material:', '').replace('Type:', '').replace('Sneakers', '').replace('Size:', '');
      $(this).text(text);
    });
    if ($('.tags-category a').length) {
      $('.tags-category').show();
    }
    if ($('.tags-collection a').length) {
      $('.tags-collection').show();
    }
    if ($('.tags-material a').length) {
      $('.tags-material').show();
    }
    if ($('.tags-size a').length) {
      $('.tags-size').show();
    }
  },
};

const CollectionProductCards = {
  onLoad: function () {
    this.setAspectRatio();
    this.onWindowResize();
  },
  /*
   * Set Aspect Ratio
   * P448 Aspect Ratio
   * P448 Product images are 2200px by 1760px which is 5:4 ratio
   */
  setAspectRatio: function () {
    $('.collection-products .collection-product-container').each(function () {
      CollectionProductCards.rescale($(this));
    });
  },
  /*
   * Rescale Collection Product card
   * aspectRatio = 5:4
   * aspectRatio = 1:1
   */
  rescale: function ($this) {
    const aspect_ratio_width = 1;
    const aspect_ratio_height = 1;
    $this.attr('width', '100%');
    const this_width = $this.width();
    const this_new_height = (this_width * aspect_ratio_height) / aspect_ratio_width;
    $this.height(this_new_height);
  },
  onWindowResize: function () {
    $(window).on('resize', function () {
      CollectionProductCards.setAspectRatio();
    });
  },
};

const CollectionLoadMore = {
  onLoad: function () {
    if ('#collection-products') {
      CollectionLoadMore.onScroll();
    }
  },
  onScroll: function () {
    $(window).scroll(function () {
      if ($('#load-more').length && !$('#load-more').hasClass('loading') && !$('#load-more').hasClass('done-loading')) {
        // check whether you have hit the bottom of page using scroll 
        const footer_height = 400;
        const trigger_load_more_height = $(document).height() - $(window).height() - footer_height;
        if ($(window).scrollTop() >= trigger_load_more_height) {
          $('#load-more').show().addClass('loading');
          CollectionLoadMore.onLoadMoreProducts().then(function (res) {
            // console.log('CollectionLoadMore.onLoadMoreProducts', res);
            const offset = $('.collection-product-container').length;
            if (res.products) {
              if (res.products.length && res.products.length > offset) {
                res.products.forEach(function (product, key) {
                  if (key >= offset) {
                    CollectionLoadMore.appendProduct(product);
                  }
                });
                setTimeout(function () {
                  CollectionProductCards.setAspectRatio();
                  $('#load-more').hide().removeClass('loading');
                }, 500); // 0.5 second wait before can load more
              } else {
                $('#load-more').hide().removeClass('loading').addClass('done-loading');
                console.log('Done loading, no more products exist in this collection.');
              }
            } else {
              console.error('Something went wrong.');
            }
          }).catch(function (err) {
            console.error('onLoadMoreProducts', err);
            $('#load-more').remove(); // fallback, if there's an error remove this then the load more wont execute again
          });;
        }
      }
    });
  },
  onLoadMoreProducts: function () {
    // const since_id = $('.collection-product-container:last-child').attr('data-product-id');
    // const url = '/admin/api/2020-04/products.json?collection_id=' + meta.page.resourceId + '&since_id=' + since_id + '&limit=12&published_status=published'; // Admin API
    const limit = $('.collection-product-container').length + 12; // gotta add 12, cause this endpoint is weirdly not accepting offset parameter
    const url = location.pathname + '/products.json?limit=' + limit; // Ajax API // &offset=12 not working
    // console.log(url);
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: 'GET',
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      }).done(function (res) {
        resolve(res);
      }).fail(function (err) {
        reject(err);
      });
    });
  },
  appendProduct: function (product) {
    const column_class = CollectionLoadMore.setColumnClass();
    const second_image_src = (product.images.length > 1) ? product.images[1].src : product.images[0].src;
    const producut_url = location.pathname + '/products/' + product.handle;
    let price_html = product.variants[0].price;
    if (product.variants[0].compare_at_price > product.variants[0].price) {
      price_html = '<div>$' + product.variants[0].price + '</div><s><small>$' + product.variants[0].compare_at_price + '</small></s>';
    }
    const bottom_cta_text = (product.variants.length > 1) ? 'Choose your size' : 'View';
    // TODO: Add the Swym wishlist code here too
    let new_product = '<div class="' + column_class + ' collection-product-container product-single_hoverable-image_container" data-product-id="' + product.id + '">\
                          <div class="collection-product img-card" style="background-image: url(' + product.images[0].src + ')">\
                          </div>\
                          <div class="collection-product info-card" style="background-image: url(' + second_image_src + ')">\
                            <div class="row">\
                              <div class="info-details top_left col-3 px-0">';
    // TODO: Swym add to wishlist
    // <button class="btn btn-transparent py-0 swym-button swym-add-to-wishlist product_' + product.id + '" data-swaction="addToWishlist" data-product-id="' + product.id + '" >\
    //   <i aria-hidden="true" focusable="false" role="presentation" class="far fa-heart"></i>\
    // </button>';
    new_product += '</div>\
                              <div class="info-details top_center col-6 px-0" style="left: 25%; right: auto;">\
                                <a href="' + producut_url + '" class="text-secondary">' + product.title + '</a>\
                              </div>\
                              <div class="info-details top_right col-3 text-right px-0">' + price_html + '</div>\
                            </div>\
                            <a href="' + producut_url + '" class="click-box" title="' + product.title + '"></a>\
                            <div class="info-details bottom_center d-flex flex-row align-content-center justify-content-center">';
    new_product += '<a href="' + producut_url + '" title="' + product.title + '">\
                                <p class="m-0">' + bottom_cta_text + ' <img src="https://cdn.shopify.com/s/files/1/0256/8768/7215/t/4/assets/arrow-round-right_black.svg" alt="Right arrow" class="arrow-right"/></p>\
                              </a>';
    if (product.variants.length > 1) {
      product.variants.forEach(function (variant, key) {
        if (variant.available) {
          new_product += '<a href="' + producut_url + '?variant=' + variant.id + '">' + variant.title + '</a>';
        }
      });
    }
    new_product += '</div>\
                          </div>\
                        </div>';
    $('.collection-products').append(new_product);
  },
  setColumnClass: function () {
    const window_width = $(window).width();
    const $icon = $('#toggle-view .fa');
    let column_class = 'col-12 col-lg-4';
    if (window_width >= 992) {
      if ($icon.hasClass('fa-th')) {
        return column_class;
      } else if ($icon.hasClass('fa-th-large')) {
        return column_class + ' col-lg-6';
      } else if ($icon.hasClass('fa-square')) {
        return column_class + ' col-lg-12';
      }
    } else {
      if ($icon.hasClass('fa-th-large')) {
        return 'col-6 col-lg-4';
      }
    }
    return column_class;
  },
};

/*
* Product
*/
const Product = {
  onLoad: function () {
    if ($('.template-product')) {
      this.setInnerProductBodyMargins();
      this.setProductFooter();
      this.onWindowResize();
      this.setEmbedResponsive();
      this.onProductDescriptionExpand();
      this.onVariantSelect();
      this.sizeChart();
      ProductSizeByCountry.onLoad();
      this.onMobileProductTabClick();
    }
  },
  onWindowResize: function () {
    $(window).on('resize', function () {
      Product.setInnerProductBodyMargins();
      Product.setProductFooter();
    })
  },
  setInnerProductBodyMargins: function () {
    setTimeout(function () {
      if ($(window).width() > 992) {
        const product_body_height = $('.product-body').height();
        const inner_product_body_height = $('.inner-product-body').height();
        const margin_y = (product_body_height > inner_product_body_height) ? (product_body_height - inner_product_body_height) / 2 : 0;
        $('.inner-product-body').css('margin-top', margin_y);
        $('.inner-product-body').css('margin-bottom', margin_y);
      }
    }, 250);
  },
  setProductFooter: function() {
    if ($(window).width() < 991) {
      const product_form_height = $('.template-product .shopify-product-form').height();
      $('#shopify-section-footer').css('margin-bottom', product_form_height);
    }
  },
  setEmbedResponsive: function () {
    $('.product-long-description iframe, .description-body iframe').each(function () {
      if ($(this).attr('src').indexOf('youtube') !== -1) {
        $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
        $(this).addClass('embed-responsive-item');
      }
    });
  },
  onProductDescriptionExpand: function () {
    $('#product-description-accordion').on('shown.bs.collapse', function () {
      Product.setInnerProductBodyMargins();
    });
    $('#product-description-accordion').on('hidden.bs.collapse', function () {
      Product.setInnerProductBodyMargins();
    });
  },
  onVariantSelect: function () {
    $('.product-variant').on('click', function () {
      Product.selectVariant($(this));
    });
  },
  selectVariant: function ($this) {
    $('.product-variant').removeClass('product-variant-selected');
    $this.addClass('product-variant-selected');
    const variant_id = $this.attr('data-variant-id');
    $('#variant-id').val(variant_id);
    const available = $this.attr('available');
    if (available === 'true') {
      $('.product-add-to-cart-container').prop('disabled', false).removeAttr('diabled');
      $('.product-add-to-cart-container .btn:first-child').text('Add to bag');
    }
    Product.updateHistoryState(variant_id);
  },
  updateHistoryState: function (variant_id) {
    if (!history.replaceState || !variant_id) {
      return;
    }
    const newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant_id;
    window.history.replaceState({ path: newurl }, '', newurl);
  },
  sizeChart: function () {
    if ($('.size-chart-table').length) {
      // const has_collection = Product.getCollectionWomenOrMen();
      const has_type = Product.getTypeWomensOrMens();
      // show / hide based on Collectio Men or WOmen
      if (has_type.women && has_type.men) {
        // Hide nothing 
      } else if (has_type.women) {
        // Hide men
        $('.size-chart-table .us-men').hide();
      } else if (has_type.men) {
        // Hide women
        $('.size-chart-table .us-women').hide();
      }
    }
  },
  /*
   * Get Collection Women or Men
   * Deprecated using getTypeWomensOrMens() instead
  getCollectionWomenOrMen: function () {
    let has_collection = {
      women: false,
      men: false,
    };
    $('#product-collections li').each(function () {
      const collection_name = $(this).text().toLowerCase().trim();
      if (collection_name.indexOf('women') !== -1 && collection_name.indexOf('all  —  women & men') == -1) {
        has_collection.women = true;
      } else if (collection_name === 'men' || (collection_name.indexOf('women') === -1 && collection_name.indexOf('men') !== -1)) {
        has_collection.men = true;
      }
    });
    return has_collection;
  },
  */
  getTypeWomensOrMens: function () {
    let has_type = {
      women: false,
      men: false,
    };
    const this_product_type = $('#product-type').text().toLowerCase();
    if (this_product_type === 'womens') {
      has_type.women = true;
    } else if (this_product_type === 'mens') {
      has_type.men = true;
    }
    return has_type;
  },
  onMobileProductTabClick: function() {
    $('.mobile-product-content .nav-item').on('click', function() {
      const $this = $(this);
      if ($this.hasClass('active')) {
        setTimeout(function() {
          $this.attr('aria-selected', 'false').removeClass('active');
          const tab_pane_id = $this.attr('aria-controls');
          $('#' + tab_pane_id).removeClass('active show');
        }, 250);
      }
    });
  },
};

const ProductSizeByCountry = {
  sizes: [
    {
      'EU': '35',
      'US_WOMEN': '5 - 5.5',
      'US_MEN': '',
      'UK': '2',
    },
    {
      'EU': '36',
      'US_WOMEN': '6 - 6.5',
      'US_MEN': '',
      'UK': '3',
    },
    {
      'EU': '37',
      'US_WOMEN': '7',
      'US_MEN': '',
      'UK': '4',
    },
    {
      'EU': '38',
      'US_WOMEN': '7.5 - 8',
      'US_MEN': '',
      'UK': '5',
    },
    {
      'EU': '39',
      'US_WOMEN': '8.5 - 9',
      'US_MEN': '',
      'UK': '6',
    },
    {
      'EU': '40',
      'US_WOMEN': '9.5 - 10',
      'US_MEN': '8 - 8.5',
      'UK': '6',
    },
    {
      'EU': '41',
      'US_WOMEN': '10.5 - 11',
      'US_MEN': '9',
      'UK': '7',
    },
    {
      'EU': '42',
      'US_WOMEN': '11.5 - 12',
      'US_MEN': '9.5 - 10',
      'UK': '8',
    },
    {
      'EU': '43',
      'US_WOMEN': '12.5 - 13',
      'US_MEN': '10.5',
      'UK': '9',
    },
    {
      'EU': '44',
      'US_WOMEN': '',
      'US_MEN': '11',
      'UK': '10',
    },
    {
      'EU': '45',
      'US_WOMEN': '',
      'US_MEN': '11.5 - 12',
      'UK': '11',
    },
    {
      'EU': '46',
      'US_WOMEN': '',
      'US_MEN': '12.5',
      'UK': '12',
    },
    {
      'EU': '47',
      'US_WOMEN': '',
      'US_MEN': '13 - 13.5',
      'UK': '13',
    },
    {
      'EU': '48',
      'US_WOMEN': '',
      'US_MEN': '14 - 14.5',
      'UK': '14',
    },
  ],
  onLoad: function () {
    if ($('#toggle-size-by-country').length) {
      // const has_collection = Product.getCollectionWomenOrMen();
      const has_type = Product.getTypeWomensOrMens();
      // if women false OR men false (they cannot both be true)
      if (!has_type.women || !has_type.men) {
        $('#toggle-size-by-country').show();
        this.onClick(has_type);
      }
    }
  },
  onClick: function (has_type) {
    $('#toggle-size-by-country input').on('change', function () {
      if ($(this).is(':checked')) {
        ProductSizeByCountry.changeTheSizes('EU');
      } else {
        if (has_type.women) {
          ProductSizeByCountry.changeTheSizes('US_WOMEN');
        } else if (has_type.men) {
          ProductSizeByCountry.changeTheSizes('US_MEN');
        }
      }
      Product.setInnerProductBodyMargins(); // sometimes chang which variant appears changes the height
    });
  },
  changeTheSizes: function (selected_size_country) {
    $('.product-variants .product-variant').each(function () {
      const this_size_country = $(this).attr('data-size-country');
      const this_size = $(this).text().trim();
      const $self = $(this);
      ProductSizeByCountry.sizes.forEach(function (size) {
        if (size[this_size_country] === this_size) {
          if (size[selected_size_country] === '') {
            $self.parent().addClass('d-none');
          } else {
            $self.text(size[selected_size_country]);
            $self.attr('data-size-country', selected_size_country);
            $self.parent().removeClass('d-none');
          }
        }
      });
    });
    if ($('.product-variant-selected').parent().hasClass('d-none')) {
      console.log($('.product-variants ul li:not(.d-none)').first().find('.product-variant').text());
      $('.product-variants ul li:not(.d-none)').first().find('.product-variant').trigger('click');
    }
  }
};

/*
* Cart
*/
const Cart = {
  checkoutBtnText: '',
  onLoad: function () {
    this.checkoutBtnText = $('.primary-cta-container[type="submit"] .btn-primary').text();
    this.listenToCheckoutBtn();
  },
  listenToCheckoutBtn: function () {
    $('.primary-cta-container[type="submit"]').on('mouseover', function () {
      $(this).find('.btn-primary').text('Thank you!');
      $(this).find('.fa').removeClass('fa-smile').addClass('fa-grin-wink');
    }).on('mouseout', function () {
      $(this).find('.btn-primary').text(Cart.checkoutBtnText);
      $(this).find('.fa').removeClass('fa-grin-wink').addClass('fa-smile');
    });
  },
};

/*
* Cart Sidebar
*/
const CartSidebar = {
  newCartItem: { // TODO: use this
    image_url: '',
    title: '',
    variant_title: '',
    price: 0.00,
  },
  // totals: {
  //   original: 0.00,
  //   savings: 0.00,
  //   final: 0.00,
  // },
  onLoad: function () {
    if ($('#cartSidebar').length) {
      this.onProductAddToCart();
      this.onQuantityChange();
    }
  },
  onProductAddToCart: function () {
    // On single product add to cart
    $('.template-product .shopify-product-form').on('submit', function (e) {
      e.preventDefault();
      $form = $(this);
      CartSidebar.newCartItem.image_url = $('[data-product-single-thumbnail]').first().find('img').attr('src'); // data-thumbnail-id
      CartSidebar.addToCartLoading($form);
      $.post($form.attr('action'), $form.serializeArray(), function (product_data) {
        console.log('product_data', product_data);
        CartSidebar.updateFrontend(product_data);
      }, 'json').fail(function (response) {
        console.error('response', response);
        // TODO: handle error
      }).always(function () {
        CartSidebar.addToCartDefault($('.template-product .shopify-product-form'));
      });
    });
  },
  addToCartLoading: function ($form) {
    $form.find('.product-add-to-cart-container').prop('disabled', true).addClass('adding-to-cart');
  },
  addToCartDefault: function ($form) {
    setTimeout(function () {
      $form.find('.product-add-to-cart-container').prop('disabled', false).removeAttr('disabled').removeClass('adding-to-cart');
    }, 500);
  },
  onQuantityChange: function () {
    $('#cartSidebar form-cart input[name="updates[]"]').off();
    $('#cartSidebar #form-cart input[name="updates[]"]').on('change', function () {
      CartSidebar.updateBackend();
    });
    $('#cartSidebar #form-cart .cart-item-minus').off();
    $('#cartSidebar #form-cart .cart-item-minus').on('click', function () {
      CartSidebar.minusItemQuantity($(this));
    });
    $('#cartSidebar #form-cart .cart-item-plus').off();
    $('#cartSidebar #form-cart .cart-item-plus').on('click', function () {
      CartSidebar.plusItemQuantity($(this));
    });
    $('#cartSidebar #form-cart .cart-item-remove').off();
    $('#cartSidebar #form-cart .cart-item-remove').on('click', function () {
      CartSidebar.removeItem($(this).attr('remove-cart-line'), $(this).attr('rel'), parseInt($(this).parent().parent().find('[name="updates[]"]').val()));
    });
  },
  updateBackend: function () {
    if (!$('#form-cart input[name="update"]').length) {
      $('#form-cart').append('<input type="hidden" name="update" value="Update"/>');
    }
    $form = $('#form-cart');
    $.post('/cart', $form.serialize(), function (cart_data) {
      console.log('cart_data', cart_data);
      cart_data.items.forEach(function (cart_item) {
        $('.cart-item-list [product-id="' + cart_item.id + '"] .cart-item-thumbnail').attr('src', cart_item.image);
        $('.cart-item-list [product-id="' + cart_item.id + '"] .cart-item-price').text(Utils.formatCurrency(Utils.insertDecimal(cart_item.discounted_price)));
      });
      // update cart totals
      CartSidebar.updateTotals(
        Utils.formatCurrency(Utils.insertDecimal(cart_data.original_total_price)),
        Utils.formatCurrency(Utils.insertDecimal(cart_data.total_discount)),
        Utils.formatCurrency(Utils.insertDecimal(cart_data.total_price))
      );
    }, 'json').fail(function (response) {
      console.error('fail response', response);
      CartSidebar.handleError(response.responseJSON);
    });
  },
  minusItemQuantity: function ($this) {
    const $quantity = $this.parent().parent().find('input[type="number"]');
    const quantity_value = parseInt($quantity.val());
    if (quantity_value == 1) {
      const remove_cart_line = $this.attr('remove-cart-line');
      // if not on template-cart
      if (!$('.template-cart').length) {
        CartSidebar.removeItem(remove_cart_line, $this.attr('rel'), 1);
        return true;
      }
      window.location = '/cart/change?line=' + remove_cart_line + '&quantity=0';
      return true;
    }
    $quantity.val(quantity_value - 1);
    // Update Backend Cart
    CartSidebar.updateBackend();
    // change cart items count
    CartSidebar.updateHeaderCartMenuItemCount(-1);
  },
  plusItemQuantity: function ($this) {
    // Update Quantity
    const $quantity = $this.parent().parent().find('input[type="number"]');
    const quantity_value = parseInt($quantity.val());
    $quantity.val(quantity_value + 1);
    // Update Backend Cart
    CartSidebar.updateBackend();
    // change cart items count
    CartSidebar.updateHeaderCartMenuItemCount(1);
  },
  removeItem: function (cart_line_item_index, product_id, previous_quantity) {
    const data_to_send = {
      line: cart_line_item_index,
      id: product_id,
      quantity: 0,
    };
    $.post('/cart/change.js', data_to_send, function (cart_data) {
      // console.log('cart_data', cart_data);
      $('#cartSidebar [product-id="' + product_id + '"]').remove();
      // if cart has items
      if ($('#cartSidebar .cart-item').length) {
        // Update Backend Cart
        CartSidebar.updateBackend();
        CartSidebar.updateHeaderCartMenuItemCount(-previous_quantity);
        // set the remove-cart-line value
        let inc = 1;
        $('#cartSidebar .cart-item').each(function () {
          $(this).find('.cart-item-remove, .cart-item-minus').attr('remove-cart-line', inc);
          inc++;
        });
      } else {
        // else then remove header cart menu item & hide form and show empty state
        $('.header [data-target="#cartSidebar"], #form-cart, .cart-or-text').hide();
        $('#empty-cart-text').show();
      }
    }, 'json').fail(function (response) {
      console.error('fail response', response);
    });
  },
  updateFrontend: function (product_data) {
    let found_in_cart_list = false;
    // check if product already exists in cart
    const cart_item_count = $('#cartSidebar .cart-item').length;
    if (cart_item_count) {
      $('#cartSidebar .cart-item').each(function () {
        let product_id = parseInt($(this).attr('product-id'));
        // if found
        if (product_data.id === product_id) {
          found_in_cart_list = true;
          // then update line_price & update quantity
          $(this).find('.cart-item-price').text('$' + product_data.discounted_price);
          if ($(this).find('.cart-item-compare-price').length) {
            $(this).find('.cart-item-compare-price').text('$' + product_data.original_price);
          }
          $(this).find('input[type="number"]').val(product_data.quantity);
        }
      });
    }

    // if template product quantity then get input quantity else 1
    const new_cart_item_quantity = ($('.template-product .shopify-product-form [name="quantity"]').length) ? parseInt($('.template-product .shopify-product-form [name="quantity"]').val()) : 1;
    // if cart does not have items yet
    if (!cart_item_count) {
      // then show header cart menu item
      CartSidebar.showHeaderCartMenuItem();
    } else {
      // then increase the cart icon count by quantity
      CartSidebar.updateHeaderCartMenuItemCount(new_cart_item_quantity)
    }

    const new_cart_item_index = 1;
    const product_title_array = product_data.title.split(' - ');
    CartSidebar.newCartItem.title = product_title_array[0];
    CartSidebar.newCartItem.variant_title = (product_title_array[1] !== undefined) ? product_title_array[1] : '';
    // if not found in cart list
    if (!found_in_cart_list) {
      // then add
      let new_cart_item_price = '$' + product_data.price;
      if (product_data.original_line_price !== product_data.line_price) {
        new_cart_item_price = '<span class="visually-hidden">Discounted price</span><span class="cart-item-price d-block">$' + product_data.discounted_price + '</span><span class="visually-hidden">Original price</span><s class="cart-item-compare-price">$' + product_data.original_price + '</s>';
      }
      const new_cart_item = '\
        <div class="cart-item row py-3" product-id="' + product_data.id + '">\
          <div class="cart-item-image-col col-auto">\
            <img src="' + CartSidebar.newCartItem.image_url + '" alt="' + CartSidebar.newCartItem.title + '" class="cart-item-thumbnail"/>\
          </div>\
          <div class="col pl-0">\
            <div class="row mb-1">\
              <div class="col">\
                <a href="' + window.location.href + '" title="' + CartSidebar.newCartItem.title + '" class="d-block text-black">' + CartSidebar.newCartItem.title + '</a>\
                ' + CartSidebar.newCartItem.variant_title + '\
              </div>\
            </div>\
            <div class="row">\
              <div class="col">\
                <p class="d-block mb-1">' + new_cart_item_price + '</p>\
                <a class="cart-item-remove d-inline-block text-danger fs-0.75" href="javascript:void(0);" remove-cart-line="' + new_cart_item_index + '" rel="' + product_data.id + '">\
                  <small>Remove</small>\
                </a>\
              </div>\
              <div class="col">\
                <div class="row">\
                  <div class="col px-0">\
                    <button type="button" class="btn btn-transparent px-0 w-100 cart-item-minus" remove-cart-line="' + new_cart_item_index + '" rel="' + product_data.id + '">-</button>\
                  </div>\
                  <div class="col-6 px-1">\
                    <div class="form-group mb-0">\
                      <input type="number" name="updates[]" class="form-control" value="' + new_cart_item_quantity + '" min="0" pattern="[0-9]*" />\
                    </div>\
                  </div>\
                  <div class="col px-0">\
                    <button type="button" class="col btn btn-transparent px-0 w-100 cart-item-plus">+</button>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>';

      $('#cartSidebar .cart-item-list').prepend(new_cart_item);
      CartSidebar.setCartItemsRemoveNumber();

      // load cart listeners
      CartSidebar.onQuantityChange();
    }

    // update cart totals
    // if cart has items
    if (cart_item_count) {
      CartSidebar.updateBackend();
    } else {
      // then this is first product
      CartSidebar.updateTotals(
        Utils.formatCurrency(parseFloat(product_data.original_price)),
        Utils.formatCurrency(parseFloat(product_data.total_discount)),
        Utils.formatCurrency(parseFloat(product_data.line_price))
      );
    }

    $('#cartSidebar #form-cart, #cartSidebar .cart-or-text').show();
    $('#empty-cart-text').hide();

    $('#cartSidebar').modal('show');
  },
  showHeaderCartMenuItem: function () {
    $('.header [data-target="#cartSidebar"]').show();
    $('.header [data-target="#cartSidebar"] .cart-has-items').text('1');
  },
  updateHeaderCartMenuItemCount: function (change) {
    const this_cart_icon_count = parseInt($('.header [data-target="#cartSidebar"] .cart-has-items').first().text());
    $('.header [data-target="#cartSidebar"] .cart-has-items').text(this_cart_icon_count + change);
  },
  setCartItemsRemoveNumber: function () {
    // increment the remove-cart-line for other cart-items
    if ($('#cartSidebar .cart-item').length >= 2) {
      let inc = 1;
      $('#cartSidebar .cart-item').each(function () {
        $(this).find('.cart-item-remove, .cart-item-minus').attr('remove-cart-line', inc);
        inc++;
      });
    }
  },
  updateTotals: function (subtotal, savings, total) {
    if (subtotal !== total) {
      $('#cartSidebar .cart-subtotal').text(subtotal).parent().show();
    } else {
      $('#cartSidebar .cart-subtotal').parent().hide();
    }
    if (savings !== '$0.00' && savings !== '$0') {
      $('#cartSidebar .cart-savings').text(savings).parent().show();
    } else {
      $('#cartSidebar .cart-savings').parent().hide();
    }
    $('#cartSidebar .cart-total-price').text(total);
  },
  handleError: function (responseJSON) {
    const cart_totals_height = $('#cartSidebar .cart-totals').height();
    $('#cartSidebar .cart-item-list').css('height', 'calc(100vh - ' + cart_totals_height + 'px');
    const error_msg = (responseJSON.errors.indexOf('Cart changed') !== -1) ? 'Cart changed, please refresh to get latest cart details.' : responseJSON.errors;
    $('#cartSidebar .cart-errors').text(error_msg).show();
  },
};

/*
* Login
*/
const Login = {
  onLoad: function () {
    if ($('.template-login').length) {
      $('[data-recover-toggle]').on('click', function () {
        $('[data-login-form], [data-recover-form]').toggleClass('hide');
      });
    }
  },
};

/*
* Addresses
*/
const Addresses = {
  onLoad: function () {
    if ($('.template-addresses').length) {
      this.onAddressToggle();
      this.onAddressDelete();
      this.initCountryProvinceSelector(); // TODO: Fix - This throws an error for some reason, so load it last
    }
  },
  initCountryProvinceSelector: function () {
    // TODO: Hide provence until country is selected
    if (Shopify) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }
    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function () {
      const formId = $(this).data('form-id');
      const countrySelector = 'AddressCountry_' + formId;
      const provinceSelector = 'AddressProvince_' + formId;
      const containerSelector = 'AddressProvinceContainer_' + formId;

      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });
  },
  onAddressToggle: function () {
    $('[data-address-toggle]').on('click', function () {
      const form_id = $(this).attr('form-id');
      $('[data-address-form][form-id="' + form_id + '"]').toggleClass('hide');
    });
  },
  onAddressDelete: function () {
    $('[data-address-delete-form]').on('submit', function (e) {
      const $el = $(this);
      const formId = $el.data('form-id');
      const confirmMessage = $el.data('data-confirm-message');
      // eslint-disable-next-line no-alert
      if (
        confirm(confirmMessage || 'Are you sure you wish to delete this address?')
      ) {
        Shopify.postLink('/account/addresses/' + formId, {
          parameters: { _method: 'delete' }
        });
      } else {
        e.preventDefault();
      }
    });
  },
};

/*
 * SWYM Wishlist
 * Example gist - https://gist.github.com/saumitra2810/d6e6ba8c30d533a3f17416d4cafbac55
 */
const PageWishlist = {
  products: false,
  onLoad: function () {
    if (!$('#wishlist-items-container').length) {
      return;
    }
    function swymCallbackFn() {
      _swat.fetchWrtEventTypeET(
        function (products) {
          if (products.length) {
            PageWishlist.products = products;
            console.log(products);
            $('#wishlist-items-container').html('<div class="col"><div class="card"><ul id="wishlist-items" class="card-body mb-0"></ul></div></div>');
            let index = 1;
            products.forEach(function (product) {
              PageWishlist.appendProduct(index, product);
              index++;
            });
            PageWishlist.onDeleteWishlistItems();
          } else {
            $('#wishlist-items-container').html('<p>You currently do not have any wishlist products. <a href="/collections/all-new-arrivals-men-women">Return to shop.</a></p>');
          }
        },
        window._swat.EventTypes.addToWishList
      );
    }
    if (!window.SwymCallbacks) {
      window.SwymCallbacks = [];
    }
    window.SwymCallbacks.push(swymCallbackFn);
  },
  appendProduct: function (index, product) {
    const wishlist_item = PageWishlist.createProductItem(index, product);
    $('#wishlist-items').append(wishlist_item);
  },
  createProductItem: function (index, product) {
    const wishlist_item = '\
      <li class="wishlist-item row">\
        <div class="wishlist-item-image-col col-auto" data-label="Product">\
          <a href="' + product.du + '">\
            <img src="' + product.iu + '" alt="' + product.dt + '"\>\
          </a>\
        </div>\
        <div class="col d-md-flex align-items-md-center pr-0">\
          <p class="mb-0"><a href="' + product.du + '">' + product.dt + '</a></p>\
        </div>\
        <div class="col-auto d-flex align-items-center">\
          <a href="javascript:void(0);" class="wishlist-item-delete text-danger" pid="' + product._id + '" index=' + index + '>\
            <small>Remove</small>\
          </a>\
        </div>\
      </li>';
    return wishlist_item;
  },
  onDeleteWishlistItems: function() {
    $('.wishlist-item .wishlist-item-delete').on('click', function() {
      const $this = $(this);
      _swat.deleteEvent(function callback(res) {
        if (res.message.indexOf('Successfully') !== -1) {
          // Successfully deleted, re-render page
          const index = $this.attr('index');
          $('.wishlist-item:nth-child(' + index + ')').remove();
        } else {
          console.error('Something went wrong', res);
        }
       }, $this.attr('pid'));
    });
  },
};

/*
 * Lookbook
 */
const Lookbook = {
  onLoad: function () {
    if ($('#lookbook').length) {
      this.setLookbookItemAspectRatio();
      this.onWindowResize();
    }
  },
  onWindowResize: function() {
    $('window').on('resize', function() {
      Lookbook.setLookbookItemAspectRatio();
    });
  },
  setLookbookItemAspectRatio: function() {
    $('.lookbook-item-container').each(function() {
      Utils.rescaleAspectRatio($(this), 1, 1);
    });
  }
};

/*
 * Music
 */
const Music = {
  onLoad: function() {
    if ($('#music-unity').length) {
      SmoothScroll.onInit(131);
      this.onLoadLatestReleases();  
    }
  },
  onLoadLatestReleases: function() {
    if ($('.album-tile').length) {
      this.loadLatestReleases();
    }
  },
  loadLatestReleases: function() {
    this.onReleaseClick();
  },
  onReleaseClick: function() {
    $('#music-unity .album-tile #set-featured-album').on('click', function() {
      // set Featured Album
      let new_featured_album = {};
      new_featured_album.title = $(this).parent().find('.album-title').text();
      new_featured_album.image = $(this).parent().find('.album-img').attr('src');
      new_featured_album.date = $(this).parent().find('.album-date').html();
      new_featured_album.description = $(this).parent().find('.album-description').html();
      new_featured_album.embed = $(this).parent().find('.album-embed').html();
      Music.setFeaturedAlbum(new_featured_album);
    });
  },
  setFeaturedAlbum(new_featured_album) {
    $('#featured-music .featured-album-title').text(new_featured_album.title);
    $('#featured-music img').attr('src', new_featured_album.image);
    $('#featured-music .featured-album-date').text(new_featured_album.date);
    $('#featured-music .featured-album-description').html(new_featured_album.description);
    $('#featured-music .spotify-player').html(new_featured_album.embed);
  },
};

/*
 * LiveChat
 */
const LiveChat = {
  onLoad: function() {
    if ($('#btn-live-chat').length) {
      // LiveChat.load();
      LiveChat.onCheckStatus();
    }
  },
  /*
  load: function() {
    if (this.isAvailable()) {
      $('#btn-live-chat .bubble').removeClass('bubble-offline').addClass('bubble-online');
      $('#btn-live-chat .live-chat-status').text('[available]');
    } else {
      $('#btn-live-chat .bubble').removeClass('bubble-online').addClass('bubble-offline');
      $('#btn-live-chat .live-chat-status').text('[un-available]');
    }
  },
  */
  onCheckStatus: function() {
    // wait for zendesk livechat to load
    window.clearInterval(window.zendeskChatStatusInterval);
    window.zendeskChatStatusInterval = window.setInterval(function() {
      // Wait until $zopim and its `livechat` is initialized
      if (typeof $zopim === 'undefined' || typeof $zopim.livechat === 'undefined') {
        return;
      }
      LiveChat.checkStatus().then(function (res) {
        if (res) {
          $('#btn-live-chat .bubble').removeClass('bubble-offline').addClass('bubble-online');
          $('#btn-live-chat .live-chat-status').text('[available]');
        } else {
          $('#btn-live-chat .bubble').removeClass('bubble-online').addClass('bubble-offline');
          $('#btn-live-chat .live-chat-status').text('[un-available]');
        }
        return true;
      }).catch(function (err) {
        console.error('checkStatus', err);
        $('#btn-live-chat .bubble').removeClass('bubble-online').addClass('bubble-offline');
        $('#btn-live-chat .live-chat-status').text('[un-available]');
        return false;
      });
      window.clearInterval(window.zendeskChatStatusInterval);
    }, 250);
  },
  checkStatus: function() {
    return new Promise((resolve, reject) => {
      $zopim.livechat.setOnStatus(function(status) {
        // console.log('checkStatus', status);
        // status = 'offline';
        resolve((status === 'online') ? true : false);
      });
    });
  },
  checkBusinessHours: function() {
    const startTime = '10:00:00'; // 10am
    const endTime = '17:00:00'; // 5pm
    // let currentDate = new Date();
    let currentDate = Utils.getTimezoneTimeByUTCOffset('-4'); // EST
    let startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);
    let endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);
    const valid = (startDate < currentDate) && (endDate > currentDate) && currentDate.getDay() < 6; // Mon - Fri
    return valid;
  },
};

/*
 * Smooth Scroll
 */
const SmoothScroll = {
  onInit: function(offset) {
    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
          &&
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top - offset,
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(':focus')) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            });
          }
        }
      });
  },
};

/*
 * Utilities
 */
const Utils = {
  getUrlParameter: function (name) {
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return (results === null) ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },
  rescaleAspectRatio: function ($this, aspect_ratio_width, aspect_ratio_height) {
    $this.attr('width', '100%');
    const this_width = $this.width();
    const this_new_height = (this_width * aspect_ratio_height) / aspect_ratio_width;
    $this.height(this_new_height);
  },
  formatCurrency: function (value) {
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + value;
  },
  insertDecimal: function (num) {
    return (num / 100).toFixed(2);
  },
  getTimezoneTimeByUTCOffset(offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
  }
};
