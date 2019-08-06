document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.carousel');
    options.duration = 4000;
    var instances = M.Carousel.init(elems, options);
  });

const instance = M.Carousel.init({
    fullWidth: true,
    indicators: true
  });