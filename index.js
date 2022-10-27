// Your code here
function createEmployeeRecord(array) {
    let newEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

function createEmployeeRecords(arrays) {
    return arrays.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(empRecord, dateStamp) {
    let dateTimeSplit = dateStamp.split(" ")
    let newTimeIn = {
        type: "TimeIn",
        hour: parseInt(dateTimeSplit[1], 10),
        date: dateTimeSplit[0]
    }
    empRecord.timeInEvents.push(newTimeIn)
    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    let dateTimeSplit = dateStamp.split(" ")
    let newTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateTimeSplit[1], 10),
        date: dateTimeSplit[0]
    }
    empRecord.timeOutEvents.push(newTimeOut)
    return empRecord
}

function hoursWorkedOnDate(empRecord, dateStamp) {
    let timeIn = empRecord.timeInEvents.filter(time => time.date === dateStamp.split(" ")[0])[0].hour
    let timeOut = empRecord.timeOutEvents.filter(time => time.date === dateStamp.split(" ")[0])[0].hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(empRecord, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(empRecord, dateStamp)
    return hoursWorked * empRecord.payPerHour
}

function allWagesFor(empRecord) {
    let dates = empRecord.timeInEvents.map(a => a.date)
    let wagesOnDates = dates.map(e => wagesEarnedOnDate(empRecord, e))
    return wagesOnDates.reduce((accum, curr) => accum + curr)
}

function calculatePayroll(array) {
    return array.map(e => allWagesFor(e)).reduce((accum, curr) => accum + curr)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}