var productCardMarkup = `
 <ul>
 {{#products}}
	<li class="grid__item grid__item--collection-template small--one-half medium-up--one-quarter">
      <div class="grid-view-item product-card">
        <a class="grid-view-item__link grid-view-item__image-container full-width-link" href="{{du}}">
          <span class="visually-hidden">{{dt}}</span>
        </a>
        <div class="grid-view-item__image-wrapper product-card__image-wrapper js">
          <div style="padding-top: 66.66666666666666%;">
            <img  class="grid-view-item__image lazyautosizes" src="{{iu}}" />
          </div>
        </div>
		<div class="h4 grid-view-item__title product-card__title" aria-hidden="true">{{dt}} - {{variantinfo}}</div>
        <dl class="price" data-price="">
          <span class="price-item price-item--sale" data-sale-price="">
            {{cu}}{{pr}}
          </span>
        </dl>
        <a href="" data-product-id="{{empi}}" data-url="{{du}}" data-variant-id="{{epi}}" class="add-to-cart">
			{{#isInCart}}Moved to cart{{/isInCart}}
			{{^isInCart}}Move to cart{{/isInCart}}
		</a>
      </div>
    </li>
  {{/products}}
 </ul>
`;

function getVariantInfo(variants){
  try {
    let variantKeys = ((variants && variants != "[]") ? Object.keys(JSON.parse(variants)[0]) : []) , variantinfo;
    if(variantKeys.length > 0){
      variantinfo = variantKeys[0];
      if(variantinfo == "Default Title"){
        variantinfo = "";
      }
    } else {
      variantinfo = "";
    }
    return variantinfo;
  } catch(err){
    return variants;
  }
}

function swymCallbackFn(){
  // gets called once Swym is ready
  var wishlistContentsContainer = document.getElementById("wishlist-items");
  _swat.fetchWrtEventTypeET(
    function(products) {
      // Get wishlist items
      var formattedWishlistedProducts = products.map(function(p){
        p = SwymUtils.formatProductPrice(p);    // formats product price and adds currency to product Object
        p.isInCart = _swat.platform.isInDeviceCart(p.epi) || (p.et == _swat.EventTypes.addToCart);
        p.variantinfo = (p.variants ? getVariantInfo(p.variants) : "");
        return p;
      });
      
      var productCardsMarkup = SwymUtils.renderTemplateString(productCardMarkup, {products: formattedWishlistedProducts});
      wishlistContentsContainer.innerHTML = productCardsMarkup;
      
      attachClickListeners();
      
    },
    window._swat.EventTypes.addToWishList
  );
}
if(!window.SwymCallbacks){
  window.SwymCallbacks = [];
}

window.SwymCallbacks.push(swymCallbackFn);


function onAddToCartClick(e){
  e.preventDefault();
  var productId = e.target.getAttribute("data-product-id");
  var variantId = e.target.getAttribute("data-variant-id");
  var du = e.target.getAttribute("data-url");
  e.target.innerHTML = "Adding..";
  window._swat.replayAddToCart(
   {empi: productId, du: du},
   variantId,
   function() {
     e.target.innerHTML = "Moved to cart";
     window.location.reload();
     console.log("Successfully added product to cart.");
   },
   function(e) {
     console.log(e);
   }
  );
}


function attachClickListeners(){
  var addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', onAddToCartClick, false);
  }
}