let data;
let selectedSubId = 1;
let selectedLecId = 1;
let tableItemsStartNum = 0;
const tableItemsNum = 12;

$('document').ready(function () {
  fetch('./data/data.json')
    .then((response) => response.json())
    .then((Data) => {
      data = Data;
      addSubjectsNameToList();
      addLecturesDataToLectures();
      updateAttendanceSection();
    })
    .catch((error) => {
      console.error('Error loading JSON:', error);
    });

  // control of click on subject list (add active class)
  $(document).on('click', '.list--item', function () {
    selectedLecId = 1; // reset selected lec number whenever click in lec list

    clearActive('.list--item');
    addActive(this);

    // add selected subject title in subject title
    $('#subject-title').text($(this).text());

    selectedSubId = $(this).data().id; // get id for selected subject
    addLecturesDataToLectures(); // update lectures data
    updateAttendanceSection();
  });

  // select lecture
  $(document).on('click', '.lectures--card', function () {
    clearActive('.lectures--card');
    addActive(this);

    selectedLecId = $(this).data().id; // get id for selected lec
    updateAttendanceSection();
  });

  // go to next page in table
  $('#table-forward').click(function () {
    const attendanceArr = getSelectedLecData().attendance;

    // if there is data in next page go forward
    if (attendanceArr.length > tableItemsStartNum + tableItemsNum) {
      tableItemsStartNum += tableItemsNum;
      addAttendanceDataToTable(attendanceArrSlice());
    }
  });

  // go back to previous page in table
  $('#table-back').click(function () {
    // if there is data in previous page go back
    if (tableItemsStartNum > 0) {
      tableItemsStartNum -= tableItemsNum;
      addAttendanceDataToTable(attendanceArrSlice());
    }
  });

  $('#btnUser').click(function () {
    $('.container--subjects').toggleClass('active');
  });

  $('#collapseBtn').click(function () {
    $('.container').toggleClass('collapse');
    $('.container--lectures').toggleClass('nav-collapse-opacity');
  });

  $('#maximizeImg').click(function () {
    $('#maxImg').removeClass('hidden');
    $('#shadow').removeClass('display-none');
  });
  $('#shadow').click(function () {
    $('#maxImg').addClass('hidden');
    $(this).addClass('display-none');
  });
  $('#downloadImg').click(function () {
    imageUrl = $('#tessst').attr('src');

    // Create a temporary anchor element
    var downloadLink = $('<a>')
      .attr('href', imageUrl)
      .attr('download', 'downloaded_image.jpg')
      .appendTo('body');

    // Trigger a click on the anchor element to initiate the download
    downloadLink[0].click();

    // Remove the temporary anchor element
    downloadLink.remove();
  });
});

function getSelectedLecturesData() {
  return data.find((sub) => sub.id == selectedSubId);
}

function getSelectedLecData() {
  return data
    .find((sub) => sub.id == selectedSubId)
    .subLectures.find((lec) => lec.id == selectedLecId);
}

function addSubjectsNameToList() {
  // add subjects name to the list (add active for first one)
  data.map((sub, index) =>
    $('.list').append(
      `<li data-id="${sub.id}" class="list--item ${index === 0 && 'active'}">${
        sub.subName
      }</li>`
    )
  );
}

function addLecturesDataToLectures() {
  const lecturesData = getSelectedLecturesData();

  $('.lectures--card').remove();
  lecturesData.subLectures.map((lec, index) =>
    $('.lectures').append(
      `<div data-id="${lec.id}" class="lectures--card ${
        index === 0 ? 'active' : ''
      }">
        <h2 class="title">المحاضرة</h2>
        <span class="number">0${lec.id}</span>
        <div><span class="date">${lec.date}</span></div>
      </div>`
    )
  );
}

// let test;
function updateAttendanceSection() {
  const lecData = getSelectedLecData();

  tableItemsStartNum = 0; // reset page table number
  addLectureDataToAttendance(lecData);
  addAttendanceDataToTable(lecData.attendance.slice(0, tableItemsNum));
}

function addLectureDataToAttendance(data) {
  $('#lec-title').text(data.title);
  $('#lec-description').text(data.description);
  $('#lec-date').text(data.date);
}

function addAttendanceDataToTable(data) {
  $('#attendance-body').html('');

  data.map((atten) =>
    $('#attendance-body').append(
      `<tr>
      <td>${atten.id}</td>
      <td>${atten.fullName}</td>
      <td>${atten.department}</td>
      <td>${atten.level}</td>
      <td class="${atten.status}">${atten.status ? '✔' : '✖'}</td>
    </tr>`
    )
  );
}

// slice attendance array and return updated slice value
function attendanceArrSlice() {
  const attendanceArr = getSelectedLecData().attendance;
  return attendanceArr.slice(
    tableItemsStartNum,
    tableItemsStartNum + tableItemsNum
  );
}

// clear active class for all list
function clearActive(selected) {
  $(selected).removeClass('active');
}
// add active class to clicked item
function addActive(selected) {
  $(selected).addClass('active');
}
