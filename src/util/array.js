import _ from "lodash"

export const randomSliceIntoNGivenValues = (array, sliceArray) => {
    if (array.length === 0) return _.fill(Array(sliceArray.length), undefined)
    if (_.reduce(sliceArray, (sum, n) => sum + n) !== array.length) return _.fill(Array(sliceArray.length), undefined)

    let result = []
    let mutatedArray = _.clone(array)

    sliceArray.map((randomQuantity, index) => {
        let randomIndexes = []

        while (randomIndexes.length < randomQuantity) {
            const rnd = _.random(0, mutatedArray.length - 1)
            if (!_.includes(randomIndexes, rnd)) randomIndexes.push(rnd)
        }

        result.push(_.remove(mutatedArray, (value, index) => _.includes(randomIndexes, index)))

        return randomQuantity
    })

    return result
}

export const enforceJsonNotFalseyValues = (json, enforcedProperties) =>
    _.every(enforcedProperties, (property) => _.has(json, property) && !_.isNil(json[property]) && !!json[property])