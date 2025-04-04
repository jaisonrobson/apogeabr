import { redirect } from 'react-router-dom'
import axios from 'axios'
import _ from 'lodash'

import {
    filterEntries,
    groupData,
    removeGroupsByFiltersExclusively,
    groupDataByLevels,
    deepMerge,
    removeNestedGroupsByFiltersExclusively    
} from 'util/json'

import ROUTES from 'router/routes'

const action = async ({ request }) => {
    const form = await request.formData()

    const persistedFields = _.split(form.get('persisted'), ',')
    const nonPersistedFields = _.split(form.get('non_persisted'), ',')

    const iconId = form.get('icon_id')
    const monsterId = form.get('id')

    const allValues = Object.fromEntries(form.entries())
    const nonInitialRequestValues = filterEntries(allValues, ["DIFY_", "TMPFY_", "NESTEDDYNAMICFIELD"])
    const initialRequestValues = _.omitBy(
        allValues,
        (value, key) => key === "id" || key === "persisted" || key === "non_persisted" || key in nonInitialRequestValues
    )

    if (iconId)
        initialRequestValues["icon_id"] = iconId

    const temporaryMonsterAbilitiesRequestValues = _.pickBy(allValues, (value, key) => key.includes("_TMPFY_"))

    const temporaryMonsterAbilitiesValues = groupData(
        filterEntries(temporaryMonsterAbilitiesRequestValues, "TMPFY_"),
        "TMPFY"
    )

    const dynamicMonsterAbilitiesRequestValues = _.pickBy(allValues, (value, key) => key.includes("_NESTEDDYNAMICFIELD_"))

    const dynamicMonsterAbilitiesValues = groupData(
        dynamicMonsterAbilitiesRequestValues,
        "NESTEDDYNAMICFIELD_MONSTERABILITIES",
        ({ key, value, result }) => {
            let finalResult = result

            const monsterAbilityId = key.match(/NESTEDDYNAMICFIELD_MONSTERABILITIES_(\d+)/)?.[1]

            finalResult["monsterAbilityId"] = monsterAbilityId

            return finalResult
        }
    )

    try {
        const requests = []

        if (!_.isEmpty(initialRequestValues)) {
            const initialRequestPayload = { monster: initialRequestValues }

            const initialRequestResponse = await axios.put(`${[process.env.REACT_APP_BACKEND_HOST]}/monsters/${monsterId}`, initialRequestPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })

            requests.push(initialRequestResponse)
        }

        const translationGroups = groupData(
            filterEntries(allValues, "DIFY_"),
            "DIFY",
            ({ key, value, result: resultParam }) => {
                let result = resultParam

                result["isPersistedField"] = _.includes(persistedFields, key)

                return result
            }
        )

        const onlyTouchedTranslationFields = removeGroupsByFiltersExclusively(translationGroups, ["id", "isPersistedField"])

        if (!_.isEmpty(onlyTouchedTranslationFields)) {
            _.forEach(onlyTouchedTranslationFields, async (value) => {
                const requestPayload = { monster_translation: _.omit(value, "isPersistedField") }

                const translationRequest = await axios.request({
                    url: value.isPersistedField
                        ? `${process.env.REACT_APP_BACKEND_HOST}/monsters/${monsterId}/translations/${value.locale_id}`
                        : `${process.env.REACT_APP_BACKEND_HOST}/monsters/${monsterId}/translations`,
                    method: value.isPersistedField ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(translationRequest)
            })
        }

        if (!_.isEmpty(temporaryMonsterAbilitiesValues)) {
            _.forEach(temporaryMonsterAbilitiesValues, async (monsterAbilityObject) => {
                const monsterAbilityRequestPayload = { monsters_ability: monsterAbilityObject }

                const monsterAbilityRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/monsters/${monsterId}/abilities`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: monsterAbilityRequestPayload,
                })

                requests.push(monsterAbilityRequest)
            })
        }

        const onlyTouchedDynamicMonsterAbilitiesFields = removeNestedGroupsByFiltersExclusively(dynamicMonsterAbilitiesValues, ["monsterAbilityId"])

        if (!_.isEmpty(onlyTouchedDynamicMonsterAbilitiesFields)) {
            _.forEach(onlyTouchedDynamicMonsterAbilitiesFields, async (dynamicMonsterAbilityField) => {
                const requestPayload = { monsters_ability: _.omit(dynamicMonsterAbilityField, ["monsterAbilityId"]) }

                const monsterAbilityRequest = await axios.request({
                    url: `${process.env.REACT_APP_BACKEND_HOST}/monsters/${monsterId}/abilities/${dynamicMonsterAbilityField.monsterAbilityId}`,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    data: requestPayload,
                })

                requests.push(monsterAbilityRequest)
            })
        }

        const responses = await Promise.all(requests)

        window.location.assign(
            `${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS.path.slice(0, -1)}?success=${encodeURIComponent(
                JSON.stringify(responses.map((res) => res.data))
            )}`
        )
    } catch (error) {
        const resultingError = error?.response?.data || { message: error.message }

        return redirect(`${ROUTES.USER_ADMIN_PANEL_LIBRARYANDMAP_MONSTERS.path.slice(0, -1)}?errors=${encodeURIComponent(JSON.stringify(resultingError))}`)
    }
}


export default action