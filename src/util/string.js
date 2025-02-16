import _ from 'lodash'

export const addSlashIfNeeded = (str) => _.endsWith(str, '/') ? str : str + '/'

export const typeAsDescription = (typeNumber) => {
    switch(typeNumber) {
        case 1:
            return "newbie"
        case 2:
            return "bishop"
        case 3:
            return "king"
        default:
            return "newbie"
    }
}