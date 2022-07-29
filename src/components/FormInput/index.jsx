/* REACT */
import React from 'react';

/**
 * This component class is being called on the ../../Main.js
 * @author Alfie
 * Last Updated Date: July 29, 2022
 */
const Input = ({
    id,
    type,
    name,
    placeholder,
    value,
    onChange
}) => {
    return (
        <input type={type} onChange={onChange} name={name} id={id} placeholder={placeholder} value={value} />
    );
}

export default Input;