// Get Current Date
const getDate = Date.now();
const current = new Date();

// Input and Span Values
var bDay = document.getElementById("day");
var bMonth = document.getElementById("month");
var bYear = document.getElementById("year");
//
var dayError = document.getElementById("error-dd");
var monthError = document.getElementById("error-mm");
var yearError = document.getElementById("error-yy");
//
var yearsOld = document.getElementById("years");
var monthsOld = document.getElementById("months");
var daysOld = document.getElementById("days");

calc = () => {
  var bDate = new Date(`${bMonth.value}/${bDay.value}/${bYear.value}`);

  var secDiff = Math.floor(getDate - bDate.getTime());

  var dayDiff = Math.round(secDiff / (1000 * 3600 * 24)); //Total Day
  var monthDiff = Math.floor(dayDiff / 30.44);
  var yearDiff = Math.floor(current.getFullYear() - bYear.value);

  if (checkValid()) {
    if (!bDay.value || !bMonth.value || !bYear.value) {
      null;
    } else {
      monthsOld.textContent = monthDiff % 12;
      daysOld.textContent = dayDiff % 29;
      if (bMonth.value - (current.getMonth() + 1) >= 0) {
        yearsOld.textContent = yearDiff - 1;
      } else {
        yearsOld.textContent = yearDiff;
      }
    }
  } else {
  }
};

checkEmpty = (input, whichError) => {
  if (!input.value) {
    whichError.textContent = "This field is required";
    input.style = "border-color:red";
  }
};

checkValid = () => {
  const thisDay = current.getDate();
  const thisMonth = current.getMonth() + 1;
  const thisYear = current.getFullYear();

  var bDayValue = parseInt(bDay.value);
  var bMonthValue = parseInt(bMonth.value);
  var bYearValue = parseInt(bYear.value);

  let isValid = true;

  if (bDayValue < 1 || bDayValue > 31) {
    dayError.textContent = "Must be a valid day";
    bDay.style = "border-color:red";
    isValid = false;
  } else {
    dayError.textContent = "";
    bDay.style = "border-color:none";
  }

  if (bMonthValue < 1 || bMonthValue > 12) {
    monthError.textContent = "Must be a valid month";
    bMonth.style = "border-color:red";
    isValid = false;
  } else {
    monthError.textContent = "";
    bMonth.style = "border-color:none";
  }

  if (bYearValue > thisYear) {
    yearError.textContent = "Must be in the past";
    bYear.style = "border-color:red";
    isValid = false;
  } else if (bYearValue < 0) {
    yearError.textContent = "Must be a valid year";
    bYear.style = "border-color:red";
    isValid = false;
  } else {
    bYear.style = "border-color:none";
    yearError.textContent = "";
  }

  if (
    bYearValue === thisYear &&
    bMonthValue >= thisMonth &&
    bDayValue > thisDay
  ) {
    dayError.textContent = "Must be in the past";
    monthError.textContent = "Must be in the past";
    bDay.style = "border-color:red";
    bMonth.style = "border-color:red";
    isValid = false;
  }

  if (bMonthValue === 2 && bDayValue === 29 && bYearValue % 4 !== 0) {
    dayError.textContent = "Must be a valid day";
    bDay.style.borderColor = "red";
    isValid = false;
  } else if (bMonthValue === 2 && bDayValue > 28 && bDayValue !== 29) {
    dayError.textContent = "Must be a valid day";
    bDay.style.borderColor = "red";
    isValid = false;
  }

  checkEmpty(bMonth, monthError);
  checkEmpty(bDay, dayError);
  checkEmpty(bYear, yearError);

  if (isValid) {
    return true;
  } else {
    return false;
  }
};
