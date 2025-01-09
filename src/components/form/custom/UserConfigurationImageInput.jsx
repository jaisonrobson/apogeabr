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
            }}
            minWidth="0px"
            width="auto"
            {...props}
        />
    )
}

export default UserConfigurationImageInput