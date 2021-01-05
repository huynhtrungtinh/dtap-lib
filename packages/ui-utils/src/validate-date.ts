const validateDate = (date: Date) => {
    const outPut = {
        error: false,
        message: ''
    }
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // it is a date
        if (isNaN(date.getTime())) {  // date.valueOf() could also work
            // date is not valid
            outPut.error = true;
            outPut.message = 'is not valid';
        }
        // else {
        //     // date is valid
        // }
    } else {
        // not a date
        outPut.error = true;
        outPut.message = 'not a date';
    }
    return outPut;
}
export default validateDate
export {validateDate};

