let events = [];
let eventDateInput = document.getElementById("eventDate");
let evenTitleInput = document.getElementById("eventTitle");
let eventDescriptionInput = document.getElementById("eventDescription");
let reminderList = document.getElementById("reminderList");
let eventIdCounter = 1;
function addEvent() {
    let date = eventDateInput.value;
    let title = evenTitleInput.value;
    let description = eventDescriptionInput.value;

    if (date && title) {
        let eventId = eventIdCounter++;

        events.push(
            {
                id: eventId, date: date, title: title, description: description,
            }
        );
        showCalender(currentMonth, currentYear);
        eventDateInput.value = "";
        evenTitleInput.value = "";
        eventDescriptionInput.value = "";
        displayReminders();
    }
}
function deleteEvent(eventId) {
    let eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        showCalender(currentMonth, currentYear);
        displayReminders();
    }
}
function displayReminders() {
    reminderList.innerHTML = "";
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() === 
        currentMonth && 
        eventDate.getFullYear() === 
        currentYear) {
            let listItem = 
            document.createElement("li");
            listItem.innerText = '<strong>${event.title}</strong> - ${event.description} on ${eventDate.toLocaleDateString()}';
            
            let deleteButton = document.createElement("button");
            deleteButton.className = "delete-event";
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function () {
                deleteEvent(event.id);
            };
            listItem.appendChild(deleteButton);
            reminderList.appendChild(listItem);
        }
    }
}
function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>"; 
    }
    return years;
}
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;
let calender = document.getElementById("calender");

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
$dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>"
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear = document.getElementById("monthAndYear");
showCalender(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalender(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    showCalender(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalender(currentMonth, currentYear);
}

function showCalender(month, year) {
    let fristDay = new Date(year, month, 1).getDay();
    tbl = document.getElementById("calender-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + "" + year;
    selectYear.value = year;
    selectMonth.value = month;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < fristDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";
                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.className = "date-picker selected";
                }
                if (hasEventOnDate(date, month, year)) {
                    cell.classList.add("event-marker");
                    cell.appendChild(createEventTooltip(date, month, year));
                }
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
    displayReminders();
}

function createEventTooltip(date, month, year) {
    let tooltip = document.createElement("div");
    tooltip.className = "event-tooltip";
    let eventOnDate = getEventsOnDate(date, month, year);
    for (let i = 0; i < eventOnDate.length; i++) {
        let event = eventOnDate[i];
        let eventDate = new Date(event.date);
        let eventText = '<strong>${event.title}</strong> - ${event.description} on  ${eventDate.toLocaleDateString()}';
        let eventElement = document.createElement("p");
                                    eventElement.innerHTML = eventText;
                                    tooltip.appendChild(eventElement);
    }
    return tooltip;
}
function getEventsOnDate(date, month, year) {
    return events.filter(function (event) {
        let eventDate = new Date(event.date);
        return (
            eventDate.getDate() === date && eventDate.getMonth() === month && eventDate.getFullYear() === year
        );
    });
}
function hasEventOnDate(date, month, year) {
    return getEventsOnDate(date, month, year).length > 0;
}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

showCalender(currentMonth, currentYear);