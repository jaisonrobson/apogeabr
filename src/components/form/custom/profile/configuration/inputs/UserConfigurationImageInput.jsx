import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'

import userNoAvatarImage from 'images/layout/user/userNoAvatar.png'

import { FormattedInput } from 'components'

const UserConfigurationImageInput = ({ register, setValue, errors, backendErrors, ...props }) => {
    const { user } = useRouteLoaderData("root")

    return (
        <FormattedInput
            register={register}
            setValue={setValue}
            name="image"
            errorMessage={errors?.image?.message}
            fontFamily="arial"
            type="image"
            defaultImage={user?.image || userNoAvatarImage}
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
}

export default UserConfigurationImageInput