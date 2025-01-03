import React from 'react';

const Icon = ({ type }) => {
    const imagePath = require(`@/assets/images/${type}.svg`)

    return (
        <img
            src={imagePath}
            alt="icon"
            style={{
                width: 20,
                height: 20,
            }}
        />
    )
}

export default Icon
