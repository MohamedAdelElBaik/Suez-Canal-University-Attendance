let data;
let selectedSubId = 1;
let selectedLecId = 1;
let tableItemsStartNum = 0;
const tableItemsNum = 12;

$('document').ready(function () {
  fetch('./data/data.json')
    .then((response) => response.json())
    .then((Data) => {
      // Your logic using the loaded JSON data
      data = Data;

      addSubjectsNameToList();

      const lecturesData = getSelectedLecturesData();
      addLecturesDataToLectures(lecturesData);

      const lecData = getSelectedLecData();
      updateAttendanceSection(lecData);
    })
    .catch((error) => {
      console.error('Error loading JSON:', error);
    });

  // control of click on subject list (add active class)
  $(document).on('click', '.list--item', function () {
    selectedLecId = 1;

    // clear active class for all list and add for selected
    clearActive('.list--item');
    addActive(this);

    $('#subject-title').text($(this).text());

    // get data of subject that have this id
    const id = $(this).data().id;
    selectedSubId = id;

    // update lectures data
    const lecturesData = getSelectedLecturesData();
    addLecturesDataToLectures(lecturesData);

    // update lecture data
    const lecData = getSelectedLecData();
    updateAttendanceSection(lecData);

    // Encode the clicked text to ensure it is URL-safe
    // var encodedText = encodeURIComponent($(this).text());

    // Construct the new URL with the query parameter
    // var newUrl =
    // window.location.href.split('?')[0] + '?subject-name=' + encodedText;

    // Push the new state to the browser's history
    // history.pushState(null, null, newUrl);
  });

  // select lecture
  $(document).on('click', '.lectures--card', function () {
    clearActive('.lectures--card');
    addActive(this);

    selectedLecId = $(this).data().id;

    const lecData = getSelectedLecData();
    updateAttendanceSection(lecData);
  });

  // go to next page in table
  $('#table-forward').click(function () {
    const attendanceArr = getSelectedLecData().attendance;

    // if there is data in next page go forward
    if (attendanceArr.length > tableItemsStartNum + tableItemsNum) {
      tableItemsStartNum = tableItemsStartNum + tableItemsNum;
      addAttendanceDataToTable(attendanceArrSlice());
    }
  });

  // go back to previous page in table
  $('#table-back').click(function () {
    // if there is data in previous page go back
    if (tableItemsStartNum > 0) {
      tableItemsStartNum = tableItemsStartNum - tableItemsNum;
      addAttendanceDataToTable(attendanceArrSlice());
    }
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

function addLecturesDataToLectures(data) {
  $('.lectures--card').remove();
  data.subLectures.map((lec, index) =>
    $('.lectures').append(
      `<div data-id="${lec.id}" class="lectures--card ${
        index === 0 ? 'active' : ''
      }">
        <h2>المحاضرة</h2>
        <span class="number">0${lec.id}</span>
        <div><span class="date">${lec.date}</span></div>
      </div>`
    )
  );
}

// let test;
function updateAttendanceSection(data) {
  tableItemsStartNum = 0; // reset page table number
  addLectureDataToAttendance(data);
  addAttendanceDataToTable(data.attendance.slice(0, tableItemsNum));
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
