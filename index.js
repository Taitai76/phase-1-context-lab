/* Your Code Here */
function createEmployeeRecord(info){
    const Employee = {
        firstName: `${info[0]}`,
        familyName: `${info[1]}`,
        title: `${info[2]}`,
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return Employee;
}

function createEmployeeRecords(info){
    let newArray = [];
    for (const a of info){
        newArray.push(createEmployeeRecord(a)) 
    }
    return newArray;
}

function createTimeInEvent(date){
    const modDate = date.split(" ")
    let hours = parseInt(modDate[1])
    const newObj={
        type: "TimeIn",
        date: modDate[0],
        hour: hours
    };
    this.timeInEvents.push(newObj);
    return this;
}

function createTimeOutEvent(date){
    const modDate= date.split(" ")
    let hours = parseInt(modDate[1])
    const newObj={
        type: "TimeOut",
        date: modDate[0],
        hour: hours
    };
    this.timeOutEvents.push(newObj);
    return this;
}
function hoursWorkedOnDate(dateS){
    let inTime= 0;
    let outTime= 0;
    for(const A of this.timeInEvents){
        if (A['date'] === dateS){
            inTime = A['hour'];
        }
    }
    for(const A of this.timeOutEvents){
        if (A['date'] === dateS){
            outTime = A['hour'];
        }
    }
    return (outTime-inTime)/100;
}

function wagesEarnedOnDate(date){
    let hours = hoursWorkedOnDate.call(this, date);
    return (hours*this.payPerHour)
}

function findEmployeeByFirstName(Employees, name){
    for(const A of Employees){
        if (A.firstName === name){
            return A;
        }
    }

}

function calculatePayroll(Employees){
    let wages = []

    for(const A of Employees){
        let x = allWagesFor.apply(A);
        wages.push(x)
    }
    console.log(wages);
    const total = wages.reduce((n, c)=>{
        return n + c;
    }, 0);
    return total;

}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
