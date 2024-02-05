let data;
$('document').ready(function () {
  fetch('./data/data.json')
    .then((response) => response.json())
    .then((dataVal) => {
      // Your logic using the loaded JSON data
      data = dataVal;
      addSubjectsNameToList(data);
    })
    .catch((error) => {
      console.error('Error loading JSON:', error);
    });

  function addSubjectsNameToList(data) {
    // take subjects name from data.json file
    data.map((sub, index) =>
      $('.list').append(
        `<li class="list--item ${index === 0 && 'active'}">${sub.subName}</li>`
      )
    );
  }

  // control of click on subject list
  // add active class
  $(document).on('click', '.list--item', function () {
    // remove active class from all list items
    $('.list--item').removeClass('active');

    // add class (active) to clicked item
    $(this).addClass('active');
    $('#subject-title').text($(this).text());

    // Encode the clicked text to ensure it is URL-safe
    // var encodedText = encodeURIComponent($(this).text());

    // Construct the new URL with the query parameter
    // var newUrl =
    // window.location.href.split('?')[0] + '?subject-name=' + encodedText;

    // Push the new state to the browser's history
    // history.pushState(null, null, newUrl);
  });
});
