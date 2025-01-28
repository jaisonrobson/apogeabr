import React from 'react'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { FormattedInput } from 'components'

const ImageInput = ({ register, setValue, errors, backendErrors, defaultImage = userNoAvatarImage, ...props }) => (
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
                    property: 'loginButtonAnimation 0.5s linear 0s infinite alternate',
                    corpse: `@keyframes loginButtonAnimation {
                        0%  {transform: scale3d(1,1,1);}
                        100%  {transform: scale3d(1.03,1.03,1.03); background-color: lightgray; border-radius: 8px}
                    }`
                },
            },
        }}
        minWidth="0px"
        width="auto"
        {...props}
    />
)

export default ImageInput