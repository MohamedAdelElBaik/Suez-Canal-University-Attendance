$('document').ready(function () {
  $('.list--item').click(function () {
    // remove active class from all list items
    $('.list--item').removeClass('active');

    // add class (active) to clicked item
    $(this).addClass('active');
  });
});
