import React, { useState, useEffect, useContext } from 'react'
import { useFormContext } from "react-hook-form"
import _ from 'lodash'

import { mountFormattedInputComponents, extractMatchingNodesByKeyword } from 'util/json'
import { FormDataContext } from 'contexts'

import {
    FormattedInput,
    HR,
    Row,
    Col,
    Span,
	DeleteRecordModalButton
} from 'components'

const defaultAsFunction = () => {}

const RenderCollectiveInputs = ({
    reloadInformation,
    doFormLateLoadInformations,
    collectiveKeyPath,
    collectiveInputs,
    extractCollectives,
    register,
    setValue,
    errors,
    light = false,
    collectiveInputsSearchDepth = 1,
    deleteEndpoint = defaultAsFunction,
    onRemoveCollectiveInputs = defaultAsFunction,
}) => {
    const { value: { getValues } } = useFormContext()
    const { isReloadingData, enableReloadData, setSnapshot } = useContext(FormDataContext)
    const [collectiveData, setCollectiveData] = useState({})
    const providedRemoveFunction = !_.isEqual(onRemoveCollectiveInputs, defaultAsFunction)
    const providedRemoveEndpoint = !_.isEqual(deleteEndpoint, defaultAsFunction)

    useEffect(() => {
        if (extractCollectives)
            setCollectiveData(extractMatchingNodesByKeyword(collectiveInputs, extractCollectives))
        else
            setCollectiveData(collectiveKeyPath ? _.get(collectiveInputs, collectiveKeyPath) : collectiveInputs)
    }, [collectiveKeyPath, collectiveInputs, extractCollectives])

    return mountFormattedInputComponents(
      collectiveData,
      (dify) => (
        <FormattedInput
            key={dify.name}
            register={register}
            setValue={setValue}
            name={dify.name}
            label={dify.label}
            errorMessage={errors?.[dify.name]?.message}
            type={dify.type}
            fontFamily="arial"
            {...(!_.isEmpty(dify?.extraProperties) ? dify.extraProperties : {})}
            light={light}
            reloadInformation={reloadInformation}
            doFormLateLoadInformations={doFormLateLoadInformations}
        />
      ),
      (groupedInputs, group, depth) => !group?.collectiveName ? null : (
        <Row key={group.collectiveName} margin="0px" padding="0px">
            <Row display="flex" justifyContent={(depth === 0 && (providedRemoveFunction || providedRemoveEndpoint)) ? "space-between" : "flex-start"}>
                <Col>
                    <Span textShadow={light ? "0px 0px 5px black" : "0px 0px 5px white"}>
                        {group.collectiveName}
                    </Span>
                </Col>

                {depth !== 0 || !(providedRemoveFunction || providedRemoveEndpoint) ? null : (
                <Col display="flex" justifyContent="flex-end" padding="0px">
                    <DeleteRecordModalButton
                        margin="0px"
                            marginBottom="5px"
                        {...(providedRemoveEndpoint
                                ? ({
                                deleteEndpoint: () => deleteEndpoint(group),
                                onDelete: () => {
                                    setSnapshot(getValues())

                                    enableReloadData()
                                }})
                                : {}
                            )
                        }
                        {...(providedRemoveFunction
                            ? ({onDelete: () => {
                                setSnapshot(getValues())

                                onRemoveCollectiveInputs(group.collectiveId)
                            }})
                            : {})
                        }
                    />
                </Col>
                )}
            </Row>
  
            <Row padding="0px" margin="0px">
                <HR light={!light} height="2px" />
            </Row>

            <Row
                padding="0px"
                margin="0px"
            >
                <Col
                    padding="0px"
                    margin="0px"
                >
                    {groupedInputs}
                </Col>
          </Row>
        </Row>
      ),
      collectiveInputsSearchDepth
    )
}

export default RenderCollectiveInputs