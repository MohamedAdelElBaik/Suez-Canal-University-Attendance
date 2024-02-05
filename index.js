let data;
$('document').ready(function () {
  fetch('./data/data.json')
    .then((response) => response.json())
    .then((Data) => {
      // Your logic using the loaded JSON data
      data = Data;
      addSubjectsNameToList(Data);
      addLecturesDataToLectures(Data[0]);
    })
    .catch((error) => {
      console.error('Error loading JSON:', error);
    });

  function addSubjectsNameToList(data) {
    // add subjects name to the list (add active for first one)
    data.map((sub, index) =>
      $('.list').append(
        `<li data-id="${sub.id}" class="list--item ${
          index === 0 && 'active'
        }">${sub.subName}</li>`
      )
    );
  }

  function addLecturesDataToLectures(data) {
    $('.lectures--card').remove();
    data.subLectures.map((lec) =>
      $('.lectures').append(
        `<div class="lectures--card">
          <h2>المحاضرة</h2>
          <span class="number">0${lec.id}</span>
          <div><span class="date">${lec.date}</span></div>
        </div>`
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

    // get data of subject that have this id
    const id = $(this).data().id;
    addLecturesDataToLectures(data.find((sub) => sub.id == id));

    // Encode the clicked text to ensure it is URL-safe
    // var encodedText = encodeURIComponent($(this).text());

    // Construct the new URL with the query parameter
    // var newUrl =
    // window.location.href.split('?')[0] + '?subject-name=' + encodedText;

    // Push the new state to the browser's history
    // history.pushState(null, null, newUrl);
  });
});
