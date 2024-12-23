export const changeToArray = (value) => {
    let arr = [];
    if (!Array.isArray(value)) {
        console.log("this runs",value)
        arr.push(value)
    }

    return arr;
}