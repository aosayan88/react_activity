/* REACT */
import React from 'react';

/* Input Field Component */
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