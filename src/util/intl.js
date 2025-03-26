export const compareDates = (one, two, iterateeComparer) => {
    const dateOne = new Date(one)
    const dateTwo = new Date(two)

    return iterateeComparer(dateOne, dateTwo)
}

export const formatToHourMinute = (input) => {
    try {
      const date = new Date(input)
      if (isNaN(date.getTime())) return ''
  
      // Extrai HH:MM da string ISO (sempre vem no formato UTC)
      return date.toISOString().substring(11, 16)
    } catch (e) {
      return ''
    }
}