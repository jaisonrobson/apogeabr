import _ from 'lodash'

export const addSlashIfNeeded = (str) => _.endsWith(str, '/') ? str : str + '/'