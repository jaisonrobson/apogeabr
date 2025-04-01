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

// export const mountFormattedInputComponents = (initialData, componentFunction = () => {}, groupComponentFunction = (data, group) => data) =>
//     _.flatMap(initialData, (group) => {
//         return groupComponentFunction(
//             _.map(group, (dify) => {
//                 if (_.isObject(dify) && dify.name && dify.type && dify.type !== undefined) {
//                     return componentFunction(dify)
//                 }
//                 return null
//             }).filter(Boolean),
//             group
//         )
//     })

export const mountFormattedInputComponents = (
  initialData,
  componentFunction = () => {},
  groupComponentFunction = (data, group, depth) => data,
  maxDepth = Infinity
) => {
  const renderRecursively = (data, currentDepth = 0) => {
    if (!_.isObject(data) || currentDepth > maxDepth) return []

    const inputs = []

    for (const [key, value] of Object.entries(data)) {
      if (_.isObject(value)) {
        const isInputField = value.name && value.type

        if (isInputField) {
          inputs.push(componentFunction(value))
        } else if (key.toLowerCase().includes("collective")) {
          const nestedInputs = renderRecursively(value, currentDepth + 1)

          if (currentDepth < maxDepth) {
            inputs.push(groupComponentFunction(nestedInputs, value, currentDepth))
          } else {
            inputs.push(...nestedInputs)
          }
        } else {
          inputs.push(...renderRecursively(value, currentDepth + 1))
        }
      }
    }

    return inputs
  }

  return renderRecursively(initialData)
}

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

/**
 * Agrupa dados por níveis definidos, renomeia chaves usando expressões regulares
 * e permite mutações customizadas nos dados agrupados.
 *
 * @param {Object} data - Objeto de entrada com as chaves complexas.
 * @param {string[]} groupLevels - Padrões de agrupamento, ex: ["TMPFY_", "TRANSLATION_"].
 * @param {RegExp[]} keyCleaners - Expressões regulares para limpar nomes de chaves.
 * @param {Function[]} [mutationFunctions=[]] - Funções de mutação por nível: ({ key, value, result }) => novoValor.
 * @returns {Object} Objeto agrupado e com chaves finais limpas e mutações aplicadas.
 */
export const groupDataByLevels = (
  data,
  groupLevels,
  keyCleaners,
  mutationFunctions = []
) => {
  const result = {}

  const mutationTracker = {} // marca quais níveis já foram mutados

  _.forEach(_.toPairs(data), ([fullKey, originalValue]) => {
    const path = []
    let currentValue = originalValue

    _.forEach(groupLevels, (level) => {
      const match = fullKey.match(new RegExp(`${level}\\d+`))
      if (match) {
        path.push(match[0])
      }
    })

    const cleanKey = _.reduce(keyCleaners, (key, regex) => key.replace(regex, ''), fullKey)
    const parentPath = path.slice()
    const currentObject = _.get(result, parentPath, {})

    // 1. Aplica mutações do nível mais interno (ex: TRANSLATION_1)
    const deepMutationFn = mutationFunctions?.[path.length - 1]
    const mutatedInner = _.isFunction(deepMutationFn)
      ? deepMutationFn({ key: fullKey, value: currentValue, result, currentObject })
      : currentObject

    // 2. Atualiza o valor limpo
    mutatedInner[cleanKey] = currentValue
    _.set(result, parentPath, mutatedInner)

    // 3. Aplica mutação do nível mais externo (ex: NESTEDDYNAMICFIELD_2), apenas uma vez
    const groupKey = path[0]
    if (!mutationTracker[groupKey] && _.isFunction(mutationFunctions?.[0])) {
      const outerPath = [groupKey]
      const outerObject = _.get(result, outerPath, {})

      const mutatedOuter = mutationFunctions[0]({
        key: fullKey,
        value: currentValue,
        result,
        currentObject: outerObject
      })

      _.set(result, outerPath, { ...outerObject, ...mutatedOuter })
      mutationTracker[groupKey] = true
    }
  })

  return result
}


export const deepMerge = (objects = []) => {
  return objects.reduce((acc, curr) =>
    _.mergeWith(acc, curr, (objValue, srcValue) => {
      if (_.isPlainObject(objValue) && _.isPlainObject(srcValue)) {
        return undefined // comportamento padrão: merge recursivo
      }
      return srcValue // sobrescreve valor existente com o novo
    }), {})
}

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

export const removeNestedGroupsByFiltersExclusively = (initialData, filters = ["id"]) => {
  return _.mapValues(initialData, (nestedGroup) => {
    if (_.isPlainObject(nestedGroup)) {
      return _.omitBy(nestedGroup, obj => {
        const objectKeys = _.keys(obj)
        return _.every(objectKeys, key => filters.includes(key))
      })
    }
    return nestedGroup
  })
}
