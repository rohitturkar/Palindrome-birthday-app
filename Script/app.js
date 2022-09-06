function reverseString(StringName) {
    return StringName.split('').reverse().join('');
}

function isItPalindrome(Str) {
    let reverseString = Str.split('').reverse().join('');
    if (reverseString === Str) {
        return true;
    }
    else {
        return false;
    }
}

function numberToString(date) {
    let dateInStr = { day: '', month: '', year: '' }
    if (date.day < 10) {
        dateInStr.day = "0" + date.day;
    }
    else {
        dateInStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateInStr.month = "0" + date.month;
    }
    else {
        dateInStr.month = date.month.toString();
    }
    dateInStr.year = date.year.toString();

    return dateInStr;
}

function allDateFormat(date) {
    var dateStr = numberToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkThePalindromeForAllDateFormat(date) {
    var listOfAllTheDateFormat = allDateFormat(date);
    let isPalindrome = false;
    for (let i = 0; i < listOfAllTheDateFormat.length; i++) {
        if (isItPalindrome(listOfAllTheDateFormat[i])) {
            isPalindrome = true;
        }
    }
    return isPalindrome;
}

function isLeapYear(year) {
    if (year % 400 === 0 || (year % 100 != 0 && year % 4 === 0)) {
        return true;
    } 
    else{
        return false;
    }
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        
    if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }

        }
    else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }

    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month = month + 1;
        }
    }

    if (month > 12) {
        month = 1;
        year = year + 1;
    }

    return {
        day: day,
        month: month,
        year: year,
    }

}

function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPalindrome = checkThePalindromeForAllDateFormat(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

const dateInput = document.querySelector("#date-input");
const submitBtn = document.querySelector("#btn-Submit");
const outputDiv = document.querySelector("#output");


submitBtn.addEventListener("click", () => {
    var birthdayString = dateInput.value;

    if (birthdayString !== '') {
        var listOfDate = birthdayString.split('-');

        var date = {
            day:   Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year:  Number(listOfDate[0]),
        };

        var isPalindrome = checkThePalindromeForAllDateFormat(date);
        if (isPalindrome) {
            outputDiv.innerText = "Yay! your birthday is a palindrome 😊";
        }
        else {
            var [counter, nextDate] = getNextPalindromeDate(date);
            outputDiv.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days 😐 `
        }
    }
   else{
    outputDiv.innerText = "Please enter the valid date 😑";
    }
})