import _ from 'lodash'

export const extractIntoFlatArrayFieldByName = (obj, fieldName = "name") =>
    _.flatMap(obj, (group) => 
        _.map(group, fieldName)
    ).filter(Boolean)

export const extractIntoFlatObjectFieldsByName = ({
    initialData,
    byName = "name",
    fieldName = "validation",
    validationFunction = (data) => true,
    validateFields = true
}) => (
        _.reduce(initialData, (acc, group) => {
            _.forEach(group, (internalObj) => {
                if (_.isObject(internalObj) && validationFunction(internalObj) && (!validateFields || internalObj[fieldName] && internalObj[byName])) {
                    acc[internalObj[byName]] = internalObj[fieldName]
                }
            })
            return acc
        }, {})
    )

export const extractFromNestedObjectByFilters = ({
    initialData,
    filters = [(data) => data],
    filtersNamings = ["filter_1"],
    comparisonField = 'name',
}) => {
    const allFields = _.flatMap(initialData, obj => _.values(obj))

    // Aplica cada filtro e armazena no objeto de resultados
    const result = _.reduce(filters, (acc, filter, index) => {
        acc[filtersNamings[index]] = _.map(
            _.filter(allFields, field => filter(field)), 
            comparisonField
        )

        return acc
    }, {})

    return result
}

export const mountFormattedInputComponents = (initialData, componentFunction = () => {}, groupComponentFunction = (data, group) => data) =>
    _.flatMap(initialData, (group) => {
        return groupComponentFunction(
            _.map(group, (dify) => {
                if (_.isObject(dify) && dify.name && dify.type && dify.type !== undefined) {
                    return componentFunction(dify)
                }
                return null
            }).filter(Boolean),
            group
        )
    })

export const filterEntries = (data, filter = "") => _.pickBy(data, (value, key) => key.includes(filter))

export const groupData = (data, filter = "", mutationFunction = (data) => data.result) => _.reduce(data, (result, value, key) => {
    const regex = new RegExp(`${filter}_(\\d+)`) // Constrói a regex dinamicamente
    const match = key.match(regex) // Captura o ID após o filtro dinâmico

    if (match) {
        const id = match[1] // Pega o número do ID
        const groupKey = `${filter}_${id}` // Mantém o prefixo dinâmico

        if (!result[groupKey]) {
            result[groupKey] = {} // Cria o grupo se não existir
        }

        result[groupKey] = mutationFunction({ key, value, result: result[groupKey] })

        result[groupKey][key.replace(`_${filter}_${id}`, '')] = value // Remove o sufixo do nome
    }

    return result
}, {})

// Remove os objetos aninhados apenas se os mesmos conterem "APENAS" os campos citados em `filters`.
export const removeGroupsByFiltersExclusively = (initialData, filters = ["id"]) => (
    _.omitBy(initialData, obj => {
        const objectKeys = _.keys(obj)

        // Verifica se TODAS as chaves do objeto estão na lista de filtros
        return _.every(objectKeys, key => 
            filters.some(filter => key.includes(filter))
        )
    })
)