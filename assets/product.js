/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

// https://unpkg.com/@shopify/theme-product-form@3.1.0/dist/theme-product-form.min.js
this.Shopify=this.Shopify||{},this.Shopify.theme=this.Shopify.theme||{},this.Shopify.theme.productForm=function(t,e){"use strict";function i(){this.entries=[]}i.prototype.add=function(t,e,n){this.entries.push({element:t,event:e,fn:n}),t.addEventListener(e,n)},i.prototype.removeAll=function(){this.entries=this.entries.filter(function(t){return t.element.removeEventListener(t.event,t.fn),!1})};var n='[name="id"]',o='[name^="options"]',r='[name="quantity"]',u='[name^="properties"]';function s(t,e,n){this.element=t,this.product=function(t){if("object"!=typeof t)throw new TypeError(t+" is not an object.");if(void 0!==t.variants[0].options)return t;throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route")}(e),n=n||{},this._listeners=new i,this._listeners.add(this.element,"submit",this._onSubmit.bind(this,n)),this.optionInputs=this._initInputs(o,n.onOptionChange),this.quantityInputs=this._initInputs(r,n.onQuantityChange),this.propertyInputs=this._initInputs(u,n.onPropertyChange)}return s.prototype.destroy=function(){this._listeners.removeAll()},s.prototype.options=function(){return t=this.optionInputs,n=function(t){return t.name=/(?:^(options\[))(.*?)(?:\])/.exec(t.name)[2],t},t.reduce(function(t,e){return(e.checked||"radio"!==e.type&&"checkbox"!==e.type)&&t.push(n({name:e.name,value:e.value})),t},[]);var t,n},s.prototype.variant=function(){return e.getVariantFromSerializedArray(this.product,this.options())},s.prototype.properties=function(){var t,n,e=(t=this.propertyInputs,n=function(t){return/(?:^(properties\[))(.*?)(?:\])/.exec(t)[2]},t.reduce(function(t,e){return(e.checked||"radio"!==e.type&&"checkbox"!==e.type)&&(t[n(e.name)]=e.value),t},{}));return 0===Object.entries(e).length?null:e},s.prototype.quantity=function(){return this.quantityInputs[0]?Number.parseInt(this.quantityInputs[0].value,10):1},s.prototype._setIdInputValue=function(t){var e=this.element.querySelector(n);e||((e=document.createElement("input")).type="hidden",e.name="id",this.element.appendChild(e)),e.value=t.toString()},s.prototype._onSubmit=function(t,e){e.dataset=this._getProductFormEventData(),this._setIdInputValue(e.dataset.variant.id),t.onFormSubmit&&t.onFormSubmit(e)},s.prototype._onFormEvent=function(e){return void 0===e?Function.prototype:function(t){t.dataset=this._getProductFormEventData(),e(t)}.bind(this)},s.prototype._initInputs=function(t,e){return Array.prototype.slice.call(this.element.querySelectorAll(t)).map(function(t){return this._listeners.add(t,"change",this._onFormEvent(e)),t}.bind(this))},s.prototype._getProductFormEventData=function(){return{options:this.options(),variant:this.variant(),properties:this.properties(),quantity:this.quantity()}},t.getUrlWithVariant=function(t,e){return/variant=/.test(t)?t.replace(/(variant=)[^&]+/,"$1"+e):/\?/.test(t)?t.concat("&variant=").concat(e):t.concat("?variant=").concat(e)},t.ProductForm=s,t}({},Shopify.theme.product);
// import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */
function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || moneyFormat;

  function formatWithDelimiters(number, precision, thousands, decimal) {
    thousands = thousands || ',';
    decimal = decimal || '.';

    if (isNaN(number) || number === null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1' + thousands
    );
    var centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
    case 'amount_with_apostrophe_separator':
      value = formatWithDelimiters(cents, 2, "'");
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

// import {formatMoney} from '@shopify/theme-currency';

// https://unpkg.com/@shopify/theme-sections@3.1.0/dist/theme-sections.min.js
this.Shopify=this.Shopify||{},this.Shopify.theme=this.Shopify.theme||{},this.Shopify.theme.sections=function(t){"use strict";var n="data-section-id";function o(t,e){this.container=function(t){if(!(t instanceof Element))throw new TypeError("Theme Sections: Attempted to load section. The section container provided is not a DOM element.");if(null!==t.getAttribute(n))return t;throw new Error("Theme Sections: The section container provided does not have an id assigned to the "+n+" attribute.")}(t),this.id=t.getAttribute(n),this.extensions=[],Object.assign(this,function(t){if(void 0!==t&&"object"!=typeof t||null===t)throw new TypeError("Theme Sections: The properties object provided is not a valid");return t}(e)),this.onLoad()}o.prototype={onLoad:Function.prototype,onUnload:Function.prototype,onSelect:Function.prototype,onDeselect:Function.prototype,onBlockSelect:Function.prototype,onBlockDeselect:Function.prototype,extend:function(t){this.extensions.push(t);var e=Object.assign({},t);delete e.init,Object.assign(this,e),"function"==typeof t.init&&t.init.apply(this)}},"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},writable:!0,configurable:!0});var i="data-section-type",r="data-section-id";window.Shopify=window.Shopify||{},window.Shopify.theme=window.Shopify.theme||{},window.Shopify.theme.sections=window.Shopify.theme.sections||{};var c=window.Shopify.theme.sections.registered=window.Shopify.theme.sections.registered||{},s=window.Shopify.theme.sections.instances=window.Shopify.theme.sections.instances||[];function a(t,o){t=h(t),void 0===o&&(o=document.querySelectorAll("["+i+"]")),o=l(o),t.forEach(function(e){var n=c[e];void 0!==n&&(o=o.filter(function(t){return!u(t)&&(null!==t.getAttribute(i)&&(t.getAttribute(i)!==e||(s.push(new n(t)),!1)))}))})}function f(t){p(t).forEach(function(t){var e=s.map(function(t){return t.id}).indexOf(t.id);s.splice(e,1),t.onUnload()})}function p(t){var n=[];if(NodeList.prototype.isPrototypeOf(t)||Array.isArray(t))var e=t[0];if(t instanceof Element||e instanceof Element)l(t).forEach(function(e){n=n.concat(s.filter(function(t){return t.container===e}))});else if("string"==typeof t||"string"==typeof e){h(t).forEach(function(e){n=n.concat(s.filter(function(t){return t.type===e}))})}return n}function d(t){for(var e,n=0;n<s.length;n++)if(s[n].id===t){e=s[n];break}return e}function u(t){return 0<p(t).length}function h(t){return"*"===t?t=Object.keys(c):"string"==typeof t?t=[t]:t.constructor===o?t=[t.prototype.type]:Array.isArray(t)&&t[0].constructor===o&&(t=t.map(function(t){return t.prototype.type})),t=t.map(function(t){return t.toLowerCase()})}function l(t){return NodeList.prototype.isPrototypeOf(t)&&0<t.length?t=Array.prototype.slice.call(t):NodeList.prototype.isPrototypeOf(t)&&0===t.length?t=[]:null===t?t=[]:!Array.isArray(t)&&t instanceof Element&&(t=[t]),t}return window.Shopify.designMode&&(document.addEventListener("shopify:section:load",function(t){var e=t.detail.sectionId,n=t.target.querySelector("["+r+'="'+e+'"]');null!==n&&a(n.getAttribute(i),n)}),document.addEventListener("shopify:section:unload",function(t){var e=t.detail.sectionId,n=t.target.querySelector("["+r+'="'+e+'"]');"object"==typeof p(n)[0]&&f(n)}),document.addEventListener("shopify:section:select",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onSelect(t)}),document.addEventListener("shopify:section:deselect",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onDeselect(t)}),document.addEventListener("shopify:block:select",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onBlockSelect(t)}),document.addEventListener("shopify:block:deselect",function(t){var e=d(t.detail.sectionId);"object"==typeof e&&e.onBlockDeselect(t)})),t.registered=c,t.instances=s,t.register=function(t,e){if("string"!=typeof t)throw new TypeError("Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered");if(void 0!==c[t])throw new Error('Theme Sections: A section of type "'+t+'" has already been registered. You cannot register the same section type twice');function n(t){o.call(this,t,e)}return n.constructor=o,n.prototype=Object.create(o.prototype),c[n.prototype.type=t]=n},t.unregister=function(t){(t=h(t)).forEach(function(t){delete c[t]})},t.load=a,t.unload=f,t.extend=function(t,e){p(t).forEach(function(t){t.extend(e)})},t.getInstances=p,t.getInstanceById=d,t.isInstance=u,t}({});


// import {forceFocus} from '@shopify/theme-a11y';

const classes = {
  hide: 'hide',
};

const keyboardKeys = {
  ENTER: 13,
};

const selectors = {
  submitButton: '[data-submit-button]',
  submitButtonText: '[data-submit-button-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  priceWrapper: '[data-price-wrapper]',
  imageWrapper: '[data-product-image-wrapper]',
  visibleImageWrapper: `[data-product-image-wrapper]:not(.${classes.hide})`,
  imageWrapperById: (id) => `${selectors.imageWrapper}[data-image-id='${id}']`,
  productForm: '[data-product-form]',
  productPrice: '[data-product-price]',
  thumbnail: '[data-product-single-thumbnail]',
  thumbnailById: (id) => `[data-thumbnail-id='${id}']`,
  thumbnailActive: '[data-product-single-thumbnail][aria-current]',
};

this.Shopify.theme.sections.register('product', {
  async onLoad() {
    const productFormElement = document.querySelector(selectors.productForm);

    this.product = await this.getProductJson(
      productFormElement.dataset.productHandle,
    );
    this.productForm = new ProductForm(productFormElement, this.product, {
      onOptionChange: this.onFormOptionChange.bind(this),
    });

    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onThumbnailKeyup = this.onThumbnailKeyup.bind(this);

    this.container.addEventListener('click', this.onThumbnailClick);
    this.container.addEventListener('keyup', this.onThumbnailKeyup);
  },

  onUnload() {
    this.productForm.destroy();
    this.removeEventListener('click', this.onThumbnailClick);
    this.removeEventListener('keyup', this.onThumbnailKeyup);
  },

  getProductJson(handle) {
    return fetch(`/products/${handle}.js`).then((response) => {
      return response.json();
    });
  },

  onFormOptionChange(event) {
    const variant = event.dataset.variant;

    this.renderImages(variant);
    this.renderPrice(variant);
    this.renderComparePrice(variant);
    this.renderSubmitButton(variant);

    this.updateBrowserHistory(variant);
  },

  onThumbnailClick(event) {
    const thumbnail = event.target.closest(selectors.thumbnail);

    if (!thumbnail) {
      return;
    }

    event.preventDefault();

    this.renderFeaturedImage(thumbnail.dataset.thumbnailId);
    this.renderActiveThumbnail(thumbnail.dataset.thumbnailId);
  },

  onThumbnailKeyup(event) {
    if (
      event.keyCode !== keyboardKeys.ENTER ||
      !event.target.closest(selectors.thumbnail)
    ) {
      return;
    }

    const visibleFeaturedImageWrapper = this.container.querySelector(
      selectors.visibleImageWrapper,
    );

    // forceFocus(visibleFeaturedImageWrapper);
  },

  renderSubmitButton(variant) {
    const submitButton = this.container.querySelector(selectors.submitButton);
    const submitButtonText = this.container.querySelector(
      selectors.submitButtonText,
    );

    if (!variant) {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.unavailable;
    } else if (variant.available) {
      submitButton.disabled = false;
      submitButtonText.innerText = theme.strings.addToCart;
    } else {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.soldOut;
    }
  },

  renderImages(variant) {
    if (!variant || variant.featured_image === null) {
      return;
    }

    this.renderFeaturedImage(variant.featured_image.id);
    this.renderActiveThumbnail(variant.featured_image.id);
  },

  renderPrice(variant) {
    const priceElement = this.container.querySelector(selectors.productPrice);
    const priceWrapperElement = this.container.querySelector(
      selectors.priceWrapper,
    );

    priceWrapperElement.classList.toggle(classes.hide, !variant);

    if (variant) {
      priceElement.innerText = formatMoney(variant.price, theme.moneyFormat);
    }
  },

  renderComparePrice(variant) {
    if (!variant) {
      return;
    }

    const comparePriceElement = this.container.querySelector(
      selectors.comparePrice,
    );
    const compareTextElement = this.container.querySelector(
      selectors.comparePriceText,
    );

    if (!comparePriceElement || !compareTextElement) {
      return;
    }

    if (variant.compare_at_price > variant.price) {
      comparePriceElement.innerText = formatMoney(
        variant.compare_at_price,
        theme.moneyFormat,
      );
      compareTextElement.classList.remove(classes.hide);
      comparePriceElement.classList.remove(classes.hide);
    } else {
      comparePriceElement.innerText = '';
      compareTextElement.classList.add(classes.hide);
      comparePriceElement.classList.add(classes.hide);
    }
  },

  renderActiveThumbnail(id) {
    const activeThumbnail = this.container.querySelector(
      selectors.thumbnailById(id),
    );
    const inactiveThumbnail = this.container.querySelector(
      selectors.thumbnailActive,
    );

    if (activeThumbnail === inactiveThumbnail) {
      return;
    }

    inactiveThumbnail.removeAttribute('aria-current');
    activeThumbnail.setAttribute('aria-current', true);
  },

  renderFeaturedImage(id) {
    const activeImage = this.container.querySelector(
      selectors.visibleImageWrapper,
    );
    const inactiveImage = this.container.querySelector(
      selectors.imageWrapperById(id),
    );

    activeImage.classList.add(classes.hide);
    inactiveImage.classList.remove(classes.hide);
  },

  updateBrowserHistory(variant) {
    const enableHistoryState = this.productForm.element.dataset
      .enableHistoryState;

    if (!variant || enableHistoryState !== 'true') {
      return;
    }

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);
  },
});
