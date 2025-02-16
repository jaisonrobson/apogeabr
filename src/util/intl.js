export const compareDates = (one, two, iterateeComparer) => {
    const dateOne = new Date(one)
    const dateTwo = new Date(two)

    return iterateeComparer(dateOne, dateTwo)
}