$('document').ready(function () {
  $('.list--item').click(function () {
    // get clicked item list name
    const listName = this.attributes.name.value;

    $('.list--item').removeClass('active');
    // add class (active) to clicked item
    $(`.list--item[name="${listName}"]`).addClass('active');
  });
});
