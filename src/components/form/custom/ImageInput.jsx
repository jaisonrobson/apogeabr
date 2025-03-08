import React from 'react'

import noImage from 'images/layout/generic/noImage.png'

import { FormattedInput } from 'components'

const ImageInput = ({ register, setValue, errors, backendErrors, defaultImage = noImage, additiveImageProps = {}, ...props }) => (
    <FormattedInput
        register={register}
        setValue={setValue}
        name="image"
        errorMessage={errors?.image?.message}
        fontFamily="arial"
        type="image"
        defaultImage={defaultImage}
        imageProps={{
            className: "rounded-circle",
            objectFit: "contain",
            width: "200px",
            height: "200px",
            opacity: '1',
            onHover: {
                opacity: '0.5',
                animation: {
                    property: 'imageInputAnimation 0.5s linear 0s infinite alternate',
                    corpse: `@keyframes imageInputAnimation {
                        0%  {transform: scale3d(1,1,1);}
                        100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                    }`
                },
            },
            ...additiveImageProps,
        }}
        minWidth="0px"
        width="auto"
        {...props}
    />
)

export default ImageInput