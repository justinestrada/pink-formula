
$(document).ready(function () {
  Slider.onLoad();
});

const Slider = {
  onLoad: function() {
    if ($('.slider').length) {
      Slider.init();
    }
  },
  init: function() {
    // var slideButtonOne = document.getElementsByClassName("slide-btn_one")[0];
    // var slideButtonTwo = document.getElementsByClassName("slide-btn_two")[0];
    
    // slideButtonOne.onclick = function () {
    //     // slideOne.style['transform'] = 'translateX(-100%)';
    //     // slideOne.style['display'] = 'none';
    //     // slideTwo.style['transform'] = 'translateX(0)';
    //     // slideTwo.style['display'] = 'inline-block';
    //     slideButtonOne.styles['display'] = 'none';
    //     slideButtonTwo.styles['display'] = 'block';
    // };
    // slideButtonTwo.onclick = function () {
    //     // slideOne.style['transform'] = 'translateX(0)';
    //     // slideOne.style['display'] = 'inline-block';
    //     // slideTwo.style['transform'] = 'translateX(100%)';
    //     // slideTwo.style['display'] = 'none';
    //     slideButtonTwo.styles['display'] = 'none';
    //     slideButtonOne.styles['display'] = 'block';
    // };

    $('.slider').each(function() {
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: document.getElementById('slick-next'),
        prevArrow: document.getElementById('slick-prev'),
        variableWidth: true,
        infinite: false,
      });
    })
  },
}
