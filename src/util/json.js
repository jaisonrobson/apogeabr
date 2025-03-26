import _ from 'lodash'

/**
 * Retorna um objeto com todas as subárvores cujo nome da chave contém a palavra-chave.
 * Apenas o nível da chave correspondente é retornado.
 *
 * @param {Object} obj - Objeto original
 * @param {string} keyword - Palavra a ser buscada nas chaves
 * @returns {Object} - Objeto com as chaves mais próximas contendo o termo
 */
export const extractMatchingNodesByKeyword = (obj, keyword) => {
  const result = {}

  const recursiveExtract = (currentObj) => {
    _.forEach(currentObj, (value, key) => {
      if (typeof key === 'string' && key.includes(keyword)) {
        result[key] = value // Salva o nó direto
      } else if (_.isObjectLike(value)) {
        recursiveExtract(value) // Continua procurando
      }
    })
  }

  recursiveExtract(obj)
  return result
}

export const extractValuesByExactKeyNameIntoArray = (obj, fieldName = "name", maxDepth = 2) => {
    const result = []
  
    const recurse = (val, currentDepth = 0) => {
      if (currentDepth > maxDepth) return
  
      if (_.isArray(val)) {
        val.forEach(item => recurse(item, currentDepth + 1))
      } else if (_.isObject(val)) {
        _.forEach(val, (v, key) => {
          if (key === fieldName) {
            result.push(v)
          }
          recurse(v, currentDepth + 1)
        })
      }
    }
  
    recurse(obj)
  
    return result.filter(Boolean)
}

export const extractIntoFlatObjectFieldsByName = ({
    initialData,
    byName = "name",
    fieldName = "validation",
    validationFunction = () => true,
    validateFields = true,
    maxDepth = 2
  }) => {
    const result = {}

    const recurse = (obj, currentDepth = 0) => {
        if (currentDepth > maxDepth) return

        if (_.isArray(obj)) {
            obj.forEach(item => recurse(item, currentDepth + 1))
        } else if (_.isObject(obj)) {
            // Verifica se o objeto atual é um campo válido
            if (
                validationFunction(obj) &&
                (!validateFields || (obj[byName] && obj[fieldName]))
            ) {
                result[obj[byName]] = obj[fieldName]
            }

            // Continua a recursão pelos valores
            _.forEach(obj, value => recurse(value, currentDepth + 1))
        }
    }

    recurse(initialData)

    return result
}

export const extractFromNestedObjectByFilters = ({
    initialData,
    filters = [(data) => data],
    filtersNamings = ["filter_1"],
    comparisonField = "name",
    maxDepth = 2 // novo parâmetro
  }) => {
    const allFields = []
  
    // Função recursiva com controle de profundidade
    const recurse = (obj, currentDepth = 0) => {
      if (currentDepth > maxDepth) return
  
      if (_.isArray(obj)) {
        obj.forEach(item => recurse(item, currentDepth + 1))
      } else if (_.isObject(obj)) {
        allFields.push(obj)
        _.forEach(obj, value => recurse(value, currentDepth + 1))
      }
    }
  
    recurse(initialData)
  
    // Aplica cada filtro e armazena no objeto de resultados
    const result = _.reduce(filters, (acc, filter, index) => {
      acc[filtersNamings[index]] = _.map(
        _.filter(allFields, filter),
        comparisonField
      )
      return acc
    }, {})
  
    return result
}

export const mergeFieldArraysByKeys = (objectsArray, keysToMerge = []) => {
    return _.reduce(keysToMerge, (acc, key) => {
                    acc[key] = _.uniq(
                        _.flatMap(objectsArray, obj => obj[key] || [])
                    )

                    return acc
                },
            {})
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

export const filterEntries = (data, filter = "") => {
    const filters = Array.isArray(filter) ? filter : [filter]

    return _.pickBy(data, (value, key) => 
        filters.some(f => key.includes(f))
    )
}

export const groupData = (data, filter = "", mutationFunction = (data) => data.result, preserveIdAsDependantValue = false) => _.reduce(data, (result, value, key) => {
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

        if (preserveIdAsDependantValue)
          result[groupKey]['dependantValue'] = id
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